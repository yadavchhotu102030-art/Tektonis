import React, { useState } from 'react';
import { 
  Star, ArrowRight, Sparkles, 
  FileText, Code, ArrowRightLeft, 
  Shield, Image, Ruler, Clock, Layers, Split, Link2, Pipette, QrCode,
  Calendar, Percent, Calculator, Activity, Sliders
} from 'lucide-react';
import { ToolDefinition, ToolCategory } from '../types/tool';
import { CATEGORIES } from '../tools/registry';

interface ToolGridProps {
  tools: ToolDefinition[];
  onSelectTool: (tool: ToolDefinition) => void;
  favorites: string[];
  onToggleFavorite: (toolId: string) => void;
  selectedCategory: ToolCategory;
  onSelectCategory: (cat: ToolCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ToolGrid: React.FC<ToolGridProps> = ({
  tools,
  onSelectTool,
  favorites,
  onToggleFavorite,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [sortBy, setSortBy] = useState<'popular' | 'name' | 'featured'>('popular');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Helper to pick category icon
  const getToolIcon = (name: string) => {
    switch (name) {
      case 'FileText':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'Code':
        return <Code className="w-5 h-5 text-emerald-500" />;
      case 'QrCode':
        return <QrCode className="w-5 h-5 text-indigo-500" />;
      case 'ArrowRightLeft':
        return <ArrowRightLeft className="w-5 h-5 text-cyan-500" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-rose-500" />;
      case 'Image':
        return <Image className="w-5 h-5 text-purple-500" />;
      case 'Pipette':
        return <Pipette className="w-5 h-5 text-pink-500" />;
      case 'Link2':
        return <Link2 className="w-5 h-5 text-amber-500" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-teal-500" />;
      case 'Ruler':
        return <Ruler className="w-5 h-5 text-orange-500" />;
      case 'Split':
        return <Split className="w-5 h-5 text-sky-500" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-lime-500" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'Percent':
        return <Percent className="w-5 h-5 text-indigo-500" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-emerald-500" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-rose-500" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-violet-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-500" />;
    }
  };

  // Filter tools
  const filteredTools = tools
    .filter((t) => {
      if (onlyFavorites && !favorites.includes(t.id)) return false;
      if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.targetKeywords.some((k) => k.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'popular') {
        const isHotA = a.badge === 'Popular' || a.badge === 'Hot' ? 1 : 0;
        const isHotB = b.badge === 'Popular' || b.badge === 'Hot' ? 1 : 0;
        return isHotB - isHotA;
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === 'all' ? tools.length : tools.filter((t) => t.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter and Sort controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl border transition ${
              onlyFavorites
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>Favorites</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-hidden"
          >
            <option value="popular">Sort: Most Popular</option>
            <option value="name">Sort: Alphabetical (A-Z)</option>
            <option value="featured">Sort: Featured</option>
          </select>
        </div>
      </div>

      {/* Grid of Tool Cards */}
      {filteredTools.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-slate-800/40 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
          <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No tools found matching your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or reset the category filters to view all available tools.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              onSearchChange('');
              setOnlyFavorites(false);
            }}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredTools.map((tool) => {
            const isFav = favorites.includes(tool.id);

            return (
              <a
                key={tool.id}
                href={`/tools/${tool.slug}`}
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                    e.preventDefault();
                    onSelectTool(tool);
                  }
                }}
                className="group relative p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-blue-500 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top card bar */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform">
                        {getToolIcon(tool.iconName)}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                          {tool.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                            {tool.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Bookmark favorite button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleFavorite(tool.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      title="Bookmark tool"
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-3">
                    {tool.shortDescription}
                  </p>

                  {/* Keyword / Tag Pills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.targetKeywords.slice(0, 2).map((kw) => (
                      <span
                        key={kw}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 text-slate-500 dark:text-slate-400"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer metadata */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    {tool.badge && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 uppercase">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <span className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Use Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
