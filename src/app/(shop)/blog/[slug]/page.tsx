import { getPostBySlug } from "@/services/mockData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) return { title: 'Artículo no encontrado' };
  
  return {
    title: `${post.title} | Blog de Juli Cosmética`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <Link href="/blog" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 hover:underline mb-8 font-medium">
        <ArrowLeft size={18} />
        Volver a Novedades
      </Link>

      <div className="mb-10 text-center">
        {post.categories.length > 0 && (
          <span className="inline-block bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 font-bold text-sm px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            {post.categories[0].name}
          </span>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <User size={18} />
            <span>{post.author}</span>
          </div>
        </div>
      </div>

      {post.featured_image && (
        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16 shadow-2xl">
          <Image 
            src={post.featured_image.src} 
            alt={post.featured_image.alt} 
            fill 
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none mx-auto prose-headings:font-bold prose-headings:text-black dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-pink-600 hover:prose-a:text-pink-500 prose-strong:text-pink-600 dark:prose-strong:text-pink-400">
        <p className="lead text-2xl text-gray-800 dark:text-gray-200 mb-10 font-medium italic border-l-4 border-pink-600 pl-6">
          {post.excerpt}
        </p>
        
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-800 flex justify-center">
        <Link 
          href="/blog"
          className="bg-black dark:bg-white text-white dark:text-black font-bold px-8 py-4 rounded-full hover:bg-pink-600 dark:hover:bg-pink-500 hover:text-white transition-colors shadow-lg"
        >
          Leer más artículos
        </Link>
      </div>
    </article>
  );
}
