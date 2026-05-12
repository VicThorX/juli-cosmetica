import type { Metadata } from "next";
import { Geist, Dancing_Script } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MessageCircle } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juli Cosmética | Belleza Profesional",
  description: "Venta de cosméticos, herramientas y cursos de estética profesional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${script.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors duration-300 flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            
            {/* Floating WhatsApp Button */}
            <a 
              href="https://wa.me/5491124642829" 
              target="_blank" 
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:bg-[#1EBE5D] hover:scale-110 transition-all duration-300"
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle size={28} />
            </a>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
