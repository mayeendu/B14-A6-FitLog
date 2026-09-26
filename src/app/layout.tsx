import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FitnessProvider } from "@/context/FitnessContext";
import { Toaster } from "react-hot-toast";

// Default font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Heading font
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Track your fitness, plan your workouts, and stay consistent.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-inter">
        <FitnessProvider>
          <Navbar />

          <main className="flex-1 w-full">{children}</main>

          <Footer />
        </FitnessProvider>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
