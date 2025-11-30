import { Id } from "../../convex/_generated/dataModel";

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

interface AccessoryGridProps {
  accessories: Accessory[];
  selectedAccessory: string | null;
  onAccessorySelect: (id: string) => void;
}

export function AccessoryGrid({ accessories, selectedAccessory, onAccessorySelect }: AccessoryGridProps) {
  if (accessories.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">💍</span>
        </div>
        <p className="text-lg font-medium mb-2">No accessories found</p>
        <p className="text-sm">Try selecting a different category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2">
      {accessories.map((accessory, index) => (
        <div
          key={accessory._id}
          onClick={() => onAccessorySelect(accessory._id)}
          className={`cursor-pointer rounded-2xl border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
            selectedAccessory === accessory._id
              ? 'border-rose-500 bg-gradient-to-br from-rose-50 to-pink-50 shadow-xl scale-105'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="p-5">
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-4 overflow-hidden group">
              <img
                src={accessory.imageUrl}
                alt={accessory.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-lg">{accessory.name}</h4>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{accessory.description}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-rose-600">${accessory.price}</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                  {accessory.category}
                </span>
              </div>
              
              {/* Enhanced Color Display */}
              {accessory.colors.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Colors</span>
                  <div className="flex space-x-1">
                    {accessory.colors.slice(0, 4).map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-5 h-5 rounded-full border-2 border-white shadow-md hover:scale-125 transition-transform duration-200"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                    {accessory.colors.length > 4 && (
                      <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white shadow-md flex items-center justify-center">
                        <span className="text-xs text-gray-600 font-bold">+{accessory.colors.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${accessory.inStock ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-xs text-gray-600">
                    {accessory.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                {selectedAccessory === accessory._id && (
                  <div className="flex items-center space-x-1 text-rose-600">
                    <span className="text-xs font-medium">Selected</span>
                    <span className="text-sm">✓</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
