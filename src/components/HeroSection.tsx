import React from 'react';
import { Search } from 'lucide-react';
import { ToolDefinition } from '../types/tool';

interface HeroSectionProps {
  onSearchFocus: () => void;
  onSelectTool: (tool: ToolDefinition) => void;
  tools: ToolDefinition[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchFocus,
  onSelectTool,
  tools,
}) => {
  const popularKeywords = [
    { label: 'Age Calculator', id: 'age-calculator' },
    { label: 'Word Counter', id: 'word-counter' },
    { label: 'QR Code Generator', id: 'qr-code-generator' },
    { label: 'JSON Formatter', id: 'json-formatter' },
    { label: 'Loan & EMI Calculator', id: 'loan-calculator' },
    { label: 'Password Generator', id: 'password-generator' },
    { label: 'BMI Calculator', id: 'bmi-calculator' },
    { label: 'Image Compressor', id: 'image-compressor' },
    { label: 'Percentage Calculator', id: 'percentage-calculator' },
    { label: 'Box Shadow Generator', id: 'box-shadow-generator' },
  ];

  return (
    <div className="relative py-12 sm:py-16 text-center space-y-6 max-w-4xl mx-auto px-4">
      {/* Main H1 Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
        Free Online Productivity &{' '}
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Developer Tools
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Essential everyday utilities built for writers, developers, and creators. 100% private in-browser execution with zero tracking and lightning-fast performance.
      </p>

      {/* Big Search Input Trigger */}
      <div className="pt-2 max-w-xl mx-auto">
        <div
          onClick={onSearchFocus}
          className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition group"
        >
          <div className="flex items-center gap-3 text-slate-400 text-sm sm:text-base">
            <Search className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            <span>Search any tool (e.g. 'json', 'word counter', 'qr code', 'password')...</span>
          </div>
          <kbd className="hidden sm:inline-flex px-2 py-1 text-xs font-mono font-bold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Popular Quick Suggestions */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-xs">
        <span className="text-slate-400 font-medium">Popular tools:</span>
        {popularKeywords.map((item) => {
          const target = tools.find((t) => t.id === item.id);
          if (!target) return null;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTool(target)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition shadow-2xs text-[11px] font-semibold"
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
