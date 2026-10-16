import React from 'react';
import { Wrench, Zap, Lock, ShieldCheck } from 'lucide-react';
import { ToolCategory, ToolDefinition } from '../types/tool';

interface FooterProps {
  onSelectCategory: (cat: ToolCategory) => void;
  onSelectTool: (tool: ToolDefinition) => void;
  tools: ToolDefinition[];
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectTool,
  tools,
}) => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
      {/* Trust Badges Bar */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 py-8 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-100/70 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Client-Side Privacy</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Your data, images, passwords, and JSON never leave your browser. Zero server uploads or tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Instant Sub-10ms Speed</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                High-performance local JavaScript execution with zero network latency or wait times.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-100/70 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Free Forever</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Unlimited access to every utility. No sign-up required, no subscriptions, and no hidden paywalls.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-slate-900 dark:text-white">Tektonis</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-4">
              Free, private, and lightning-fast developer, content, and conversion tools hosted at tektonis.in, designed to make everyday workflows simple and effortless.
            </p>
          </div>

          {/* Text & Content category */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Text & Content
            </h5>
            <ul className="space-y-2 text-xs">
              {tools
                .filter((t) => t.category === 'text')
                .map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => onSelectTool(t)}
                      className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {t.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          {/* Developer & Web Tools */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Developer & Code
            </h5>
            <ul className="space-y-2 text-xs">
              {tools
                .filter((t) => t.category === 'developer' || t.category === 'web-seo')
                .slice(0, 5)
                .map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => onSelectTool(t)}
                      className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {t.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          {/* Converters & Media */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Converters & Media
            </h5>
            <ul className="space-y-2 text-xs">
              {tools
                .filter((t) => t.category === 'converter' || t.category === 'image' || t.category === 'security')
                .slice(0, 5)
                .map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => onSelectTool(t)}
                      className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {t.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Tektonis (tektonis.in). Free Online Utilities for Developers, Marketers & Creators.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Fast, secure, and privacy-focused</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
