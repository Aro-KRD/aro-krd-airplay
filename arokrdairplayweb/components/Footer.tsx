import React from "react";
import Image from "next/image";
import { Github, Download, Heart, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white/10 p-1 border border-white/20">
                <Image
                  src="/logo-tile.png"
                  alt="AirBridge Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                AirBridge
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Native Apple AirPlay 2 screen receiver for Windows and Arch Linux.
              Hardware-accelerated, ultra-low latency, and zero iOS setup.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              <span>Released under the MIT License • Built by Aro-KRD</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#preview" className="hover:text-white transition-colors">
                  App Interface
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#arch" className="hover:text-white transition-colors">
                  Arch Linux Setup
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Downloads & Source */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Releases & Source
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/downloads/AirBridge.exe"
                  download="AirBridge.exe"
                  className="text-brand-400 hover:text-brand-300 font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download AirBridge.exe</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Aro-KRD/aro-krd-airplay/releases/download/arokrd/AirBridge-setup-1.0.0.exe"
                  className="hover:text-white transition-colors"
                >
                  Windows Setup Installer
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Aro-KRD/aro-krd-airplay/releases/download/arokrd/AirBridge-1.0.0.zip"
                  className="hover:text-white transition-colors"
                >
                  Portable ZIP Package
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Aro-KRD/aro-krd-airplay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} AirBridge (Aro-KRD). Free & Open Source.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed with white & blue aesthetic for Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

