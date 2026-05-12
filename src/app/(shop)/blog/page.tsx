import { getPosts } from "@/services/mockData";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata = {
  title: "Novedades y Blog | Juli Cosmética",
  description: "Últimas noticias, tendencias de belleza y novedades de nuestros cursos.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog y Novedades</h1>
        <div className="h-1 w-24 bg-pink-600 rounded-full mx-auto mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
          Descubre las últimas tendencias, aprende con nuestros expertos y mantente al día con Juli Cosmética.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-2 group flex flex-col h-full">
            <Link href={`/blog/${post.slug}`} className="relative h-60 w-full overflow-hidden block">
              {post.featured_image ? (
                <Image 
                  src={post.featured_image.src} 
                  alt={post.featured_image.alt} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400">Sin imagen</span>
                </div>
              )}
              <div className="absolute top-4 left-4">
                {post.categories.length > 0 && (
                  <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-pink-600 font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                    {post.categories[0].name}
                  </span>
                )}
              </div>
            </Link>

            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar size={14} />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>

              <h2 className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-pink-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Por {post.author}</span>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-pink-600 font-bold hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Leer más <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
