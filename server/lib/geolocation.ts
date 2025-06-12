import type { Context, MiddlewareHandler } from "hono"
import maxmind, { type Reader } from "maxmind"

let cityLookup: Reader<any> | null = null

export const initGeoDB = async (path = "./GeoLite2-City.mmdb") => {
  if (!cityLookup) {
    cityLookup = await maxmind.open(path)
    console.log("[GeoIP] MaxMind DB loaded.")
  }
}

const getIP = (c: Context): string => {
  const forwarded = c.req.header("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (process.env.NODE_ENV === "development") {
    return "88.255.99.16" // Local IP (for testing)
  }

  const maybeSocket =
    (c.req.raw as any)?.socket ?? (c.req.raw as any)?.connection
  return maybeSocket?.remoteAddress || "127.0.0.1"
}

type Env = {
  Variables: {
    ip: string
    city: string | null
    country: string | null
  }
}

export const getGeolocation: MiddlewareHandler<Env> = async (c, next) => {
  if (!cityLookup) return await next()

  const ip = getIP(c)
  const geo = cityLookup.get(ip)

  c.set("ip", ip)
  c.set("city", geo?.city?.names?.en || null)
  c.set("country", geo?.country?.names?.en || null)

  await next()
}
