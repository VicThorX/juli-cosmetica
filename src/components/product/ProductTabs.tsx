"use client";

import { useState } from "react";
import { WcProduct } from "@/services/mockData";
import { Star } from "lucide-react";

export default function ProductTabs({ product }: { product: WcProduct }) {
  const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'reviews'>('description');

  return (
    <div className="mb-20">
      {/* Tab Headers */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-b border-gray-200 dark:border-gray-800 mb-8">
        <button 
          onClick={() => setActiveTab('description')}
          className={`text-lg sm:text-xl font-bold pb-4 border-b-2 transition-colors ${activeTab === 'description' ? 'border-pink-600 text-pink-600 dark:text-pink-500' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
        >
          Descripción
        </button>
        <button 
          onClick={() => setActiveTab('additional')}
          className={`text-lg sm:text-xl font-bold pb-4 border-b-2 transition-colors ${activeTab === 'additional' ? 'border-pink-600 text-pink-600 dark:text-pink-500' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
        >
          Información Adicional
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`text-lg sm:text-xl font-bold pb-4 border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-pink-600 text-pink-600 dark:text-pink-500' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
        >
          Reseñas ({product.reviews?.length || 0})
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === 'description' && (
          <div className="prose prose-lg dark:prose-invert max-w-4xl text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: product.description }} />
        )}

        {activeTab === 'additional' && (
          <div className="max-w-4xl">
            {product.attributes.length > 0 ? (
              <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {product.attributes.map((attr, index) => (
                      <tr key={attr.id} className={index !== product.attributes.length - 1 ? "border-b border-gray-200 dark:border-gray-800" : ""}>
                        <th className="py-4 px-6 bg-gray-100 dark:bg-black/20 font-semibold text-gray-800 dark:text-gray-200 w-1/3">
                          {attr.name}
                        </th>
                        <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                          {attr.options.join(', ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No hay información adicional para este producto.</p>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-4xl">
            {(!product.reviews || product.reviews.length === 0) ? (
              <p className="text-gray-500">Aún no hay reseñas para este producto. ¡Sé el primero en opinar!</p>
            ) : (
              <div className="space-y-8">
                {product.reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-100 dark:border-gray-800 pb-8 last:border-0">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center font-bold text-lg">
                        {review.reviewer.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{review.reviewer}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400">
                            {[1,2,3,4,5].map(star => (
                              <Star key={star} size={14} className={star <= review.rating ? "fill-current" : "text-gray-300 dark:text-gray-700"} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">{new Date(review.date_created).toLocaleDateString('es-AR')}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-4 italic">"{review.review}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
