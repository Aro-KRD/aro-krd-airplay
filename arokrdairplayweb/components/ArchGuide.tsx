"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, ExternalLink, ShieldCheck } from "lucide-react";

export default function ArchGuide() {
  const [copied, setCopied] = useState(false);

  const command =
    "git clone https://github.com/Aro-KRD/aro-krd-airplay.git\ncd aro-krd-airplay\n./arch/setup.sh";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="arch" className="py-20 bg-gradient-to-b from-white via-brand-50/30 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 glass-panel border border-brand-200/90 shadow-2xl shadow-brand-500/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-2">
                Linux Ready
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                First-Class Arch Linux & AUR Port
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Full native UxPlay 1.73 engine integration with GTK 4 interface, systemd user service, and automatic pacman dependency resolution.
              </p>
            </div>
          </div>

          {/* Terminal Box */}
          <div className="rounded-2xl overflow-hidden bg-navy-900 border border-slate-700 shadow-xl text-left">
            <div className="bg-navy-800/90 px-4 py-3 border-b border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  bash - Arch Linux Setup
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-700/60 hover:bg-slate-700 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-5 font-mono text-sm text-slate-200 overflow-x-auto">
              <div className="text-slate-500 select-none"># Clone the repository and run the automated Arch installer</div>
              <div className="mt-1">
                <span className="text-brand-400">$</span> git clone https://github.com/Aro-KRD/aro-krd-airplay.git
              </div>
              <div>
                <span className="text-brand-400">$</span> cd aro-krd-airplay
              </div>
              <div>
                <span className="text-brand-400">$</span> ./arch/setup.sh
              </div>
            </div>
          </div>

          {/* Features list */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>Wayland & X11 Compatible</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>firewalld & UFW Auto-Rules</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>Optional BLE Peripheral Control</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

