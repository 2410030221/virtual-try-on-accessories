import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { AccessoryGrid } from "./AccessoryGrid";
import { ModelSelector } from "./ModelSelector";
import { QuoteDisplay } from "./QuoteDisplay";
import { TryOnViewer } from "./TryOnViewer";
import { CategoryFilter } from "./CategoryFilter";

export function VirtualTryOnApp() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(null);

  const accessories = useQuery(api.accessories.listAccessories, 
    selectedCategory ? { category: selectedCategory } : {}
  );
  const models = useQuery(api.models.listModels);
  const categories = useQuery(api.accessories.getCategories);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section with Quote */}
      <div className="text-center mb-12 animate-fadeInUp">
        <QuoteDisplay />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Filters and Accessories */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-100/50 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
            </div>
            <CategoryFilter
              categories={categories || []}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-100/50 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">Accessories</h3>
            </div>
            <AccessoryGrid
              accessories={accessories || []}
              selectedAccessory={selectedAccessory}
              onAccessorySelect={setSelectedAccessory}
            />
          </div>
        </div>

        {/* Center Column - Try-On Viewer */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-rose-100/50 p-6 sticky top-24 hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">Virtual Try-On</h3>
            </div>
            <TryOnViewer
              selectedModel={selectedModel}
              selectedAccessory={selectedAccessory}
              models={models || []}
              accessories={accessories || []}
            />
          </div>
        </div>

        {/* Right Column - Model Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-100/50 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">Choose Your Model</h3>
            </div>
            <ModelSelector
              models={models || []}
              selectedModel={selectedModel}
              onModelSelect={setSelectedModel}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="mt-20 grid md:grid-cols-3 gap-8">
        <div className="group text-center p-8 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <span className="text-white text-2xl">✨</span>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Try-On</h4>
          <p className="text-gray-600 leading-relaxed">Experience realistic virtual try-on with advanced AI technology that adapts to your unique features</p>
        </div>

        <div className="group text-center p-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <span className="text-white text-2xl">💎</span>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">Premium Collection</h4>
          <p className="text-gray-600 leading-relaxed">Curated selection of high-quality accessories from top designers and luxury brands worldwide</p>
        </div>

        <div className="group text-center p-8 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <span className="text-white text-2xl">📱</span>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">Mobile Ready</h4>
          <p className="text-gray-600 leading-relaxed">Seamless experience across all devices with responsive design and touch-optimized interactions</p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-20 text-center">
        <div className="bg-gradient-to-r from-rose-500 via-purple-500 to-pink-500 rounded-3xl p-12 text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Style?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands of fashion enthusiasts discovering their perfect accessories</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Shopping
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white hover:text-purple-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
