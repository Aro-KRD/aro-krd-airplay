"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Cast,
  Tv,
  Wifi,
  Sliders,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Monitor,
  Laptop,
  Maximize2,
  Lock,
} from "lucide-react";

export default function AppPreview() {
  const [activeTab, setActiveTab] = useState<"ui" | "mirror">("ui");

  return (
    <section id="preview" className="py-16 sm:py-24 bg-gradient-to-b from-white via-brand-50/50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Designed for Windows 11 & 10
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Clean, Native Blue & White Interface
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Engineered with a minimalist Apple-inspired control dashboard. Tune resolution,
            latency modes, frame rates, and phone chassis overlay in real-time.
          </p>

          {/* View Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab("ui")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "ui"
                  ? "bg-white text-brand-600 shadow-sm"
                  : "text-slate-600 hover:text-navy-900"
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Receiver Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("mirror")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "mirror"
                  ? "bg-white text-brand-600 shadow-sm"
                  : "text-slate-600 hover:text-navy-900"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>iOS Screen Mirroring Flow</span>
            </button>
          </div>
        </div>

        {/* Interactive Preview Container */}
        <div className="relative max-w-5xl mx-auto">
          {activeTab === "ui" ? (
            /* Receiver Dashboard View */
            <div className="relative rounded-3xl p-4 sm:p-8 bg-gradient-to-b from-brand-100/60 to-white/80 border border-brand-200/80 shadow-2xl shadow-brand-500/10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Window Frame with preview.png */}
                <div className="lg:col-span-7 flex justify-center">
                  <div className="relative w-full max-w-[420px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 bg-white">
                    {/* Window Title Bar */}
                    <div className="bg-[#EDF5FD] px-4 py-2.5 border-b border-brand-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 relative">
                          <Image
                            src="/logo-mark.png"
                            alt="AirBridge Icon"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-xs font-semibold text-brand-900">
                          AirBridge
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      </div>
                    </div>

                    {/* App Screenshot Image */}
                    <div className="relative aspect-[524/788] w-full bg-slate-50">
                      <Image
                        src="/preview.png"
                        alt="AirBridge Windows Application Interface"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Feature Highlights & Controls */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-5 rounded-2xl bg-white border border-brand-100 shadow-sm hover:border-brand-300 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 font-bold">
                        <Sliders className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-navy-900">
                          Adaptive Latency Modes
                        </h4>
                        <p className="mt-1 text-sm text-slate-600 leading-snug">
                          Toggle between <strong>Low latency</strong> for gaming/screen interaction or <strong>A/V sync</strong> for flawless video playback.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-brand-100 shadow-sm hover:border-brand-300 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 font-bold">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-navy-900">
                          1440p & 1080p @ 60 FPS
                        </h4>
                        <p className="mt-1 text-sm text-slate-600 leading-snug">
                          Hardware accelerated with D3D11 video sink and WASAPI audio sink for crisp, smooth 60 frames-per-second streaming.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-brand-100 shadow-sm hover:border-brand-300 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 font-bold">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-navy-900">
                          Framed Mirroring Overlay
                        </h4>
                        <p className="mt-1 text-sm text-slate-600 leading-snug">
                          Wrap your mirroring stream in a sleek, realistic iPhone chassis with dynamic aspect-ratio auto-rotation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-brand-100 shadow-sm hover:border-brand-300 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 font-bold">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-navy-900">
                          Security & PIN Protection
                        </h4>
                        <p className="mt-1 text-sm text-slate-600 leading-snug">
                          Optional PIN code verification prevents unauthorized connection attempts from guests on your network.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* iOS Screen Mirroring Flow View */
            <div className="relative rounded-3xl p-6 sm:p-12 bg-gradient-to-b from-sky-50 to-white border border-brand-200/80 shadow-2xl shadow-brand-500/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-brand-100 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-brand-500/30 mb-4">
                    1
                  </div>
                  <h4 className="text-lg font-bold text-navy-900 mb-2">
                    Launch AirBridge on PC
                  </h4>
                  <p className="text-sm text-slate-600">
                    Run <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-brand-700">AirBridge.exe</code>. The receiver announces itself instantly via local mDNS discovery.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-brand-100 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-brand-500/30 mb-4">
                    2
                  </div>
                  <h4 className="text-lg font-bold text-navy-900 mb-2">
                    Open iOS Control Center
                  </h4>
                  <p className="text-sm text-slate-600">
                    Swipe down from the top right of your iPhone or iPad and tap the native <strong>Screen Mirroring</strong> icon.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-brand-100 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-brand-500/30 mb-4">
                    3
                  </div>
                  <h4 className="text-lg font-bold text-navy-900 mb-2">
                    Select Your PC
                  </h4>
                  <p className="text-sm text-slate-600">
                    Tap your PC name in the list. Your display mirrors immediately at 60 FPS with full audio and zero setup!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
