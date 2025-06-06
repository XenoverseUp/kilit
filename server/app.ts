import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";

const app = new Hono();
app.use("*", logger());

// Test route
app.get("/test", (c) => c.json({ success: true }));

app.use("/dashboard/*", serveStatic({ root: "./apps/dashboard/dist" }));
app.get("/dashboard/*", serveStatic({ path: "./apps/dashboard/dist/index.html" }));

app.use("/*", serveStatic({ root: "./apps/landing/dist" }));
app.get("/*", serveStatic({ path: "./apps/landing/dist/index.html" }));

export default app;
