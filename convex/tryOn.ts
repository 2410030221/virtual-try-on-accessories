import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const saveTryOnSession = mutation({
  args: {
    modelId: v.id("models"),
    accessoryId: v.id("accessories"),
    sessionData: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    
    return await ctx.db.insert("tryOnSessions", {
      userId: userId || undefined,
      modelId: args.modelId,
      accessoryId: args.accessoryId,
      sessionData: args.sessionData,
    });
  },
});

export const getUserTryOnSessions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    
    return await ctx.db
      .query("tryOnSessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});
