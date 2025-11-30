import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";

export function QuoteDisplay() {
  const [currentQuote, setCurrentQuote] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);
  const quote = useQuery(api.quotes.getRandomQuote, {});

  useEffect(() => {
    if (quote) {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuote(quote);
        setIsVisible(true);
      }, 300);
    }
  }, [quote]);

  // Enhanced fallback quotes
  const fallbackQuotes = [
    { 
      text: "Fashion is about dressing according to what's fashionable. Style is more about being yourself.", 
      author: "Oscar de la Renta",
      category: "style"
    },
    { 
      text: "Accessories are like vitamins to fashion — as such, you should use them liberally.", 
      author: "Anna Dello Russo",
      category: "inspiration"
    },
    { 
      text: "Style is a way to say who you are without having to speak.", 
      author: "Rachel Zoe",
      category: "confidence"
    },
    { 
      text: "Fashion fades, but style is eternal.", 
      author: "Yves Saint Laurent",
      category: "timeless"
    },
    {
      text: "Elegance is the only beauty that never fades.",
      author: "Audrey Hepburn",
      category: "elegance"
    },
    {
      text: "You can have anything you want in life if you dress for it.",
      author: "Edith Head",
      category: "confidence"
    }
  ];

  const displayQuote = currentQuote || fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-rose-100 via-purple-50 to-pink-100 rounded-3xl p-12 mb-8 border border-rose-200/50 shadow-xl">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-rose-200/30 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-200/30 to-transparent rounded-full translate-x-20 translate-y-20"></div>
      
      <blockquote className={`relative text-center transition-all duration-500 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
        <div className="mb-6">
          <span className="text-6xl text-rose-300/50 font-serif leading-none">"</span>
        </div>
        <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 italic mb-6 leading-relaxed max-w-4xl mx-auto">
          {displayQuote.text}
        </p>
        <footer className="flex items-center justify-center space-x-4">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-rose-400"></div>
          <cite className="text-lg md:text-xl text-rose-600 font-semibold not-italic">
            {displayQuote.author}
          </cite>
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-rose-400"></div>
        </footer>
        {displayQuote.category && (
          <div className="mt-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-rose-100 text-rose-700 border border-rose-200">
              #{displayQuote.category}
            </span>
          </div>
        )}
      </blockquote>
    </div>
  );
}
