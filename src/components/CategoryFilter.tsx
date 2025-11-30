interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const allCategories = ['All', ...categories];

  // Category icons mapping
  const categoryIcons: Record<string, string> = {
    'All': '✨',
    'earrings': '💎',
    'necklaces': '📿',
    'bracelets': '⚡',
    'rings': '💍',
    'watches': '⌚',
  };

  return (
    <div className="space-y-3">
      {allCategories.map((category, index) => {
        const isSelected = category === 'All' ? selectedCategory === null : selectedCategory === category;
        const icon = categoryIcons[category] || '🔸';
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category === 'All' ? null : category)}
            className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 ${
              isSelected
                ? 'bg-gradient-to-r from-rose-500 to-purple-500 text-white shadow-xl scale-105'
                : 'bg-gradient-to-r from-gray-50 to-white text-gray-700 hover:from-gray-100 hover:to-gray-50 hover:shadow-lg border border-gray-200'
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{icon}</span>
              <div className="flex-1">
                <span className="font-semibold capitalize text-lg">{category}</span>
                {isSelected && (
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <span className="text-xs opacity-90">Active filter</span>
                  </div>
                )}
              </div>
              {isSelected && (
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
