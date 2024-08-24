import { Hono } from "hono";
import { cors } from "hono/cors";
import { mainRouter } from "./routes/index";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/*", cors());
app.route("/api/v1/", mainRouter);

export default app;
