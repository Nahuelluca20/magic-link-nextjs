import {randomUUID} from "crypto";

import {sqliteTable, text} from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: text("id", {length: 36})
    .$defaultFn(() => randomUUID())
    .notNull()
    .primaryKey(),
  category_name: text("name", {length: 100}).notNull(),
  description: text("description", {length: 255}).notNull(),
});
