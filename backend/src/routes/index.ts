import { Hono } from "hono";
import { userRouter } from "./user";
import { blogRouter } from "./blog";

export const mainRouter = new Hono<{ Bindings: CloudflareBindings }>();

mainRouter.route("/user", userRouter);
mainRouter.route("/blog", blogRouter);
