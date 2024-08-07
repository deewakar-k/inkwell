import { Hono } from "hono";
import { verify } from 'hono/jwt'
import { createBlog, updateBlog } from "@repo/common";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
  Variables: {
    userId: string;
  }
}>();

blogRouter.use("/*", async (c, next) => {


  //FIX: inefficeinty bypassing the bulk route to let users view blogs even if not signedin / signedup
  //TODO: grouping 

  const path = c.req.path; path
  if (path === "/api/v1/blog/bulk") {
    await next();
    return;
  }

  const authHeader = c.req.header("authorization") || "";

  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);

    if (user) {
      (c as any).set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in"
      })
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "You are not logged in"
    })
  }
});


blogRouter.post('/', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = createBlog.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      msg: "invalid inputs"
    })
  }

  const userId = c.get("userId")
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.title,
      authorId: Number(userId)
    }
  })

  c.status(200);
  return c.json({ msg: "post created", id: blog.id })
})

blogRouter.put('/', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = updateBlog.safeParse(body)

  if (!success) {
    c.status(411)
    return c.json({
      msg: "invalid inputs"
    })
  }

  try {
    await prisma.blog.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        content: body.title
      }
    })

    c.status(200);
    return c.json({
      msg: "blog updated!",
    })

  } catch (e) {
    c.status(403);
    return c.json({ msg: "error updating post", error: e })
  }

})

//TODO: add pagintion

blogRouter.get('/bulk', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  try {

    const blogs = await prisma.blog.findMany()

    c.status(200)
    return c.json({
      blogs
    })

  } catch (e) {
    c.status(411);
    return c.json({
      msg: "error while fetching blog posts"
    })
  }

})

blogRouter.get('/:id', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  c.req.json()
  const id = c.req.param("id")

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id)
      }
    })

    return c.json({
      blog
    })

  } catch (e) {
    c.status(403);
    return c.json({
      msg: "error getting blog",
      error: e
    })
  }

})


