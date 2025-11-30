import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getRandomQuote = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let quotes;
    if (args.category) {
      quotes = await ctx.db
        .query("fashionQuotes")
        .filter((q) => q.eq(q.field("category"), args.category))
        .collect();
    } else {
      quotes = await ctx.db.query("fashionQuotes").collect();
    }
    
    if (quotes.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  },
});

export const addQuote = mutation({
  args: {
    text: v.string(),
    author: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("fashionQuotes", args);
  },
});
