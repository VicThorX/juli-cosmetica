import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col">
            <Link href="/" className="mb-6 flex items-center">
              <Image
                src="/images/Logo_July_Cosmetica_Transparante.png"
                alt="Juli Cosmética Logo"
                width={150}
                height={50}
                className="object-contain h-12 w-auto filter grayscale dark:grayscale-0 dark:brightness-100"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              Tu destino definitivo para productos de belleza profesional, herramientas de alta gama y formación estética de primer nivel.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 transition-colors text-sm font-medium">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 transition-colors text-sm font-medium">
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/productos" className="hover:text-pink-600 dark:hover:text-pink-500 transition-colors">
                  Tienda de Productos
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="hover:text-pink-600 dark:hover:text-pink-500 transition-colors">
                  Cursos Profesionales
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-pink-600 dark:hover:text-pink-500 transition-colors">
                  Contacto y Soporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-pink-600 dark:text-pink-500 shrink-0 mt-0.5" />
                <span>Av. Corrientes 1234, Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-pink-600 dark:text-pink-500 shrink-0" />
                <span>+54 11 2464-2829</span>
              </li>
            </ul>
          </div>

          {/* Google Maps Location */}
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden relative border border-gray-300 dark:border-gray-700 shadow-inner">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.44367080515!2d-58.50333835!3d-34.61566245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20CABA!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Juli Cosmética"
            ></iframe>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} Juli Cosmética. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
