import { Hono } from "hono"
import { serveStatic } from "hono/bun"
import { logger } from "hono/logger"
import { redirectUnauthorized } from "@lib/kinde"

import { authRouter } from "./routes/auth"
import { userRouter } from "./routes/user"
import { healthRouter } from "./routes/health"

const app = new Hono()
app.use("*", logger())

/* API Routes */

const apiRoutes = app
  .basePath("/api")
  .route("/", authRouter)
  .route("/user", userRouter)
  .route("/health", healthRouter)

/* CSR Dashboard */
app.use("/dashboard/*", redirectUnauthorized)
app.use("/dashboard/*", serveStatic({ root: "./www/dashboard/dist" }))
app.get(
  "/dashboard/*",
  serveStatic({ path: "./www/dashboard/dist/index.html" }),
)

/* SSG Landing */
app.use("/*", serveStatic({ root: "./www/landing/dist" }))
app.get("/*", serveStatic({ path: "./www/landing/dist/index.html" }))

export default app
export type ApiRoutes = typeof apiRoutes
