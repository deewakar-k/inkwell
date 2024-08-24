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
