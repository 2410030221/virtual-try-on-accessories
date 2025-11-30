import { Id } from "../../convex/_generated/dataModel";

interface Model {
  _id: Id<"models">;
  name: string;
  imageUrl: string;
  skinTone: string;
  hairColor: string;
  featured: boolean;
}

interface ModelSelectorProps {
  models: Model[];
  selectedModel: string | null;
  onModelSelect: (id: string) => void;
}

export function ModelSelector({ models, selectedModel, onModelSelect }: ModelSelectorProps) {
  if (models.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👥</span>
        </div>
        <p className="text-lg font-medium mb-2">No models available</p>
        <p className="text-sm">Models will appear here when loaded</p>
      </div>
    );
  }

  // Sort models to show featured ones first
  const sortedModels = [...models].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
      {sortedModels.map((model, index) => (
        <div
          key={model._id}
          onClick={() => onModelSelect(model._id)}
          className={`cursor-pointer rounded-2xl border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
            selectedModel === model._id
              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-xl scale-105'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="p-4">
            <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-3 overflow-hidden group">
              <img
                src={model.imageUrl}
                alt={model.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Featured Badge */}
              {model.featured && (
                <div className="absolute top-2 right-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    ⭐ Featured
                  </div>
                </div>
              )}

              {/* Selection Indicator */}
              {selectedModel === model._id && (
                <div className="absolute top-2 left-2">
                  <div className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    ✓ Selected
                  </div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium">Click to select</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-sm">{model.name}</h4>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Skin Tone</span>
                  <span className="text-xs text-gray-700 font-semibold">{model.skinTone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Hair Color</span>
                  <span className="text-xs text-gray-700 font-semibold">{model.hairColor}</span>
                </div>
              </div>

              {/* Model Stats */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${selectedModel === model._id ? 'bg-purple-400' : 'bg-gray-300'}`}></div>
                    <span className="text-xs text-gray-600">
                      {selectedModel === model._id ? 'Active' : 'Available'}
                    </span>
                  </div>
                  {model.featured && (
                    <span className="text-xs text-yellow-600 font-medium">Popular</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
