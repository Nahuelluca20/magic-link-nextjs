import {randomUUID} from "crypto";

import {sqliteTable, text} from "drizzle-orm/sqlite-core";

import {users} from "./users";
import {categories} from "./categories";

export const transactions = sqliteTable("transactions", {
  id: text("id", {length: 36})
    .$defaultFn(() => randomUUID())
    .notNull()
    .primaryKey(),
  user_id: text("user_id", {length: 36}).references(() => users.id),
  category_id: text("category_id", {length: 36}).references(() => categories.id),
  amount: text("amount", {length: 100}).notNull(),
  description: text("description", {length: 255}).notNull(),
  date: text("date", {length: 100}).notNull(),
  type: text("type", {length: 100}).notNull(),
});
