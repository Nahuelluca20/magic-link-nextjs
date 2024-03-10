import {randomUUID} from "crypto";

import {sqliteTable, text} from "drizzle-orm/sqlite-core";

import {users} from "./users";
import {categories} from "./categories";

export const goals = sqliteTable("goals", {
  id: text("id", {length: 36})
    .$defaultFn(() => randomUUID())
    .notNull()
    .primaryKey(),
  user_id: text("user_id", {length: 36})
    .notNull()
    .references(() => users.id),
  category_id: text("category_id", {length: 36})
    .notNull()
    .references(() => categories.id),
  target_amount: text("target_amount", {length: 100}).notNull(),
  current_amount: text("current_amount", {length: 100}).notNull(),
  goal: text("goal", {length: 100}).notNull(),
});
