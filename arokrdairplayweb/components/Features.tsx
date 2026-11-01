"use client";

import React from "react";
import {
  Zap,
  Shield,
  Wifi,
  Smartphone,
  Layers,
  Activity,
  Sliders,
  CheckCircle2,
  Tv,
  Cpu,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Ultra Low-Latency Mirroring",
    description:
      "Powered by Direct3D 11 hardware video pipelines and WASAPI audio sinks. Sub-50ms latency makes screen interaction, presentations, and gaming smooth and responsive.",
    color: "from-blue-500 to-brand-600",
  },
  {
    icon: Smartphone,
    title: "100% Native iOS Experience",
    description:
      "Uses the native AirPlay Screen Mirroring built into iOS and iPadOS. No third-party apps to install on your phone, no profiles, and zero sideloading required.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Cpu,
    title: "1440p & 1080p @ 60 FPS",
    description:
      "Stream at silky-smooth 60 frames per second with high-definition rendering. Automatically scales to match your PC monitor resolution with zero stutter.",
    color: "from-indigo-500 to-brand-600",
  },
  {
    icon: Shield,
    title: "Completely Private & Local",
    description:
      "All video and audio streams travel strictly across your local Wi-Fi network. No telemetry, no external cloud servers, and zero data leaves your room.",
    color: "from-brand-600 to-blue-700",
  },
  {
    icon: Layers,
    title: "Phone-Shaped Chassis Frame",
    description:
      "Choose between borderless immersion, full-screen display, or a sleek iPhone bezel frame with rounded corners that rotates smoothly with your phone.",
    color: "from-cyan-500 to-sky-600",
  },
  {
    icon: Activity,
    title: "Built-In Diagnostics Doctor",
    description:
      "Includes an intelligent healthcheck script that verifies your Apple Bonjour responder, checks firewall rules, and identifies network adapter conflicts automatically.",
    color: "from-blue-600 to-indigo-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Why AirBridge
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Engineered For Performance & Simplicity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Everything you need for seamless AirPlay mirroring on your Windows or Arch Linux PC without bloated commercial software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-brand-300 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feature.color} text-white flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-brand-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
