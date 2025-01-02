import { relations, sql } from "drizzle-orm";
import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Search Totals Table
export const searchTotals = pgTable("search_totals", (t) => ({
  thread_id: t.varchar({ length: 255 }).notNull().primaryKey(),
  total_searches: t.integer().notNull().default(0),
  last_searched_at: t
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
}));

export const SearchTotalRelations = relations(searchTotals, ({ one }) => ({
  threadSearches: one(Searches, {
    fields: [searchTotals.thread_id],
    references: [Searches.thread_id],
  }),
}));

export const CreateSearchTotalsSchema = createInsertSchema(searchTotals, {
  thread_id: z.string().max(255),
  total_searches: z.number().optional(),
  last_searched_at: z.string().optional(),
}).omit({});

// User Table
export const User = pgTable("user", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 255 }),
  email: t.varchar({ length: 255 }).notNull(),
  emailVerified: t.timestamp({ mode: "date", withTimezone: true }),
  image: t.varchar({ length: 255 }),
  search_attempts: t.integer().notNull().default(0),
}));

export const UserRelations = relations(User, ({ many }) => ({
  searches: many(Searches),
}));

// Searches Table
export const Searches = pgTable("searches", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  thread_id: t.varchar({ length: 255 }),
  user_id: t.uuid().references(() => User.id),
  response_data: t.jsonb(),
  is_saved: t.boolean().notNull().default(false),
  is_active: t.boolean().notNull().default(true),
  created_at: t.timestamp({ mode: "date", withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp({ mode: "date", withTimezone: true }).notNull().defaultNow(),
}));

export const SearchRelations = relations(Searches, ({ one, many }) => ({
  user: one(User, { fields: [Searches.user_id], references: [User.id] }),
  metrics: many(Metrics),
}));

export const CreateSearchSchema = createInsertSchema(Searches, {
  thread_id: z.string().max(255).optional(),
  user_id: z.string().uuid().optional(),
  response_data: z.any().optional(),
  is_saved: z.boolean().optional(),
  is_active: z.boolean().optional(),
}).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Metrics Table
export const Metrics = pgTable("metrics", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  search_id: t
    .uuid()
    .notNull()
    .references(() => Searches.id, { onDelete: "cascade" }),
  metric_type: t.varchar({ length: 50 }).notNull(), // e.g., 'view', 'copy'
  created_at: t
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
}));

export const MetricRelations = relations(Metrics, ({ one }) => ({
  search: one(Searches, {
    fields: [Metrics.search_id],
    references: [Searches.id],
  }),
}));

export const CreateMetricSchema = createInsertSchema(Metrics, {
  search_id: z.string().uuid(),
  metric_type: z.enum(["view", "copy"]),
}).omit({
  id: true,
  created_at: true,
});

// Account Table
export const Account = pgTable(
  "account",
  (t) => ({
    userId: t
      .uuid()
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    type: t
      .varchar({ length: 255 })
      .$type<"email" | "oauth" | "oidc" | "webauthn">()
      .notNull(),
    provider: t.varchar({ length: 255 }).notNull(),
    providerAccountId: t.varchar({ length: 255 }).notNull(),
    refresh_token: t.varchar({ length: 255 }),
    access_token: t.text(),
    expires_at: t.integer(),
    token_type: t.varchar({ length: 255 }),
    scope: t.varchar({ length: 255 }),
    id_token: t.text(),
    session_state: t.varchar({ length: 255 }),
  }),
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const AccountRelations = relations(Account, ({ one }) => ({
  user: one(User, { fields: [Account.userId], references: [User.id] }),
}));

// Session Table
export const Session = pgTable("session", (t) => ({
  sessionToken: t.varchar({ length: 255 }).notNull().primaryKey(),
  userId: t
    .uuid()
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  expires: t.timestamp({ mode: "date", withTimezone: true }).notNull(),
}));

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));

// User Saved History Table
export const UserSavedHistory = pgTable("user_saved_history", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  user_id: t.uuid().notNull().references(() => User.id, { onDelete: "cascade" }),
  search_id: t.uuid().notNull().references(() => Searches.id, { onDelete: "cascade" }),
  saved_at: t.timestamp({ mode: "date", withTimezone: true }).notNull().defaultNow(),
}));

export const UserSavedHistoryRelations = relations(UserSavedHistory, ({ one }) => ({
  user: one(User, { fields: [UserSavedHistory.user_id], references: [User.id] }),
  search: one(Searches, { fields: [UserSavedHistory.search_id], references: [Searches.id] }),
}));
