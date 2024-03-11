import {
  sqliteTable,
  AnySQLiteColumn,
  foreignKey,
  primaryKey,
  text,
  integer,
  numeric,
} from "drizzle-orm/sqlite-core";
import {sql} from "drizzle-orm";

export const account = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, {onDelete: "cascade"}),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => {
    return {
      pk0: primaryKey({
        columns: [table.provider, table.providerAccountId],
        name: "account_provider_providerAccountId_pk",
      }),
    };
  },
);

export const session = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, {onDelete: "cascade"}),
  expires: integer("expires").notNull(),
});

export const user = sqliteTable("user", {
  id: text("id").primaryKey().notNull(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified"),
  image: text("image"),
});

export const verificationToken = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires").notNull(),
  },
  (table) => {
    return {
      pk0: primaryKey({
        columns: [table.identifier, table.token],
        name: "verificationToken_identifier_token_pk",
      }),
    };
  },
);

export const oldPushCategories = sqliteTable("__old_push_categories", {
  id: numeric("id").primaryKey().notNull(),
  name: numeric("name").notNull(),
  description: numeric("description").notNull(),
});

export const goals = sqliteTable("goals", {
  id: numeric("id").primaryKey().notNull(),
  userId: numeric("user_id")
    .notNull()
    .references(() => user.id),
  categoryId: numeric("category_id")
    .notNull()
    .references(() => oldPushCategories.id),
  targetAmount: numeric("target_amount").notNull(),
  currentAmount: numeric("current_amount").notNull(),
  goal: numeric("goal").notNull(),
});

export const transactions = sqliteTable("transactions", {
  id: numeric("id").primaryKey().notNull(),
  userId: numeric("user_id").references(() => user.id),
  categoryId: numeric("category_id").references(() => oldPushCategories.id),
  amount: numeric("amount").notNull(),
  description: numeric("description").notNull(),
  date: numeric("date").notNull(),
  type: numeric("type").notNull(),
});

export const categories = sqliteTable("categories", {
  id: numeric("id").primaryKey().notNull(),
  name: numeric("name").notNull(),
  description: numeric("description").notNull(),
});
