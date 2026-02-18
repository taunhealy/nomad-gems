"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white flex items-center justify-between px-[90px] h-[80px] w-full fixed top-0 z-50 border-b border-black/5">
      {/* Logo */}
      <div className="flex items-center h-full p-[10px]">
        <Link href="/" className="font-serif font-bold text-[24px] text-black leading-none text-center">
          Nomad Gems
        </Link>
      </div>

      {/* Links */}
      <div className="flex items-center h-full gap-[30px] justify-end">
        {[
          { name: "About", href: "#about" },
          { name: "Gems", href: "#gems" },
          { name: "Contact", href: "#contact" }
        ].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector(item.href);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="flex items-center justify-center font-sans text-[16px] uppercase tracking-widest text-black/60 hover:text-black transition-colors duration-300 cursor-pointer"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
