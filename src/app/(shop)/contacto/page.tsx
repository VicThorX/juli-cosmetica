import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contacto | Juli Cosmética",
  description: "Ponte en contacto con nosotros para cualquier duda sobre productos o cursos.",
};

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
        <div className="h-1 w-24 bg-pink-600 rounded-full shadow-[0_0_10px_rgba(255,20,147,0.5)] mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
          Estamos aquí para asesorarte. Escríbenos y te responderemos a la brevedad.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 p-8 md:p-12">
        {/* Contact Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-8">Información Directa</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-pink-50 dark:bg-pink-950/30 rounded-full text-pink-600 dark:text-pink-400">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Nuestra Tienda</h3>
                <p className="text-gray-600 dark:text-gray-400">Av. Corrientes 1234<br/>Buenos Aires, Argentina</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-pink-50 dark:bg-pink-950/30 rounded-full text-pink-600 dark:text-pink-400">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Llámanos</h3>
                <p className="text-gray-600 dark:text-gray-400">+54 11 2464-2829<br/>Lunes a Viernes, 9am - 6pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-pink-50 dark:bg-pink-950/30 rounded-full text-pink-600 dark:text-pink-400">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">hola@julicosmetica.com<br/>Soporte 24/7 online</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
            <a 
              href="https://wa.me/5491124642829" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-4 rounded-xl font-bold transition-colors shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={24} />
              Chatear por WhatsApp
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 dark:bg-[#0a0a0a] p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre completo</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
                placeholder="Ej. María Pérez"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
                placeholder="maria@ejemplo.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Asunto</label>
              <select 
                id="subject" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
              >
                <option>Consulta sobre productos</option>
                <option>Información de cursos</option>
                <option>Soporte de un pedido</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mensaje</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow resize-none"
                placeholder="¿En qué podemos ayudarte?"
              ></textarea>
            </div>
            <button 
              type="button" 
              className="w-full bg-pink-600 hover:bg-pink-700 text-white px-6 py-4 rounded-xl font-bold transition-colors shadow-neon mt-2"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
