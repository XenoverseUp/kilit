import { db } from "@lib/db"
import { users } from "@lib/db/schema"
import { getUser, kindeClient, sessionManager } from "@lib/kinde"
import { eq } from "drizzle-orm"
import { Hono } from "hono"

export const authRouter = new Hono()
  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c))
    return c.redirect(loginUrl.toString())
  })
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c))
    return c.redirect(registerUrl.toString())
  })
  .get("/callback", async (c) => {
    const manager = sessionManager(c)
    const url = new URL(c.req.url)
    await kindeClient.handleRedirectToApp(manager, url)

    return c.redirect("/dashboard")
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c))
    return c.redirect(logoutUrl.toString())
  })
  .get("/me", getUser, async (c) => {
    const user = c.var.user
    return c.json({ isAuthenticated: true, user })
  })
