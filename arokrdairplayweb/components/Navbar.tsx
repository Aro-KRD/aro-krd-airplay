"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, Github, Menu, X, ExternalLink, Sparkles } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-brand-50 p-1.5 shadow-sm border border-brand-200 group-hover:border-brand-400 transition-colors">
              <Image
                src="/logo-tile.png"
                alt="AirBridge Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-navy-900 group-hover:text-brand-600 transition-colors">
                AirBridge
              </span>
              <span className="text-[11px] font-medium text-brand-600 tracking-wider uppercase -mt-1">
                AirPlay for PC
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#preview"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              App Interface
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#arch"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Arch Linux
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://github.com/Aro-KRD/aro-krd-airplay"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-brand-600 shadow-sm transition-all"
            >
              <Github className="w-4 h-4 text-slate-600" />
              <span>GitHub</span>
            </a>

            <a
              href="#download"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl hover:from-brand-700 hover:to-brand-600 shadow-md shadow-brand-500/20 hover:shadow-brand-500/35 transition-all transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>Download .exe</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-brand-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-brand-100 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 rounded-lg"
          >
            Features
          </a>
          <a
            href="#preview"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 rounded-lg"
          >
            App Interface
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 rounded-lg"
          >
            How It Works
          </a>
          <a
            href="#arch"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 rounded-lg"
          >
            Arch Linux
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 rounded-lg"
          >
            FAQ
          </a>
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-brand-600 rounded-xl shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download AirBridge .exe</span>
            </a>
            <a
              href="https://github.com/Aro-KRD/aro-krd-airplay"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
