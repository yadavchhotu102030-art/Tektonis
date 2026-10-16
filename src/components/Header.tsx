import React from 'react';
import { Wrench, Search, Sun, Moon, Star, Home } from 'lucide-react';
import { ToolDefinition } from '../types/tool';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  favoritesCount: number;
  onShowFavorites: () => void;
  onGoHome: () => void;
  activeTool: ToolDefinition | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  favoritesCount,
  onShowFavorites,
  onGoHome,
  activeTool,
  darkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2.5 text-left group transition focus:outline-hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  Tektonis
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white uppercase tracking-wider">
                  .in
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 block leading-none">
                100% Free & Private Utilities
              </span>
            </div>
          </button>

          {activeTool && (
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-700">
              <button
                onClick={onGoHome}
                className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <Home className="w-3.5 h-3.5" />
                <span>All Tools</span>
              </button>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 truncate max-w-[160px]">
                {activeTool.name}
              </span>
            </div>
          )}
        </div>

        {/* Center Search Bar Trigger */}
        <div className="flex-1 max-w-md hidden sm:block">
          <button
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition text-slate-400 text-xs shadow-2xs"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">Search 14+ tools or keywords...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Mobile search trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="sm:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            title="Search tools"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Favorites */}
          <button
            onClick={onShowFavorites}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title="Saved Favorite Tools"
          >
            <Star className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title="Toggle color theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
