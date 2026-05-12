"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/services/mockData";
import { X, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { 
    items, 
    isDrawerOpen, 
    closeDrawer, 
    removeItem, 
    updateQuantity, 
    getTotalPrice, 
    getTotalItems 
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors with Zustand persist
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-[#121212] z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-pink-600" />
            <h2 className="text-xl font-bold">Tu Carrito ({getTotalItems()})</h2>
          </div>
          <button 
            onClick={closeDrawer}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag size={64} className="mb-4 text-gray-300 dark:text-gray-700" />
              <p className="text-lg font-medium mb-2">Tu carrito está vacío</p>
              <button 
                onClick={closeDrawer}
                className="text-pink-600 font-medium hover:underline"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="relative h-20 w-20 flex-shrink-0 bg-white dark:bg-black rounded-xl overflow-hidden">
                  {item.product.images.length > 0 && (
                    <Image 
                      src={item.product.images[0].src} 
                      alt={item.product.images[0].alt}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-2 pr-6 relative">
                      <Link href={`/productos/${item.product.slug}`} onClick={closeDrawer} className="hover:text-pink-600 transition-colors">
                        {item.product.name}
                      </Link>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="absolute top-0 right-0 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </h3>
                    
                    {/* Attributes */}
                    {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {Object.entries(item.selectedAttributes).map(([key, val]) => (
                          <span key={key} className="mr-2">{key}: {val}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5 bg-white dark:bg-black">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-500 hover:text-pink-600 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-500 hover:text-pink-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    {/* Price */}
                    <span className="font-bold text-pink-600 dark:text-pink-400 text-sm">
                      {formatPrice((
                        (item.product.on_sale && item.product.sale_price ? parseFloat(item.product.sale_price) : parseFloat(item.product.price)) * item.quantity
                      ).toString())}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1a]">
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="font-medium text-gray-600 dark:text-gray-300">Total</span>
              <span className="font-bold text-2xl">{formatPrice(getTotalPrice().toString())}</span>
            </div>
            
            <Link 
              href="/checkout"
              onClick={closeDrawer}
              className="w-full bg-pink-600 text-white font-bold py-4 rounded-full text-lg hover:bg-pink-700 transition-colors shadow-lg hover:shadow-pink-600/30 flex items-center justify-center gap-2"
            >
              Iniciar Pago
            </Link>
            <button 
              onClick={closeDrawer}
              className="w-full mt-4 text-sm font-medium text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
