import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Finalizar Compra | Juli Cosmética",
  description: "Completa tus datos para finalizar tu compra.",
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Finalizar Compra</h1>
        <div className="h-1 w-24 bg-pink-600 rounded-full mx-auto"></div>
      </div>
      
      <CheckoutForm />
    </div>
  );
}
