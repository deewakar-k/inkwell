import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@repo/common";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

userRouter.post('/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body)

  if (!success) {
    c.status(200)
    return c.json({
      msg: "invalid input!"
    })
  }
  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password
      }
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)

    c.status(200);
    return c.json({
      "msg": "successfully signed up",
      jwt
    })

  } catch (e) {
    c.status(403)
    return c.json({
      error: "error while singing up"
    })
  }
})

userRouter.post('/signin', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body)

  if (!success) {
    c.status(411);
    return c.json({
      msg: "invalid inputs"
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: body.username
      }
    })

    if (!user) {
      c.status(403)
      return c.json({ error: "user not found" })
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(200)
    return c.json({ msg: "successfully signed in", jwt: jwt })

  } catch (e) {
    c.status(403)
    return c.json({ error: "error while signing in" })
  }

})



