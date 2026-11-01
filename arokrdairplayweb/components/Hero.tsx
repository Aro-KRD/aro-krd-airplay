"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Download,
  ShieldCheck,
  Zap,
  Cast,
  Tv,
  CheckCircle2,
  ChevronDown,
  Terminal,
  Monitor,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function Hero() {
  const [downloadDropdown, setDownloadDropdown] = useState(false);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Decorative ambient blue gradients in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] -z-10 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-400/15 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-[420px] h-[420px] bg-brand-500/15 rounded-full blur-3xl" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-sky-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 shadow-sm mb-6 animate-pulse-subtle">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-ping" />
            <span className="flex h-2 w-2 rounded-full bg-brand-500 -ml-4" />
            <span className="text-xs font-semibold text-brand-700 tracking-wide uppercase">
              AirBridge v1.0.0 Now Live
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-600">
              Native AirPlay 2 Protocol
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.12]">
            Turn your PC into an{" "}
            <span className="blue-gradient-text inline-block">
              Apple TV AirPlay
            </span>{" "}
            Receiver
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Mirror your iPhone or iPad screen to Windows 10/11 or Arch Linux in
            crisp <span className="font-semibold text-navy-900">1440p / 1080p @ 60 FPS</span> with
            zero perceptible latency. No apps on iOS, no cables, completely private on your local Wi-Fi.
          </p>

          {/* Download CTA Group */}
          <div
            id="download"
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20"
          >
            {/* Primary Download Button with Dropdown */}
            <div className="relative w-full sm:w-auto">
              <div className="flex items-center rounded-2xl shadow-xl shadow-brand-500/25 bg-gradient-to-r from-brand-600 via-brand-500 to-sky-500 p-0.5 hover:shadow-brand-500/40 transition-all">
                <a
                  href="/downloads/AirBridge.exe"
                  download="AirBridge.exe"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-7 py-4 text-base font-bold text-white rounded-l-2xl hover:bg-white/10 transition-colors"
                >
                  <Download className="w-5 h-5 text-white animate-bounce" />
                  <span>Download AirBridge (.exe)</span>
                </a>
                <button
                  onClick={() => setDownloadDropdown(!downloadDropdown)}
                  className="px-3.5 py-4 border-l border-white/25 text-white hover:bg-white/10 rounded-r-2xl transition-colors"
                  aria-label="Download options"
                  title="More download options"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Download options dropdown */}
              {downloadDropdown && (
                <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-80 glass-panel rounded-2xl shadow-2xl p-2 border border-brand-200 z-50 text-left">
                  <div className="p-2 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Select Windows Package
                    </span>
                  </div>

                  <a
                    href="https://github.com/Aro-KRD/aro-krd-airplay/releases/download/arokrd/AirBridge.exe"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-50/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-brand-100 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-navy-900">
                        AirBridge.exe (Standalone)
                      </div>
                      <div className="text-xs text-slate-500">
                        Zero install • Direct portable executable (133 KB)
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/Aro-KRD/aro-krd-airplay/releases/download/arokrd/AirBridge-setup-1.0.0.exe"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-50/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-sky-100 text-sky-600 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-navy-900">
                        AirBridge-setup-1.0.0.exe
                      </div>
                      <div className="text-xs text-slate-500">
                        Setup Wizard • Desktop shortcut & firewall rules (2.3 MB)
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/Aro-KRD/aro-krd-airplay/releases/download/arokrd/AirBridge-1.0.0.zip"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-50/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-navy-900">
                        AirBridge-1.0.0.zip
                      </div>
                      <div className="text-xs text-slate-500">
                        Portable full bundle with CLI and diagnostics (841 KB)
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Secondary Option: Arch Linux */}
            <a
              href="#arch"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200/90 rounded-2xl hover:bg-slate-50 hover:text-brand-600 shadow-sm transition-all"
            >
              <Terminal className="w-5 h-5 text-brand-600" />
              <span>Arch Linux Port</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left sm:text-center">
            <div className="flex items-center sm:justify-center gap-2 text-xs font-medium text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>Windows 11 & 10 Tested</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2 text-xs font-medium text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>60 FPS D3D11 / WASAPI</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2 text-xs font-medium text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>No iOS App Needed</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2 text-xs font-medium text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>100% Free & Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
