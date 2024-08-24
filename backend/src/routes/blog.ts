import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";

  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({
        msg: "you are not logged in",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      msg: "you are not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        subTitle: body.subTitle,
        content: body.content,
        authorId: userId,
      },
    });

    c.status(200);
    return c.json({
      msg: "blog created",
      id: blog.id,
    });
  } catch (e) {
    c.status(411);
    return c.json({ msg: "error creating blog", e });
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        subTitle: body.subTitle,
        content: body.content,
      },
    });

    c.status(200);
    return c.json({ msg: "updated blog", id: blog.id });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "error updating blog",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        subTitle: true,
        content: true,
        createdAt: true,
      },
    });

    if (!blogs) {
      c.status(403);
      return c.json({ msg: "blogs doesn't exists" });
    }

    c.status(200);
    return c.json({ blogs });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "error fetching blogs",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        subTitle: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!blog) {
      c.status(403);
      return c.json({ msg: "invalid id" });
    }

    c.status(200);
    return c.json({ blog });
  } catch (e) {
    c.status(411);
    return c.json({ msg: "error fetching blog" });
  }
});

blogRouter.post("/:id/like", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        blogId: id,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      const likeCount = await prisma.like.count({
        where: {
          blogId: id,
        },
      });

      c.status(200);
      return c.json({ msg: "liked!", likes: likeCount });
    } else {
      await prisma.like.create({
        data: {
          userId,
          blogId: id,
        },
      });

      const likeCount = await prisma.like.count({
        where: {
          blogId: id,
        },
      });
      c.status(200);
      return c.json({ msg: "liked!", likes: likeCount });
    }
  } catch (e) {
    c.status(411);
    return c.json({ msg: "error liking blog" });
  }
});

blogRouter.post("/:id/save", async (c) => {
  const id = c.req.param("id");
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  let condition: boolean;

  try {
    const body = await c.req.json();
    condition = body.delete;
  } catch (e) {
    return c.json({ msg: "Invalid JSON input" }, { status: 400 });
  }

  try {
    const existingSave = await prisma.savedBlog.findFirst({
      where: { userId, blogId: id },
    });

    if (condition) {
      if (existingSave) {
        await prisma.savedBlog.delete({
          where: { id: existingSave.id },
        });
        return c.json({ msg: "Blog unsaved" }, { status: 200 });
      } else {
        return c.json({ msg: "Blog is not saved" }, { status: 403 });
      }
    } else {
      if (!existingSave) {
        await prisma.savedBlog.create({
          data: { userId, blogId: id },
        });
        return c.json({ msg: "Blog saved" }, { status: 200 });
      } else {
        return c.json({ msg: "Blog already saved" }, { status: 403 });
      }
    }
  } catch (e) {
    return c.json({ msg: "Error processing request" }, { status: 500 });
  }
});

blogRouter.get("/bulk/saved", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const savedBlogs = await prisma.savedBlog.findMany({
      where: {
        userId,
      },
      include: {
        blog: {
          select: {
            id: true,
            title: true,
            subTitle: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });

    if (savedBlogs.length === 0) {
      return c.json({ msg: "no saved blogs" });
    }

    c.status(200);
    return c.json({
      savedBlogs,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "error fetching saved blogs",
    });
  }
});

interface AddComment {
  content: string;
}

blogRouter.post("/comment/:id", async (c) => {
  const id = c.req.param("id");
  const { content } = (await c.req.json()) as AddComment;

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  try {
    await prisma.comment.create({
      data: {
        content,
        blogId: id,
        authorId: userId,
      },
    });

    c.status(200);
    return c.json({ msg: "commented" });
  } catch (e) {
    c.status(411);
    return c.json({ msg: "error commenting on blog" });
  }
});

blogRouter.get("/comment/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const comments = await prisma.comment.findMany({
      where: {
        blogId: id,
      },
      select: {
        content: true,
      },
    });

    c.status(200);
    return c.json({ comments });
  } catch (e) {
    c.status(411);
    return c.json({ msg: "error fetching comments" });
  }
});
