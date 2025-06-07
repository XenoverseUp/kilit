import { Hono } from "hono";

const authRouter = new Hono()
  .get("/me", (c) => {
    return c.json({ isAuthenticated: false });
  })
  .get("/login", (c) => c.text("Hello"));

export default authRouter;
