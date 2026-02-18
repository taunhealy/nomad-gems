import type { Metadata } from "next";
import { Outfit, Abhaya_Libre } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const abhayaLibre = Abhaya_Libre({
  variable: "--font-serif",
  weight: ["500", "800"], // Medium and ExtraBold
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
        className={`${outfit.variable} ${abhayaLibre.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
