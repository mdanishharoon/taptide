import localFont from "next/font/local";
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// Custom display font
const houseOfCards = localFont({
  src: "../public/fonts/house-of-cards-bold.ttf",
  variable: "--font-display",
  display: "swap",
});

// Body font
const cormorant = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Taptide | Crafted by the Coast",
  description: "Experience the perfect pour at Taptide Pub. Cold, crisp, and captured in amber.",
  keywords: ["pub", "beer", "coastal", "craft beer", "restaurant", "bar", "sports bar", "manchester"],
  openGraph: {
    title: "Taptide | Crafted by the Coast",
    description: "Experience the perfect pour at Taptide Pub.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${houseOfCards.variable} ${cormorant.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
