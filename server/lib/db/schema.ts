import {
  pgTable,
  text,
  timestamp,
  jsonb,
  uuid,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core"
import { sql, relations } from "drizzle-orm"

export const verificationModeEnum = pgEnum("verification_mode", [
  "none",
  "email",
])

// Users
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Kinde ID
  createdAt: timestamp("created_at").defaultNow(),
  preferences: jsonb("preferences").$type<{}>().default({}),
})

// Links
export const links = pgTable("links", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  lockedUrl: text("locked_url").notNull(),
  redirectUrl: text("redirect_url").notNull(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),

  title: text("title"),
  description: text("description"),

  verificationMode: verificationModeEnum("verification_mode").default("none"),

  formDefinition: jsonb("form_definition")
    .$type<
      {
        id: string
        type: "email" | "name" | "surname" | "age"
        answerType: "email" | "integer" | "string"
        label?: string
        required?: boolean
        displayOrder?: number
      }[]
    >()
    .notNull(),
})

// Submissions
export const submissions = pgTable("submissions", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  linkId: uuid("link_id")
    .notNull()
    .references(() => links.id, { onDelete: "cascade" }),

  submittedAt: timestamp("submitted_at").defaultNow(),
  verified: boolean("verified").default(false),

  answers: jsonb("answers")
    .$type<Record<string, string | number | boolean>>()
    .notNull(),
})

/** Relations */

export const userRelations = relations(users, ({ many }) => ({
  links: many(links),
}))

export const linkRelations = relations(links, ({ one, many }) => ({
  user: one(users, {
    fields: [links.userId],
    references: [users.id],
  }),
  submissions: many(submissions),
}))

export const submissionRelations = relations(submissions, ({ one }) => ({
  link: one(links, {
    fields: [submissions.linkId],
    references: [links.id],
  }),
}))
