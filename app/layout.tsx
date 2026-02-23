import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nomad Gems",
  description: "Experience work-ready, luxury retreats nestled in nature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${cormorantGaramond.variable} antialiased flex flex-col min-h-screen`}
      >
        <main className="flex-1 w-full relative flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
