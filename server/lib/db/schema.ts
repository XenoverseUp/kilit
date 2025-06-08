import { pgTable, text, timestamp, jsonb, uuid, boolean } from "drizzle-orm/pg-core"
import { sql, relations } from "drizzle-orm"

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Kinde ID
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  picture: text("picture"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const groups = pgTable("groups", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const links = pgTable("links", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  groupId: uuid("group_id").references(() => groups.id, { onDelete: "cascade" }),
  lockedUrl: text("locked_url").notNull(),
  redirectUrl: text("redirect_url").notNull(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const formFields = pgTable("form_fields", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  linkId: uuid("link_id")
    .notNull()
    .references(() => links.id, { onDelete: "cascade" }),

  /** One of: email, name, surname, age, custom */
  type: text("type", {
    enum: ["email", "name", "surname", "age", "custom"],
  }).notNull(),

  /** Required if type is 'custom' */
  question: text("question"),

  /** Required if type is 'custom'; e.g., 'string', 'number', etc. */
  answerType: text("answer_type", {
    enum: ["string", "number", "boolean"],
  }),

  /** Is this field required? */
  required: boolean("required").default(false),

  /** Optional order value to control rendering order */
  order: text("order"),
})

export const submissions = pgTable("submissions", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  linkId: uuid("link_id")
    .notNull()
    .references(() => links.id, { onDelete: "cascade" }),
  submittedAt: timestamp("submitted_at").defaultNow(),
  data: jsonb("data").notNull(), // { email: "xx", name: "yy", ... }
})

/** Relations */

export const userRelations = relations(users, ({ many }) => ({
  groups: many(groups),
  links: many(links),
}))

export const groupRelations = relations(groups, ({ one, many }) => ({
  user: one(users, {
    fields: [groups.userId],
    references: [users.id],
  }),
  links: many(links),
}))

export const linkRelations = relations(links, ({ one, many }) => ({
  user: one(users, {
    fields: [links.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [links.groupId],
    references: [groups.id],
  }),
  formFields: many(formFields),
  submissions: many(submissions),
}))

export const formFieldRelations = relations(formFields, ({ one }) => ({
  link: one(links, {
    fields: [formFields.linkId],
    references: [links.id],
  }),
}))

export const submissionRelations = relations(submissions, ({ one }) => ({
  link: one(links, {
    fields: [submissions.linkId],
    references: [links.id],
  }),
}))
