import app from "./app";

const port = process.env.PORT || 3000;

Bun.serve({
  port,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});
