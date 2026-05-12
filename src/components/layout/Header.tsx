"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ShoppingBag, Moon, Sun, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "../cart/CartDrawer";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems, openDrawer } = useCartStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-md border-b border-pink-500/20"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Logo_July_Cosmetica_Transparante.png"
            alt="Juli Cosmética Logo"
            width={180}
            height={60}
            className="object-contain h-14 w-auto"
            priority
          />
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center space-x-8 font-medium">
          <Link href="/" className="hover:text-pink-500 transition-colors">
            Inicio
          </Link>
          <Link href="/productos" className="hover:text-pink-500 transition-colors">
            Productos
          </Link>
          <Link href="/blog" className="hover:text-pink-500 transition-colors">
            Novedades
          </Link>
          <Link href="/cursos" className="hover:text-pink-500 transition-colors">
            Cursos
          </Link>
          <Link href="/contacto" className="hover:text-pink-500 transition-colors">
            Contacto
          </Link>
        </nav>

        {/* Acciones */}
        <div className="flex items-center space-x-5">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} />
            )}
          </button>

          <button onClick={openDrawer} className="relative p-2 group" aria-label="Carrito">
            <ShoppingBag
              size={22}
              className="group-hover:text-pink-500 transition-colors"
            />
            {getTotalItems() > 0 && (
              <span className="absolute top-0 right-0 bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(255,20,147,0.5)]">
                {getTotalItems()}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2">
            <Menu size={24} />
          </button>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
}
