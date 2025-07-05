import type { UserType } from "@kinde-oss/kinde-typescript-sdk"
import { getUser, kindeClient, sessionManager } from "@lib/kinde"
import { attempt } from "@lib/utils/common"
import { findOrCreateUser, retrieveUser } from "@lib/utils/user"

import { Hono } from "hono"

export const authRouter = new Hono()
  /* Login */
  .get("/login", async c => {
    const loginUrl = await kindeClient.login(sessionManager(c))
    return c.redirect(loginUrl.toString())
  })

  /* Register */
  .get("/register", async c => {
    const registerUrl = await kindeClient.register(sessionManager(c))
    return c.redirect(registerUrl.toString())
  })

  /* Auth Callback Redirect */
  .get("/callback", async c => {
    const manager = sessionManager(c)
    const url = new URL(c.req.url)

    await kindeClient.handleRedirectToApp(manager, url)
    const result = await attempt(kindeClient.getUser(manager))

    if (!result.success || !result.value.id) return c.redirect("/login")

    await findOrCreateUser(result.value.id)

    return c.redirect("/dashboard/")
  })

  /* Log Out */
  .get("/logout", async c => {
    const logoutUrl = await kindeClient.logout(sessionManager(c))
    return c.redirect(logoutUrl.toString())
  })

  /* Get Authenticated User */
  .get("/me", getUser, async c => {
    return c.json({
      isAuthenticated: true,
      user: {
        id: c.var.user.id,
        email: c.var.user.email,
        firstName: c.var.user.given_name,
        lastName: c.var.user.family_name,
        picture: c.var.user.picture,
      },
    } as unknown as {
      isAuthenticated: boolean
      user: {
        id: string
        email: string | null
        firstName: string | null
        lastName: string | null
        picture: string | null
      }
    })
  })
