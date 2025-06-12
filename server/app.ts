import { Hono } from "hono"
import { serveStatic } from "hono/bun"
import { logger } from "hono/logger"
import { redirectUnauthorized } from "@lib/kinde"
import { getGeolocation, initGeoDB } from "@lib/geolocation"

import { authRouter } from "./routes/auth"
import { userRouter } from "./routes/user"
import { healthRouter } from "./routes/health"

await initGeoDB("server/data/geolite-city/GeoLite2-City.mmdb")

const app = new Hono()
app.use("*", logger())

/* API Routes */
const apiRoutes = app
  .basePath("/api")
  .get("/location", getGeolocation, c => c.json(c.var))
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

/* Static Public Directory */
app.use(
  "/public/*",
  serveStatic({
    root: "./public",
    rewriteRequestPath: path => path.replace("/public", ""),
  }),
)

/* SSG Landing */
app.use("/*", serveStatic({ root: "./www/landing/dist" }))
app.get("/*", serveStatic({ path: "./www/landing/dist/index.html" }))

export default app
export type ApiRoutes = typeof apiRoutes
