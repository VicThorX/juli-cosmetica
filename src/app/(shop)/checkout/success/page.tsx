import Link from "next/link";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";

export const metadata = {
  title: "¡Orden Confirmada! | Juli Cosmética",
};

export default function CheckoutSuccessPage() {
  const orderNumber = `JC-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="container mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white dark:bg-[#1a1a1a] rounded-3xl p-10 md:p-16 text-center border border-gray-100 dark:border-gray-800 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center">
            <CheckCircle2 size={48} />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">¡Gracias por tu compra!</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Tu pedido ha sido procesado exitosamente.
        </p>

        <div className="bg-gray-50 dark:bg-black/50 rounded-2xl p-6 mb-10 flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider font-bold">Número de Orden</p>
          <div className="text-3xl font-mono font-bold text-pink-600 dark:text-pink-500 flex items-center gap-3">
            <Package size={24} className="text-gray-400" />
            {orderNumber}
          </div>
        </div>

        <div className="text-left bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-6 mb-10">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">¿Qué sigue ahora?</h3>
          <ul className="text-blue-700 dark:text-blue-400 text-sm space-y-2 list-disc pl-5">
            <li>Hemos enviado un correo con el resumen de tu pedido.</li>
            <li>Si elegiste Transferencia Bancaria, encontrarás los datos de la cuenta en el correo.</li>
            <li>Te notificaremos cuando tu pedido esté en camino o listo para retirar.</li>
          </ul>
        </div>

        <Link 
          href="/productos"
          className="inline-flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black font-bold px-8 py-4 rounded-full hover:bg-pink-600 dark:hover:bg-pink-500 hover:text-white transition-colors"
        >
          Volver a la tienda
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
