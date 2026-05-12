import { getCourses } from "@/services/mockData";
import Image from "next/image";
import { Clock, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Cursos de Estética | Juli Cosmética",
  description: "Fórmate con los mejores profesionales en estética y belleza.",
};

export default async function CursosPage() {
  const courses = await getCourses();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Cursos y Formación</h1>
        <div className="h-1 w-24 bg-pink-600 rounded-full shadow-[0_0_10px_rgba(255,20,147,0.5)] mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
          Lleva tu pasión al siguiente nivel. Aprende de expertos y obtén tu certificación con nuestros cursos intensivos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-2 flex flex-col md:flex-row group">
            <div className="relative h-64 md:h-auto md:w-2/5 bg-gray-100 dark:bg-black/50 overflow-hidden shrink-0">
              <Image 
                src={course.imageUrl} 
                alt={course.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
            </div>
            
            <div className="p-8 flex flex-col flex-grow relative">
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                <span className="flex items-center gap-1"><Clock size={14} className="text-pink-500" /> {course.duration}</span>
                <span className="flex items-center gap-1"><GraduationCap size={14} className="text-pink-500" /> {course.level}</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-pink-600 dark:text-pink-500">{course.price}</span>
                <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-pink-600 dark:hover:bg-pink-500 hover:text-white transition-colors shadow-md">
                  Inscribirse
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
