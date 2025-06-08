import { Hono } from "hono"

export const userRouter = new Hono().get("/groups", (c) => c.text("")).get("/single-links", (c) => c.text(""))
