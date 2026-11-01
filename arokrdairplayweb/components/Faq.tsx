"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Do I need to install any app or profile on my iPhone?",
    a: "No! AirBridge uses the native AirPlay Screen Mirroring protocol already built into iOS and iPadOS. You simply open your iPhone Control Center, tap Screen Mirroring, and your PC appears right there just like an Apple TV.",
  },
  {
    q: "Does AirBridge require an active internet connection?",
    a: "No. All audio and video streams travel directly between your iPhone and PC over your local Wi-Fi network. No internet bandwidth is consumed, and none of your data ever leaves your local network.",
  },
  {
    q: "Why is Apple Bonjour required on Windows?",
    a: "Apple's AirPlay discovery protocol uses mDNS (Bonjour) to announce receivers on the local subnet. iTunes or Apple's standalone Bonjour Print Services provides dnssd.dll. The AirBridge setup.ps1 and installer detect and guide Bonjour installation automatically.",
  },
  {
    q: "Does audio mirror along with the video stream?",
    a: "Yes! AirBridge captures both high-definition video and full stereo audio with synchronization using the low-latency Windows WASAPI audio subsystem.",
  },
  {
    q: "How does the latency compare to other solutions?",
    a: "AirBridge directly interfaces with hardware-accelerated Direct3D 11 video pipelines and low-latency audio sinks. Latency is typically under 50ms on a standard 5GHz home Wi-Fi network.",
  },
  {
    q: "Is AirBridge free and open-source?",
    a: "Yes! AirBridge is 100% free and released under the open-source MIT license on GitHub.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Questions & Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Have questions about how AirBridge works? We have answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-navy-900 hover:text-brand-600 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
