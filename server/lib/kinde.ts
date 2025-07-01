import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType,
} from "@kinde-oss/kinde-typescript-sdk"
import type { Context } from "hono"
import { getCookie, setCookie, deleteCookie } from "hono/cookie"
import { createMiddleware } from "hono/factory"
import type { CookieOptions } from "hono/utils/cookie"

export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
  },
)

export const sessionManager = (c: Context): SessionManager => {
  const sessionCache = new Map<string, string>()

  return {
    async getSessionItem(key: string) {
      if (sessionCache.has(key)) return sessionCache.get(key)

      const cookieValue = getCookie(c, key)
      if (cookieValue) sessionCache.set(key, cookieValue)

      return cookieValue
    },
    async setSessionItem(key: string, value: unknown) {
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        path: "/",
      } as const

      let stringValue: string =
        typeof value === "string" ? value : JSON.stringify(value)

      setCookie(c, key, stringValue, cookieOptions)
      sessionCache.set(key, stringValue)
    },
    async removeSessionItem(key: string) {
      deleteCookie(c, key)
      sessionCache.delete(key)
    },
    async destroySession() {
      ;["access_token", "id_token", "user", "refresh_token"].forEach(key => {
        deleteCookie(c, key)
        sessionCache.delete(key)
      })
    },
  }
}

type Env = {
  Variables: {
    user: UserType
  }
}

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const manager = sessionManager(c)
    const isAuthenticated = await kindeClient.isAuthenticated(manager)

    if (!isAuthenticated)
      return c.json({ isAuthenticated: false, error: "Unauthorized" }, 401)

    const profile = await kindeClient.getUserProfile(manager)

    c.set("user", profile)

    await next()
  } catch (e) {
    console.error(e)
    return c.json({ isAuthenticated: false, error: "Unauthorized" }, 401)
  }
})

export const redirectUnauthorized = createMiddleware<Env>(async (c, next) => {
  try {
    const isAuthenticated = await kindeClient.isAuthenticated(sessionManager(c))
    if (!isAuthenticated)
      return c.redirect(process.env.KINDE_LOGOUT_REDIRECT_URI!)
    await next()
  } catch (e) {
    console.error(e)
    return c.redirect(process.env.KINDE_LOGOUT_REDIRECT_URI!)
  }
})
