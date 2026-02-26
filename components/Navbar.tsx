'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🌾</span>
            <span className="text-2xl font-bold gradient-text">Krishi Mitra</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/crop-doctor" 
              className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
            >
              🩺 Crop Doctor
            </Link>
            <Link 
              href="/advisory" 
              className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
            >
              💡 Advisory
            </Link>
            <Link 
              href="/crop-doctor" 
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/crop-doctor"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              🩺 Crop Doctor
            </Link>
            <Link
              href="/advisory"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              💡 Advisory
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
