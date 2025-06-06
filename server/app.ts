import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";

const app = new Hono();
app.use("*", logger());

app.get("/api/test", (c) => c.json({ success: true }));

app.use("/dashboard/*", serveStatic({ root: "./www/dashboard/dist" }));
app.get("/dashboard/*", serveStatic({ path: "./www/dashboard/dist/index.html" }));

app.use("/*", serveStatic({ root: "./www/landing/dist" }));
app.get("/*", serveStatic({ path: "./www/landing/dist/index.html" }));

export default app;
