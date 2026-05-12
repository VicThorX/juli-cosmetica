"use client";

import { Course } from "@/services/mockData";
import { useCartStore } from "@/store/cartStore";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function CourseActions({ course }: { course: Course }) {
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);

  const handleEnroll = () => {
    // Create a fake WcProduct adapter from the Course
    const fakeProduct = {
      id: parseInt(course.id.replace('course_', '1000')), // Generate a unique ID for courses
      name: course.title,
      slug: course.slug,
      type: "simple" as const,
      status: "publish" as const,
      featured: false,
      description: course.description,
      short_description: course.description,
      price: course.price,
      regular_price: course.price,
      sale_price: "",
      on_sale: false,
      stock_status: "instock" as const,
      stock_quantity: 999, // Unlimited for courses
      images: [
        { id: Math.random(), src: course.imageUrl, name: course.slug, alt: course.title }
      ],
      categories: [{ id: 999, name: "Cursos", slug: "cursos" }],
      attributes: [
        { id: 1, name: "Modalidad", options: [course.modality] },
        { id: 2, name: "Nivel", options: [course.level] }
      ],
      average_rating: "5.0",
      rating_count: 0,
      related_ids: []
    };

    // Add to cart with course-specific attributes selected
    addItem(fakeProduct, 1, { "Modalidad": course.modality, "Nivel": course.level });
    setAdded(true);

    // Open the drawer
    useCartStore.getState().openDrawer();

    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleEnroll}
      className="w-full bg-pink-600 text-white font-bold text-xl py-5 rounded-full hover:bg-pink-700 transition-all shadow-xl hover:shadow-pink-600/30 flex items-center justify-center gap-2 group"
    >
      {added ? (
        <>
          <CheckCircle2 size={24} className="animate-in zoom-in" />
          ¡Agregado al Carrito!
        </>
      ) : (
        <>
          <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
          Inscribirse Ahora
        </>
      )}
    </button>
  );
}
