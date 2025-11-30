import { mutation } from "./_generated/server";

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Add sample accessories
    const accessories = [
      {
        name: "Diamond Stud Earrings",
        category: "earrings",
        price: 299,
        description: "Classic diamond stud earrings with brilliant cut stones",
        imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
        colors: ["silver", "gold"],
        materials: ["diamond", "14k gold"],
        inStock: true,
      },
      {
        name: "Pearl Drop Earrings",
        category: "earrings",
        price: 189,
        description: "Elegant freshwater pearl drop earrings",
        imageUrl: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop",
        colors: ["white", "cream"],
        materials: ["pearl", "sterling silver"],
        inStock: true,
      },
      {
        name: "Gold Chain Necklace",
        category: "necklaces",
        price: 459,
        description: "Delicate 18k gold chain necklace, perfect for layering",
        imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
        colors: ["gold"],
        materials: ["18k gold"],
        inStock: true,
      },
      {
        name: "Tennis Bracelet",
        category: "bracelets",
        price: 899,
        description: "Classic tennis bracelet with cubic zirconia stones",
        imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
        colors: ["silver"],
        materials: ["sterling silver", "cubic zirconia"],
        inStock: true,
      },
      {
        name: "Rose Gold Watch",
        category: "watches",
        price: 1299,
        description: "Luxury rose gold watch with leather strap",
        imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
        colors: ["rose gold", "brown"],
        materials: ["rose gold", "leather"],
        inStock: true,
      },
      {
        name: "Sapphire Ring",
        category: "rings",
        price: 799,
        description: "Stunning sapphire ring with diamond accents",
        imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
        colors: ["blue", "silver"],
        materials: ["sapphire", "diamond", "white gold"],
        inStock: true,
      },
    ];

    for (const accessory of accessories) {
      await ctx.db.insert("accessories", accessory);
    }

    // Add sample models
    const models = [
      {
        name: "Emma",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop",
        skinTone: "Fair",
        hairColor: "Blonde",
        featured: true,
      },
      {
        name: "Sophia",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
        skinTone: "Medium",
        hairColor: "Brown",
        featured: true,
      },
      {
        name: "Zara",
        imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop",
        skinTone: "Deep",
        hairColor: "Black",
        featured: true,
      },
      {
        name: "Lily",
        imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop",
        skinTone: "Fair",
        hairColor: "Red",
        featured: false,
      },
    ];

    for (const model of models) {
      await ctx.db.insert("models", model);
    }

    // Add fashion quotes
    const quotes = [
      {
        text: "Fashion is about dressing according to what's fashionable. Style is more about being yourself.",
        author: "Oscar de la Renta",
        category: "style",
      },
      {
        text: "Accessories are like vitamins to fashion — as such, you should use them liberally.",
        author: "Anna Dello Russo",
        category: "inspiration",
      },
      {
        text: "Style is a way to say who you are without having to speak.",
        author: "Rachel Zoe",
        category: "confidence",
      },
      {
        text: "Fashion fades, but style is eternal.",
        author: "Yves Saint Laurent",
        category: "style",
      },
      {
        text: "Elegance is the only beauty that never fades.",
        author: "Audrey Hepburn",
        category: "inspiration",
      },
      {
        text: "You can have anything you want in life if you dress for it.",
        author: "Edith Head",
        category: "confidence",
      },
    ];

    for (const quote of quotes) {
      await ctx.db.insert("fashionQuotes", quote);
    }

    return "Database seeded successfully!";
  },
});
