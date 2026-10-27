import React from 'react';
import { FileQuestion, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { ToolDefinition } from '../types/tool';

interface NotFoundViewProps {
  slug: string;
  onGoHome: () => void;
  onSelectTool: (tool: ToolDefinition) => void;
  popularTools: ToolDefinition[];
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  slug,
  onGoHome,
  onSelectTool,
  popularTools,
}) => {
  return (
    <div className="py-12 sm:py-16 max-w-2xl mx-auto text-center space-y-8 animate-in fade-in duration-200">
      <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center shadow-xs">
        <FileQuestion className="w-8 h-8" aria-hidden="true" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          404 — Page Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tool Not Found
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
          We couldn't locate a utility at <code className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold">/tools/{slug}</code>. It may have been renamed or moved.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="/"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
              e.preventDefault();
              onGoHome();
            }
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 transition shadow-sm shadow-blue-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All 20+ Free Tools</span>
        </a>
      </div>

      {/* Popular Suggestions */}
      {popularTools.length > 0 && (
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-left space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Popular Tools You Might Need Instead
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularTools.slice(0, 4).map((tool) => (
              <a
                key={tool.id}
                href={`/tools/${tool.slug}`}
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                    e.preventDefault();
                    onSelectTool(tool);
                  }
                }}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition flex items-center justify-between group shadow-2xs"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {tool.shortDescription}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
