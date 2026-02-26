import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krishi Mitra - Your AI Farming Companion",
  description: "AI-powered crop disease detection and smart farming advisory for Indian farmers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 gradient-text">Krishi Mitra</h3>
                <p className="text-slate-300">Your AI companion for smarter farming</p>
                <p className="text-slate-400 mt-2 text-sm">कृषि मित्र - आपका AI खेती साथी</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Features</h4>
                <ul className="space-y-2 text-slate-300">
                  <li>🩺 AI Crop Doctor</li>
                  <li>💡 Smart Advisory</li>
                  <li>🌾 Traditional Knowledge</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <p className="text-slate-300">Helping farmers across India</p>
                <p className="text-slate-400 mt-4 text-sm">© 2024 Krishi Mitra. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
