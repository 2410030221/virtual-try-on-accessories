import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listAccessories = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("accessories")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
    }
    return await ctx.db.query("accessories").collect();
  },
});

export const getAccessory = query({
  args: { id: v.id("accessories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const addAccessory = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    price: v.number(),
    description: v.string(),
    imageUrl: v.string(),
    colors: v.array(v.string()),
    materials: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("accessories", {
      ...args,
      inStock: true,
    });
  },
});

export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    const accessories = await ctx.db.query("accessories").collect();
    const categories = [...new Set(accessories.map(a => a.category))];
    return categories;
  },
});
