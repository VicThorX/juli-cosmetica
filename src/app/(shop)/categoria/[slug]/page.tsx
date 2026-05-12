import { getProducts, getCategories } from "@/services/mockData";
import CatalogClient from "../../productos/CatalogClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find(c => c.slug === slug);
  if (!category) return { title: 'Categoría no encontrada' };
  
  return {
    title: `${category.name} | Juli Cosmética`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find(c => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
        <div className="h-1 w-24 bg-pink-600 rounded-full shadow-[0_0_10px_rgba(255,20,147,0.5)] mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
          {category.description}
        </p>
      </div>

      {/* Render the Client Component with initial data for dynamic filtering, setting the initial category */}
      <CatalogClient initialProducts={products} categories={categories} initialCategorySlug={slug} />
    </div>
  );
}
