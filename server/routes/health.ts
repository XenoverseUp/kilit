import { Hono } from "hono"

export const healthRouter = new Hono()
  .get("/", c => {
    return c.json({
      status: "functional",
      message: "All systems are functional,",
    })
  })
  .get("/db", c => {
    return c.json({
      status: "functional",
      message: "All systems are functional,",
    })
  })
  .get("/auth", c => {
    return c.json({
      status: "functional",
      message: "All systems are functional,",
    })
  })
