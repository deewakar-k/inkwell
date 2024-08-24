import { Hono } from "hono";

export const blogRouter = new Hono<{ Bindings: CloudflareBindings }>();

blogRouter.get("/", (c) => {
  return c.text("hello from blog");
});
