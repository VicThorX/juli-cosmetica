import { getProductBySlug, getProducts, formatPrice } from "@/services/mockData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Truck, ShieldCheck, ChevronRight } from "lucide-react";
import ProductActions from "@/components/product/ProductActions";
import ProductTabs from "@/components/product/ProductTabs";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Producto no encontrado' };
  
  return {
    title: `${product.name} | Juli Cosmética`,
    description: product.short_description.replace(/<[^>]*>?/gm, ''), // Strip HTML
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  // Get related products
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(p => product.related_ids.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="hover:text-pink-600 transition-colors">Inicio</Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <Link href="/productos" className="hover:text-pink-600 transition-colors">Productos</Link>
            </div>
          </li>
          {product.categories.length > 0 && (
            <li>
              <div className="flex items-center">
                <ChevronRight size={16} className="mx-1" />
                <Link href={`/categoria/${product.categories[0].slug}`} className="hover:text-pink-600 transition-colors">
                  {product.categories[0].name}
                </Link>
              </div>
            </li>
          )}
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[200px]">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Product Main Section */}
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative h-[400px] md:h-[600px] w-full bg-gray-100 dark:bg-[#1a1a1a] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800">
            {product.on_sale && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-pink-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                  OFERTA
                </span>
              </div>
            )}
            {product.images.length > 0 ? (
              <Image 
                src={product.images[0].src} 
                alt={product.images[0].alt} 
                fill 
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">Sin imagen</div>
            )}
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button key={idx} className={`relative h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden border-2 ${idx === 0 ? 'border-pink-500' : 'border-transparent hover:border-pink-300'} transition-colors`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Brand/Category */}
          <div className="text-sm text-pink-600 dark:text-pink-500 font-bold tracking-wider uppercase mb-2">
            {product.categories.length > 0 ? product.categories[0].name : "General"}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{product.name}</h1>
          
          {/* Reviews & Stock */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={18} className="fill-current" />
              <Star size={18} className="fill-current" />
              <Star size={18} className="fill-current" />
              <Star size={18} className="fill-current" />
              <Star size={18} className={Number(product.average_rating) > 4.5 ? "fill-current" : "fill-current opacity-50"} />
              <span className="text-gray-600 dark:text-gray-400 ml-2 text-sm font-medium">
                {product.average_rating} ({product.rating_count} reseñas)
              </span>
            </div>
            <div className="w-1 h-4 bg-gray-300 dark:bg-gray-700 rounded hidden sm:block"></div>
            <div className="text-sm font-medium">
              {product.stock_status === 'instock' ? (
                <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400"></span> En stock
                </span>
              ) : (
                <span className="text-red-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> Sin stock
                </span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="mb-8 flex items-end gap-3">
            {product.on_sale && product.regular_price ? (
              <>
                <span className="text-4xl font-bold text-pink-600 dark:text-pink-400">{formatPrice(product.price)}</span>
                <span className="text-xl text-gray-400 line-through mb-1">{formatPrice(product.regular_price)}</span>
              </>
            ) : (
              <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
            )}
          </div>

          {/* Short Description */}
          <div 
            className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed prose dark:prose-invert" 
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />

          {/* Interactive Variations and Add to Cart */}
          <ProductActions product={product} />

          {/* Info blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800">
              <Truck className="text-pink-500" size={24} />
              <div>
                <h4 className="font-bold text-sm">Envíos a todo el país</h4>
                <p className="text-xs text-gray-500">Calcula el costo en el checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800">
              <ShieldCheck className="text-pink-500" size={24} />
              <div>
                <h4 className="font-bold text-sm">Compra Segura</h4>
                <p className="text-xs text-gray-500">Garantía de calidad profesional</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Tabs / Full Description */}
      <ProductTabs product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">También te puede interesar</h2>
            <div className="h-1 w-20 bg-pink-600 rounded-full mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <div key={rp.id} className="bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 transition-all hover:-translate-y-2 group flex flex-col relative h-full">
                {rp.on_sale && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">OFERTA</span>
                  </div>
                )}
                <div className="relative h-56 w-full bg-gray-100 dark:bg-black/50 overflow-hidden">
                  {rp.images.length > 0 && (
                    <Image 
                      src={rp.images[0].src} 
                      alt={rp.images[0].alt} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link href={`/productos/${rp.slug}`} className="bg-white text-black hover:bg-pink-500 hover:text-white rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-xl">
                      <ShoppingBag size={20} />
                    </Link>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-md font-semibold mb-1 group-hover:text-pink-600 transition-colors line-clamp-1">
                    <Link href={`/productos/${rp.slug}`}>{rp.name}</Link>
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-400 mb-2 text-xs">
                    <Star size={12} className="fill-current" />
                    <span className="text-gray-600 dark:text-gray-400 ml-1">{rp.average_rating}</span>
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <span className="font-bold text-pink-600 dark:text-pink-400">{formatPrice(rp.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
