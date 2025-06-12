import { Hono } from "hono"

export const linkRouter = new Hono()
  .get(`/:id{[a-zA-Z0-9]{${process.env.LINK_LENGTH}}}`, c => c.json({}))
  .post(`/:id{[a-zA-Z0-9]{${process.env.LINK_LENGTH}}}`, c => c.json({}))
