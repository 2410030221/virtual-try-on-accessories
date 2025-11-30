import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface Model {
  _id: Id<"models">;
  name: string;
  imageUrl: string;
  skinTone: string;
  hairColor: string;
  featured: boolean;
}

interface Accessory {
  _id: Id<"accessories">;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  colors: string[];
  materials: string[];
  inStock: boolean;
}

interface TryOnViewerProps {
  selectedModel: string | null;
  selectedAccessory: string | null;
  models: Model[];
  accessories: Accessory[];
}

export function TryOnViewer({ selectedModel, selectedAccessory, models, accessories }: TryOnViewerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const saveTryOnSession = useMutation(api.tryOn.saveTryOnSession);

  const currentModel = models.find(m => m._id === selectedModel);
  const currentAccessory = accessories.find(a => a._id === selectedAccessory);

  const handleSaveSession = async () => {
    if (!selectedModel || !selectedAccessory) return;
    
    setIsLoading(true);
    try {
      await saveTryOnSession({
        modelId: selectedModel as Id<"models">,
        accessoryId: selectedAccessory as Id<"accessories">,
        sessionData: JSON.stringify({
          timestamp: Date.now(),
          modelName: currentModel?.name,
          accessoryName: currentAccessory?.name,
        }),
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Try-On Display Area */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 group">
        {currentModel ? (
          <div className="relative w-full h-full">
            <img
              src={currentModel.imageUrl}
              alt={currentModel.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Accessory Overlay with enhanced positioning */}
            {currentAccessory && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative animate-pulse">
                  <img
                    src={currentAccessory.imageUrl}
                    alt={currentAccessory.name}
                    className="w-32 h-32 object-contain opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-110"
                    style={{
                      filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                    }}
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                </div>
              </div>
            )}
            
            {/* Enhanced Model Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-white font-semibold text-lg">{currentModel.name}</p>
                  <p className="text-white/90 text-sm">{currentModel.skinTone} • {currentModel.hairColor}</p>
                </div>
              </div>
            </div>

            {/* Try-on indicator */}
            {currentAccessory && (
              <div className="absolute top-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-lg">
                  Try-On Active
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <span className="text-3xl">👤</span>
            </div>
            <p className="text-center text-lg font-medium mb-2">Select a model to start</p>
            <p className="text-center text-sm text-gray-400">Choose from our diverse collection of models</p>
          </div>
        )}
      </div>

      {/* Enhanced Accessory Info */}
      {currentAccessory && (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">{currentAccessory.name}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{currentAccessory.description}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-rose-600">${currentAccessory.price}</span>
              <p className="text-sm text-gray-500 capitalize">{currentAccessory.category}</p>
            </div>
          </div>
          
          {/* Enhanced Materials Display */}
          {currentAccessory.materials.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Materials</p>
              <div className="flex flex-wrap gap-2">
                {currentAccessory.materials.map((material, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Color Swatches */}
          {currentAccessory.colors.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Available Colors</p>
              <div className="flex space-x-2">
                {currentAccessory.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Action Buttons */}
      <div className="space-y-3">
        {selectedModel && selectedAccessory && (
          <button
            onClick={handleSaveSession}
            disabled={isLoading}
            className={`w-full font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
              isSaved 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-r from-rose-500 to-purple-500 text-white hover:from-rose-600 hover:to-purple-600'
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            ) : isSaved ? (
              <div className="flex items-center justify-center space-x-2">
                <span>✓</span>
                <span>Saved Successfully!</span>
              </div>
            ) : (
              "Save This Look"
            )}
          </button>
        )}
        
        <button
          className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          onClick={() => window.location.reload()}
        >
          <div className="flex items-center justify-center space-x-2">
            <span>🔄</span>
            <span>Reset Try-On</span>
          </div>
        </button>
      </div>
    </div>
  );
}
