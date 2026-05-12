import { getProducts, getCategories } from "@/services/mockData";
import CatalogClient from "./CatalogClient";

export const metadata = {
  title: "Catálogo de Productos | Juli Cosmética",
  description: "Explora nuestra amplia gama de productos de belleza y herramientas profesionales.",
};

export default async function ProductosPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestro Catálogo</h1>
        <div className="h-1 w-24 bg-pink-600 rounded-full shadow-[0_0_10px_rgba(255,20,147,0.5)] mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
          Productos seleccionados por profesionales para ofrecerte los mejores resultados en tu día a día o en tu salón.
        </p>
      </div>

      {/* Render the Client Component with initial data for dynamic filtering */}
      <CatalogClient initialProducts={products} categories={categories} />
    </div>
  );
}
