import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listModels = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("models").collect();
  },
});

export const getFeaturedModels = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("models")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});

export const addModel = mutation({
  args: {
    name: v.string(),
    imageUrl: v.string(),
    skinTone: v.string(),
    hairColor: v.string(),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("models", args);
  },
});
