"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Download,
  Smartphone,
  Tv,
  Wifi,
  Cast,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Sliders,
  Laptop,
  Play,
} from "lucide-react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: "Launch AirBridge on your PC",
      subtitle: "One-click portable startup",
      description:
        "Double-click AirBridge.exe. The application automatically starts the local Bonjour discovery service and configures low-latency ports. No complex installation or accounts required.",
      badge: "Step 1 • Windows & Arch Linux",
      action: "Status: Ready to connect",
    },
    {
      step: 2,
      title: "Open iOS Control Center",
      subtitle: "No third-party apps on your phone",
      description:
        "On your iPhone or iPad, swipe down from the top-right corner to open Control Center. Tap the native Screen Mirroring icon (two overlapping screens).",
      badge: "Step 2 • Native iOS / iPadOS",
      action: "Tap 'Screen Mirroring'",
    },
    {
      step: 3,
      title: "Select your PC to Mirror Instantly",
      subtitle: "Zero-latency 60 FPS stream",
      description:
        "Your PC name (e.g. 'AirBridge PC') appears in the AirPlay device list. Tap it to start mirroring immediately with crisp 1440p/1080p video and full synchronized stereo audio.",
      badge: "Step 3 • Connected & Mirroring",
      action: "Connected at 60 FPS",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-28 bg-gradient-to-b from-white via-brand-50/60 to-white relative scroll-mt-20"
    >
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-brand-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Simple 3-Step Setup
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            How AirBridge Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            From zero to full 60 FPS screen mirroring in under 10 seconds. No cables, no iOS apps, and completely free.
          </p>
        </div>

        {/* 3 Step Cards Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((s) => {
            const isSelected = activeStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`text-left p-6 sm:p-8 rounded-3xl transition-all duration-300 border ${
                  isSelected
                    ? "bg-white border-brand-500 shadow-xl shadow-brand-500/15 ring-2 ring-brand-500/20 translate-y-[-2px]"
                    : "bg-white/70 hover:bg-white border-slate-200/80 hover:border-brand-200 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-lg transition-colors ${
                      isSelected
                        ? "bg-gradient-to-tr from-brand-600 to-brand-500 text-white shadow-md shadow-brand-500/30"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {s.step}
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isSelected
                        ? "bg-brand-50 text-brand-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {s.action}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-1">
                  {s.title}
                </h3>
                <p className="text-xs font-medium text-brand-600 mb-3">
                  {s.subtitle}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Visualizer */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-brand-200 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            {/* Left explanation */}
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wide">
                {steps[activeStep - 1].badge}
              </div>
              <h4 className="text-2xl font-bold text-navy-900">
                {steps[activeStep - 1].title}
              </h4>
              <p className="text-base text-slate-600 leading-relaxed">
                {steps[activeStep - 1].description}
              </p>

              <div className="pt-2 flex flex-col gap-2.5 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Both devices connected to same local Wi-Fi network</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Hardware-accelerated Direct3D 11 video pipeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Low latency WASAPI synchronized audio</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => setActiveStep(activeStep === 3 ? 1 : activeStep + 1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-md transition-colors"
                >
                  <span>{activeStep === 3 ? "Restart Flow" : "Next Step"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="/downloads/AirBridge.exe"
                  download="AirBridge.exe"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <Download className="w-4 h-4 text-brand-600" />
                  <span>Get AirBridge.exe</span>
                </a>
              </div>
            </div>

            {/* Right Graphic Mockup */}
            <div className="w-full md:w-80 flex justify-center">
              {activeStep === 1 && (
                /* Step 1 Visual: Windows App Ready Card */
                <div className="w-full max-w-[280px] p-5 rounded-2xl bg-white border border-brand-200 shadow-lg space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-navy-900">
                        AirBridge Ready
                      </span>
                    </div>
                    <span className="text-[10px] bg-brand-50 text-brand-700 font-semibold px-2 py-0.5 rounded">
                      v1.0.0
                    </span>
                  </div>
                  <div className="text-center py-4 bg-brand-50/50 rounded-xl border border-brand-100">
                    <Tv className="w-10 h-10 text-brand-600 mx-auto mb-2" />
                    <div className="text-sm font-bold text-navy-900">
                      Broadcasting
                    </div>
                    <div className="text-xs text-slate-500">
                      AirPlay receiver active on Wi-Fi
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 flex justify-between">
                    <span>Resolution:</span>
                    <span className="font-semibold text-navy-900">1440p / 1080p</span>
                  </div>
                  <div className="text-xs text-slate-500 flex justify-between">
                    <span>FPS:</span>
                    <span className="font-semibold text-navy-900">60 FPS</span>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                /* Step 2 Visual: iPhone Screen Mirroring Tile */
                <div className="w-full max-w-[280px] p-5 rounded-2xl bg-navy-900 text-white shadow-xl space-y-4 border border-slate-700">
                  <div className="text-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-semibold text-slate-400">
                      iOS Control Center
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-brand-600 text-white text-center shadow-lg shadow-brand-500/40 border border-brand-400">
                    <Cast className="w-8 h-8 mx-auto mb-1 animate-pulse" />
                    <div className="text-sm font-bold">Screen Mirroring</div>
                    <div className="text-[11px] text-brand-100">
                      Tap to view receivers
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 text-center">
                    Swipe down from top right on iPhone
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                /* Step 3 Visual: Connected Device List */
                <div className="w-full max-w-[280px] p-5 rounded-2xl bg-white border border-brand-200 shadow-lg space-y-3">
                  <div className="text-xs font-bold text-navy-900 pb-2 border-b border-slate-100">
                    Screen Mirroring
                  </div>
                  <div className="p-3 rounded-xl bg-brand-50 border border-brand-300 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Laptop className="w-5 h-5 text-brand-600" />
                      <div className="text-left">
                        <div className="text-xs font-bold text-navy-900">
                          AirBridge PC
                        </div>
                        <div className="text-[10px] text-emerald-600 font-medium">
                          Connected (60 FPS)
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="text-[11px] text-slate-500 text-center pt-2">
                    Mirroring active with synchronized audio
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

