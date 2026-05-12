import { getCourseBySlug, formatPrice } from "@/services/mockData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, User, CheckCircle, Award } from "lucide-react";
import CourseActions from "@/components/course/CourseActions";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  
  if (!course) return { title: 'Curso no encontrado' };
  
  return {
    title: `${course.title} | Academia Juli Cosmética`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  
  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Link href="/cursos" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 hover:underline mb-8 font-medium">
        <ArrowLeft size={18} />
        Volver a la Academia
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
        
        {/* Left Column: Course Info */}
        <div className="w-full lg:w-2/3">
          <div className="mb-8">
            <span className="inline-block bg-black dark:bg-white text-white dark:text-black font-bold text-sm px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Nivel: {course.level}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-gray-50 dark:bg-[#1a1a1a] rounded-3xl border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col items-center text-center p-4">
              <Clock size={28} className="text-pink-600 mb-3" />
              <span className="text-sm text-gray-500 mb-1">Duración</span>
              <span className="font-bold">{course.duration}</span>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <BookOpen size={28} className="text-pink-600 mb-3" />
              <span className="text-sm text-gray-500 mb-1">Modalidad</span>
              <span className="font-bold">{course.modality.split(' ')[0]}</span>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <User size={28} className="text-pink-600 mb-3" />
              <span className="text-sm text-gray-500 mb-1">Instructor</span>
              <span className="font-bold">{course.instructor}</span>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Award size={28} className="text-pink-600 mb-3" />
              <span className="text-sm text-gray-500 mb-1">Certificado</span>
              <span className="font-bold">Incluido</span>
            </div>
          </div>

          {/* Syllabus (Temario) */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Temario del Curso</h2>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
              {course.syllabus.map((topic, index) => (
                <div key={index} className={`p-6 flex items-start gap-4 ${index !== course.syllabus.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
                  <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200 pt-1">
                    {topic}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Enrollment Box */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-28 bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
            <div className="relative h-64 w-full">
              <Image 
                src={course.imageUrl} 
                alt={course.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
            
            <div className="p-8">
              <div className="text-center mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
                <span className="text-gray-500 font-medium uppercase tracking-wider text-sm block mb-2">Precio de Inscripción</span>
                <span className="text-5xl font-bold text-pink-600 dark:text-pink-500">
                  {formatPrice(course.price)}
                </span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  Acceso a los materiales de estudio
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  Soporte directo con el instructor
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  Certificado de finalización
                </li>
                {course.modality.includes('Presencial') && (
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    Prácticas con modelos reales
                  </li>
                )}
              </ul>

              <CourseActions course={course} />
              
              <p className="text-center text-sm text-gray-400 mt-4">
                Garantía de satisfacción de 7 días.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
