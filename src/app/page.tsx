import { getProducts, getCategories, formatPrice, getCourses } from "@/services/mockData";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Star, ShoppingBag, ArrowRight } from "lucide-react";

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();
  const courses = await getCourses();
  
  // Filter for featured products to show on home
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Massive Centered */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-massive.png" 
            alt="Hero Background" 
            fill 
            className="object-cover"
            priority
          />
          {/* Dark Overlays for text readability and blending */}
          <div className="absolute inset-0 bg-black/60 dark:bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0f0f0f] via-transparent to-transparent opacity-100" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 border border-white/10 text-gray-200 text-sm mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            Dedicación y belleza profesional
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-6 text-white tracking-tight">
            Bienvenido a <br className="hidden sm:block" />
            <span className="font-script text-pink-500 [text-shadow:_0_0_30px_rgba(255,20,147,0.6)]">Juli Cosmética</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 mb-10 font-light max-w-3xl leading-relaxed">
            Brindamos soluciones integrales de estética y belleza. Descubre nuestros productos de alta calidad y fórmate con los mejores profesionales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="https://wa.me/5491124642829" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:-translate-y-1">
              <MessageCircle size={22} />
              Escribinos por WhatsApp
            </a>
            <Link href="/productos" className="inline-flex justify-center items-center bg-[#1a1a1a]/80 hover:bg-[#2a2a2a] border border-gray-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:-translate-y-1 backdrop-blur-md">
              Ver Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-16 flex flex-col items-center gap-24">
        
        {/* Categories Section */}
        <section className="w-full">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras Categorías</h2>
            <div className="h-1 w-24 bg-pink-600 rounded-full shadow-[0_0_10px_rgba(255,20,147,0.5)]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link href={`/categoria/${cat.slug}`} key={cat.id} className="group relative h-64 rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
                {cat.image && (
                  <Image 
                    src={cat.image.src} 
                    alt={cat.image.alt} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-wide [text-shadow:_0_2px_10px_rgba(0,0,0,0.5)]">{cat.name}</h3>
                  <span className="inline-block bg-white/20 backdrop-blur-md text-white text-sm px-4 py-1.5 rounded-full border border-white/30 transition-transform group-hover:scale-105">
                    {cat.count} productos
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products (WooCommerce Mock Data) */}
        <section className="w-full">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Productos Destacados</h2>
            <div className="h-1 w-24 bg-pink-600 rounded-full shadow-[0_0_10px_rgba(255,20,147,0.5)]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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

                <Link href={`/productos/${product.slug}`} className="relative h-64 w-full bg-gray-100 dark:bg-black/50 overflow-hidden block">
                  {product.images.length > 0 && (
                    <Image 
                      src={product.images[0].src} 
                      alt={product.images[0].alt} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-pink-600 dark:text-pink-500 font-bold tracking-wider uppercase mb-2">
                    {product.categories.length > 0 ? product.categories[0].name : "General"}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1 group-hover:text-pink-600 transition-colors">
                    <Link href={`/productos/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  
                  <div className="flex items-center gap-1 text-yellow-400 mb-4 text-sm">
                    <Star size={16} className="fill-current" />
                    <span className="text-gray-600 dark:text-gray-400 ml-1">{product.average_rating} ({product.rating_count})</span>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
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
          <div className="mt-12 flex justify-center">
            <Link href="/productos" className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-500 font-medium hover:underline underline-offset-4 group">
              Ver todo el catálogo 
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Academia Section (Courses) */}
        <section className="w-full">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Academia</h2>
            <div className="h-1 w-24 bg-pink-600 rounded-full shadow-[0_0_10px_rgba(255,20,147,0.5)]"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-center max-w-2xl">
              Fórmate con los mejores profesionales. Cursos diseñados para llevar tus habilidades al siguiente nivel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col group hover:-translate-y-2 transition-all duration-300">
                <Link href={`/cursos/${course.slug}`} className="relative h-56 w-full block overflow-hidden">
                  <Image 
                    src={course.imageUrl} 
                    alt={course.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {course.level}
                    </span>
                  </div>
                </Link>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-pink-600 transition-colors">
                    <Link href={`/cursos/${course.slug}`}>{course.title}</Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-col gap-2 mb-8 text-sm text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                      Duración: {course.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                      {course.modality}
                    </div>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6">
                    <span className="text-xl font-bold text-pink-600 dark:text-pink-500">{formatPrice(course.price)}</span>
                    <Link href={`/cursos/${course.slug}`} className="text-sm font-bold bg-gray-100 dark:bg-gray-800 hover:bg-pink-600 hover:text-white transition-colors px-4 py-2 rounded-full">
                      Ver Temario
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link href="/cursos" className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-500 font-medium hover:underline underline-offset-4 group">
              Ver todos los cursos
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Nosotros Section */}
        <section className="w-full bg-gray-50 dark:bg-[#121212] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800/50 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-16 flex flex-col justify-center z-10">
              <div className="text-xs text-pink-600 dark:text-pink-500 font-bold tracking-wider uppercase mb-3">
                Nuestra Historia
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">La pasión detrás de <br/><span className="font-script text-pink-600 dark:text-pink-500">Juli Cosmética</span></h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                Nacimos con la visión de acercar productos de belleza de grado profesional a todos los apasionados por el cuidado personal. Desde nuestros inicios, nos hemos enfocado en la calidad, la innovación y el diseño elegante.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                No solo somos una tienda; somos un espacio de aprendizaje. Nuestros cursos de estética están diseñados para formar a la próxima generación de profesionales de la belleza con las mejores herramientas del mercado.
              </p>
              <div>
                <Link href="/contacto" className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                  Contáctanos
                </Link>
              </div>
            </div>
            <div className="relative h-64 lg:h-auto min-h-[400px]">
              <Image 
                src="/images/product-tools.png" 
                alt="Profesionalismo" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 dark:from-[#121212] to-transparent w-32 hidden lg:block z-0"></div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
