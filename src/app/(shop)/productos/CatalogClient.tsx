"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Filter, Check } from "lucide-react";
import { WcProduct, WcCategory, formatPrice } from "@/services/mockData";

export default function CatalogClient({ 
  initialProducts, 
  categories,
  initialCategorySlug = null
}: { 
  initialProducts: WcProduct[], 
  categories: WcCategory[],
  initialCategorySlug?: string | null
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategorySlug);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(20000);

  // Derive attributes from products dynamically
  const allAttributes = useMemo(() => {
    const attrs: Record<string, Set<string>> = {};
    initialProducts.forEach(p => {
      p.attributes.forEach(attr => {
        if (!attrs[attr.name]) attrs[attr.name] = new Set();
        attr.options.forEach(opt => attrs[attr.name].add(opt));
      });
    });
    return Object.entries(attrs).map(([name, optionsSet]) => ({
      name,
      options: Array.from(optionsSet)
    }));
  }, [initialProducts]);

  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string[]>>({});

  const toggleAttribute = (attrName: string, option: string) => {
    setSelectedAttributes(prev => {
      const current = prev[attrName] || [];
      if (current.includes(option)) {
        return { ...prev, [attrName]: current.filter(o => o !== option) };
      } else {
        return { ...prev, [attrName]: [...current, option] };
      }
    });
  };

  // Filter products based on all selected criteria
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      // Category filter
      if (selectedCategory && !p.categories.some(c => c.slug === selectedCategory)) return false;
      
      // Stock filter
      if (onlyInStock && p.stock_status !== 'instock') return false;
      
      // Sale filter
      if (onlyOnSale && !p.on_sale) return false;

      // Price filter
      if (parseFloat(p.price) > maxPrice) return false;

      // Attributes filter
      for (const [attrName, selectedOpts] of Object.entries(selectedAttributes)) {
        if (selectedOpts.length > 0) {
          const productAttr = p.attributes.find(a => a.name === attrName);
          if (!productAttr) return false; // Product doesn't have this attribute at all
          const hasMatchingOption = productAttr.options.some(o => selectedOpts.includes(o));
          if (!hasMatchingOption) return false;
        }
      }

      return true;
    });
  }, [initialProducts, selectedCategory, onlyInStock, onlyOnSale, maxPrice, selectedAttributes]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filtros */}
      <aside className="w-full lg:w-1/4">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 sticky top-24 shadow-sm max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            <Filter size={20} className="text-pink-600 dark:text-pink-500" />
            <h2 className="text-xl font-bold">Filtros</h2>
            <button 
              onClick={() => {
                setSelectedCategory(null);
                setOnlyInStock(false);
                setOnlyOnSale(false);
                setMaxPrice(20000);
                setSelectedAttributes({});
              }}
              className="ml-auto text-xs text-gray-500 hover:text-pink-600 underline"
            >
              Limpiar
            </button>
          </div>
          
          {/* Categorías */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200 uppercase text-sm tracking-wider">Categorías</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full flex items-center justify-between text-sm ${!selectedCategory ? 'text-pink-600 font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-pink-600'}`}
                >
                  <span>Todos los productos</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs">{initialProducts.length}</span>
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full flex items-center justify-between text-sm ${selectedCategory === cat.slug ? 'text-pink-600 font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-pink-600'}`}
                  >
                    <span>{cat.name}</span>
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs">{cat.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Precio Máximo */}
          <div className="mb-8 border-t border-gray-100 dark:border-gray-800 pt-6">
            <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200 uppercase text-sm tracking-wider">Precio Máximo</h3>
            <div className="flex flex-col gap-2">
              <input 
                type="range" 
                min="0" 
                max="20000" 
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-pink-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$0</span>
                <span className="font-bold text-pink-600 dark:text-pink-400">{formatPrice(maxPrice.toString())}</span>
              </div>
            </div>
          </div>

          {/* Disponibilidad */}
          <div className="mb-8 border-t border-gray-100 dark:border-gray-800 pt-6">
            <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200 uppercase text-sm tracking-wider">Disponibilidad</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${onlyInStock ? 'bg-pink-600 border-pink-600' : 'border-gray-300 dark:border-gray-600 group-hover:border-pink-400'}`}>
                  {onlyInStock && <Check size={14} className="text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)} />
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-pink-600 transition-colors">Solo en stock</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${onlyOnSale ? 'bg-pink-600 border-pink-600' : 'border-gray-300 dark:border-gray-600 group-hover:border-pink-400'}`}>
                  {onlyOnSale && <Check size={14} className="text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={onlyOnSale} onChange={(e) => setOnlyOnSale(e.target.checked)} />
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-pink-600 transition-colors">En oferta</span>
              </label>
            </div>
          </div>

          {/* Atributos Dinámicos (Color, Volumen, etc) */}
          {allAttributes.map(attr => (
            <div key={attr.name} className="mb-8 border-t border-gray-100 dark:border-gray-800 pt-6">
              <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200 uppercase text-sm tracking-wider">{attr.name}</h3>
              <div className="flex flex-wrap gap-2">
                {attr.options.map(opt => {
                  const isSelected = selectedAttributes[attr.name]?.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleAttribute(attr.name, opt)}
                      className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${isSelected ? 'bg-pink-100 border-pink-600 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 font-medium' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-pink-400 hover:text-pink-600'}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </aside>

      {/* Grilla de Productos */}
      <div className="w-full lg:w-3/4">
        <div className="mb-6 flex justify-between items-center text-sm text-gray-500 border-b border-gray-200 dark:border-gray-800 pb-4">
          <span>Mostrando <strong>{filteredProducts.length}</strong> productos</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800 flex flex-col items-center">
            <Filter size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4 font-medium">No encontramos productos con esos filtros.</p>
            <button 
              onClick={() => {
                setSelectedCategory(null);
                setOnlyInStock(false);
                setOnlyOnSale(false);
                setMaxPrice(20000);
                setSelectedAttributes({});
              }}
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-bold hover:bg-pink-600 dark:hover:bg-pink-500 hover:text-white transition-colors"
            >
              Borrar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 transition-all hover:-translate-y-2 group flex flex-col relative h-full">
                
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.on_sale && (
                    <span className="bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      ¡OFERTA!
                    </span>
                  )}
                  {product.stock_status === 'outofstock' && (
                    <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      SIN STOCK
                    </span>
                  )}
                </div>

                <div className="relative h-64 w-full bg-gray-100 dark:bg-black/50 overflow-hidden">
                  {product.images.length > 0 && (
                    <Image 
                      src={product.images[0].src} 
                      alt={product.images[0].alt} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link href={`/productos/${product.slug}`} className="bg-white text-black hover:bg-pink-500 hover:text-white rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-xl">
                      <ShoppingBag size={24} />
                    </Link>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs text-pink-600 dark:text-pink-500 font-bold tracking-wider uppercase mb-2">
                    {product.categories.length > 0 ? product.categories[0].name : "General"}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">
                    <Link href={`/productos/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-400 mb-3 text-sm">
                    <Star size={16} className="fill-current" />
                    <span className="text-gray-600 dark:text-gray-400 ml-1">{product.average_rating} ({product.rating_count})</span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow" dangerouslySetInnerHTML={{ __html: product.short_description }}></div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col">
                      {product.on_sale && product.regular_price ? (
                        <>
                          <span className="text-xs text-gray-400 line-through">{formatPrice(product.regular_price)}</span>
                          <span className="text-xl font-bold text-pink-600 dark:text-pink-400">{formatPrice(product.price)}</span>
                        </>
                      ) : (
                        <span className="text-xl font-bold">{formatPrice(product.price)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
