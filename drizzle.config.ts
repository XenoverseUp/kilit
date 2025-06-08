import dotenv from "dotenv"
import path from "path"
import { defineConfig } from "drizzle-kit"

const env = process.env.NODE_ENV || "development"
const envPath = path.resolve(process.cwd(), `.env.${env}.local`)

console.log(`Loading .env file: ${envPath}`)
dotenv.config({ path: envPath })

export default defineConfig({
  out: "./drizzle",
  schema: "./server/lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
