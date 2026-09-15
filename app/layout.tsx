import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AUREUS - Ultra-Luxury Concierge",
  description: "B2B Procurement for Boutique Villas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden w-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={`${inter.className} antialiased overflow-x-hidden w-full max-w-full bg-[#0A0A0A] text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}