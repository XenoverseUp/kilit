import app from "./app";

const port = process.env.PORT || 3000;

console.log(`Listening on http://127.0.0.1:${port} .`);

Bun.serve({
  port,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});
