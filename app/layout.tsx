import type { Metadata } from "next";
import { Schibsted_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Taptide | Crafted by the Coast",
  description: "Experience the perfect pour at Taptide Pub. Cold, crisp, and captured in amber.",
  keywords: ["pub", "beer", "coastal", "craft beer", "restaurant", "bar"],
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
        className={`${schibsted.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
