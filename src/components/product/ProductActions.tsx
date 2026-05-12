"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { WcProduct } from "@/services/mockData";
import { ShoppingBag } from "lucide-react";

export default function ProductActions({ product }: { product: WcProduct }) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

  const isVariable = product.type === 'variable' && product.attributes.length > 0;
  
  // Check if all attributes are selected
  const allAttributesSelected = !isVariable || product.attributes.every(attr => selectedAttributes[attr.name]);
  
  const canAddToCart = product.stock_status === 'instock' && allAttributesSelected;

  const handleAdd = () => {
    if (canAddToCart) {
      addItem(product, quantity, isVariable ? selectedAttributes : undefined);
    }
  };

  return (
    <>
      {/* Variations (if variable) */}
      {isVariable && (
        <div className="mb-8 space-y-6 border-t border-b border-gray-100 dark:border-gray-800 py-6">
          {product.attributes.map((attr) => (
            <div key={attr.id}>
              <h3 className="font-semibold mb-3">Elige tu {attr.name}:</h3>
              <div className="flex flex-wrap gap-3">
                {attr.options.map((opt, i) => {
                  const isSelected = selectedAttributes[attr.name] === opt;
                  return (
                    <button 
                      key={i} 
                      onClick={() => setSelectedAttributes({ ...selectedAttributes, [attr.name]: opt })}
                      className={`px-5 py-2.5 rounded-full border transition-all ${
                        isSelected 
                        ? 'border-pink-600 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 font-bold' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-pink-400 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add to Cart Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 mt-auto">
        <div className="flex items-center justify-between border-2 border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 sm:w-32 bg-white dark:bg-[#121212]">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="text-xl text-gray-500 hover:text-pink-600 transition-colors"
          >
            -
          </button>
          <span className="font-bold">{quantity}</span>
          <button 
            onClick={() => setQuantity(q => q + 1)}
            className="text-xl text-gray-500 hover:text-pink-600 transition-colors"
          >
            +
          </button>
        </div>
        
        <button 
          onClick={handleAdd}
          disabled={!canAddToCart}
          className="flex-1 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center gap-2 rounded-full font-bold text-lg py-3 hover:bg-pink-600 dark:hover:bg-pink-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:shadow-none"
        >
          <ShoppingBag size={20} />
          {product.stock_status !== 'instock' ? 'Sin Stock' : !allAttributesSelected ? 'Elige tus opciones' : 'Agregar al carrito'}
        </button>
      </div>
    </>
  );
}
