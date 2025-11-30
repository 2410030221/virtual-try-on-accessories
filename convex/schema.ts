import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  accessories: defineTable({
    name: v.string(),
    category: v.string(), // "earrings", "necklaces", "bracelets", "rings", "watches"
    price: v.number(),
    description: v.string(),
    imageUrl: v.string(),
    colors: v.array(v.string()),
    materials: v.array(v.string()),
    inStock: v.boolean(),
  }).index("by_category", ["category"]),

  models: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    skinTone: v.string(),
    hairColor: v.string(),
    featured: v.boolean(),
  }),

  fashionQuotes: defineTable({
    text: v.string(),
    author: v.string(),
    category: v.string(), // "inspiration", "style", "confidence"
  }),

  tryOnSessions: defineTable({
    userId: v.optional(v.id("users")),
    modelId: v.id("models"),
    accessoryId: v.id("accessories"),
    sessionData: v.string(), // JSON string for try-on configuration
  }).index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
