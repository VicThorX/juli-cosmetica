"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/services/mockData";
import { CreditCard, Truck, Store, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, getTotalPrice, closeDrawer, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [shippingMethod, setShippingMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'mercadopago' | 'cash'>('transfer');

  useEffect(() => {
    setMounted(true);
    closeDrawer(); // Ensure drawer is closed when entering checkout
  }, [closeDrawer]);

  if (!mounted) return null;

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle size={64} className="text-gray-300 dark:text-gray-700 mb-6" />
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-8">No puedes proceder al checkout sin productos.</p>
        <button onClick={() => router.push('/productos')} className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-700 transition-colors">
          Volver a la tienda
        </button>
      </div>
    );
  }

  const shippingCost = shippingMethod === 'delivery' ? 4500 : 0;
  const finalTotal = getTotalPrice() + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call and redirect
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Left Column: Forms */}
      <div className="w-full lg:w-3/5">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Section 1: Contacto */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm">1</span>
              Datos de Contacto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Correo Electrónico *</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] focus:ring-2 focus:ring-pink-500 outline-none transition-all" placeholder="tucorreo@ejemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Nombre *</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Apellido *</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Teléfono / WhatsApp *</label>
                <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">DNI / CUIT *</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
              </div>
            </div>
          </section>

          {/* Section 2: Envío */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm">2</span>
              Método de Entrega
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <label className={`cursor-pointer flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${shippingMethod === 'delivery' ? 'border-pink-600 bg-pink-50 dark:bg-pink-900/10' : 'border-gray-200 dark:border-gray-800 hover:border-pink-300'}`}>
                <div className="pt-1"><input type="radio" name="shipping" value="delivery" checked={shippingMethod === 'delivery'} onChange={() => setShippingMethod('delivery')} className="accent-pink-600" /></div>
                <div>
                  <div className="flex items-center gap-2 font-bold mb-1"><Truck size={18} /> Envío a domicilio</div>
                  <p className="text-sm text-gray-500">Recibe tu pedido en 3 a 5 días hábiles.</p>
                  <p className="text-sm font-bold mt-1 text-pink-600">{formatPrice("4500")}</p>
                </div>
              </label>

              <label className={`cursor-pointer flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${shippingMethod === 'pickup' ? 'border-pink-600 bg-pink-50 dark:bg-pink-900/10' : 'border-gray-200 dark:border-gray-800 hover:border-pink-300'}`}>
                <div className="pt-1"><input type="radio" name="shipping" value="pickup" checked={shippingMethod === 'pickup'} onChange={() => setShippingMethod('pickup')} className="accent-pink-600" /></div>
                <div>
                  <div className="flex items-center gap-2 font-bold mb-1"><Store size={18} /> Retiro en local</div>
                  <p className="text-sm text-gray-500">Av. Corrientes 1234, CABA.</p>
                  <p className="text-sm font-bold mt-1 text-green-600">Gratis</p>
                </div>
              </label>
            </div>

            {shippingMethod === 'delivery' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Dirección completa *</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] focus:ring-2 focus:ring-pink-500 outline-none transition-all" placeholder="Calle, número, piso, depto..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Ciudad *</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Código Postal *</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
                </div>
              </div>
            )}
          </section>

          {/* Section 3: Pago */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm">3</span>
              Método de Pago
            </h2>
            
            <div className="space-y-4">
              <label className={`cursor-pointer flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'transfer' ? 'border-pink-600 bg-pink-50 dark:bg-pink-900/10' : 'border-gray-200 dark:border-gray-800 hover:border-pink-300'}`}>
                <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="accent-pink-600" />
                <div className="flex-1 font-bold">Transferencia Bancaria (10% OFF)</div>
                <CreditCard className="text-gray-400" />
              </label>

              <label className={`cursor-pointer flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'mercadopago' ? 'border-pink-600 bg-[#009EE3]/10' : 'border-gray-200 dark:border-gray-800 hover:border-[#009EE3]/50'}`}>
                <input type="radio" name="payment" value="mercadopago" checked={paymentMethod === 'mercadopago'} onChange={() => setPaymentMethod('mercadopago')} className="accent-[#009EE3]" />
                <div className="flex-1 font-bold text-[#009EE3]">MercadoPago</div>
                <span className="text-xs bg-[#009EE3] text-white px-2 py-1 rounded">Cuotas sin interés</span>
              </label>

              {shippingMethod === 'pickup' && (
                <label className={`cursor-pointer flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'cash' ? 'border-pink-600 bg-pink-50 dark:bg-pink-900/10' : 'border-gray-200 dark:border-gray-800 hover:border-pink-300'}`}>
                  <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="accent-pink-600" />
                  <div className="flex-1 font-bold">Efectivo al retirar</div>
                </label>
              )}
            </div>
          </section>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-pink-600 text-white font-bold text-xl py-5 rounded-2xl shadow-xl hover:bg-pink-700 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Procesando...</span>
            ) : (
              <>
                Confirmar Orden por {formatPrice(paymentMethod === 'transfer' ? (finalTotal * 0.9).toString() : finalTotal.toString())}
                <CheckCircle2 />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div className="w-full lg:w-2/5">
        <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-3xl p-8 sticky top-28 border border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Resumen del Pedido</h3>
          
          <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="relative w-16 h-16 bg-white dark:bg-black rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800">
                  {item.product.images.length > 0 && (
                    <Image src={item.product.images[0].src} alt={item.product.images[0].alt} fill className="object-cover" />
                  )}
                  <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full z-10 shadow-sm">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm line-clamp-2">{item.product.name}</p>
                  {item.selectedAttributes && Object.entries(item.selectedAttributes).map(([k, v]) => (
                    <span key={k} className="text-xs text-gray-500 mr-2">{v}</span>
                  ))}
                </div>
                <div className="font-bold text-sm">
                  {formatPrice(((item.product.on_sale && item.product.sale_price ? parseFloat(item.product.sale_price) : parseFloat(item.product.price)) * item.quantity).toString())}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm border-t border-gray-200 dark:border-gray-800 pt-6">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>{formatPrice(getTotalPrice().toString())}</span>
            </div>
            
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Envío</span>
              <span>{shippingMethod === 'delivery' ? formatPrice(shippingCost.toString()) : 'Gratis'}</span>
            </div>

            {paymentMethod === 'transfer' && (
              <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                <span>Descuento Transferencia (10%)</span>
                <span>-{formatPrice((finalTotal * 0.1).toString())}</span>
              </div>
            )}
            
            <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200 dark:border-gray-800">
              <span>Total</span>
              <span className="text-pink-600">
                {formatPrice(paymentMethod === 'transfer' ? (finalTotal * 0.9).toString() : finalTotal.toString())}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
