import { getCourses, formatPrice } from "@/services/mockData";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Clock, BookOpen, User } from "lucide-react";

export const metadata = {
  title: "Nuestra Academia | Juli Cosmética",
  description: "Fórmate con los mejores profesionales en estética y belleza.",
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section for Courses */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-side.png" 
            alt="Academia Juli Cosmética" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-4xl">
          <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white mb-6">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Nuestra Academia
          </h1>
          <p className="text-xl text-gray-300 font-light leading-relaxed max-w-2xl">
            Desarrolla tus habilidades y convierte tu pasión en tu profesión con nuestros cursos certificados en estética avanzada.
          </p>
        </div>
      </section>

      {/* Courses Catalog */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Cursos Disponibles</h2>
            <div className="h-1 w-24 bg-pink-600 rounded-full"></div>
          </div>
          <p className="text-gray-500 mt-4 md:mt-0 font-medium">{courses.length} cursos encontrados</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row group transition-all duration-300 hover:shadow-2xl">
              
              <div className="relative h-64 sm:h-auto sm:w-2/5 overflow-hidden">
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
              </div>
              
              <div className="p-8 sm:w-3/5 flex flex-col">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-pink-600 transition-colors">
                  <Link href={`/cursos/${course.slug}`}>{course.title}</Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-8 text-sm text-gray-600 dark:text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-pink-600" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-pink-600" />
                    {course.modality}
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <User size={16} className="text-pink-600" />
                    Prof. {course.instructor}
                  </div>
                </div>
                
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6">
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-500">{formatPrice(course.price)}</span>
                  <Link href={`/cursos/${course.slug}`} className="font-bold bg-pink-600 text-white hover:bg-pink-700 transition-colors px-6 py-3 rounded-full shadow-lg hover:shadow-pink-600/30">
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
