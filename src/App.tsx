import React, { useState, useEffect } from 'react';
import { TOOLS, CATEGORIES } from './tools/registry';
import { ToolDefinition, ToolCategory } from './types/tool';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ToolGrid } from './components/ToolGrid';
import { ToolPageLayout } from './components/ToolPageLayout';
import { CommandPalette } from './components/CommandPalette';
import { SEOHead } from './components/SEOHead';

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolDefinition | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Favorites stored in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('omni_favorites');
      return stored ? JSON.parse(stored) : ['word-counter', 'json-formatter', 'qr-code-generator'];
    } catch {
      return ['word-counter', 'json-formatter', 'qr-code-generator'];
    }
  });

  // Dark Mode with localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('omni_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('omni_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('omni_theme', 'light');
    }
  }, [darkMode]);

  // Sync active tool from URL search query on mount and history changes
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const toolSlug = params.get('tool');
      if (toolSlug) {
        const found = TOOLS.find((t) => t.slug === toolSlug || t.id === toolSlug);
        if (found) setActiveTool(found);
      } else {
        setActiveTool(null);
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectTool = (tool: ToolDefinition) => {
    setActiveTool(tool);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const url = new URL(window.location.href);
    url.searchParams.set('tool', tool.slug);
    window.history.pushState({}, '', url.toString());
  };

  const goHome = () => {
    setActiveTool(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const url = new URL(window.location.href);
    url.searchParams.delete('tool');
    window.history.pushState({}, '', url.toString());
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId];
      try {
        localStorage.setItem('omni_favorites', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const relatedTools = activeTool
    ? TOOLS.filter((t) => t.id !== activeTool.id && (t.category === activeTool.category || t.badge === 'Popular')).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors duration-150">
      {/* Dynamic SEO metadata & JSON-LD structured data */}
      <SEOHead tool={activeTool} />

      {/* Global Header */}
      <Header
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        favoritesCount={favorites.length}
        onShowFavorites={() => {
          setActiveTool(null);
          setSelectedCategory('all');
        }}
        onGoHome={goHome}
        activeTool={activeTool}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTool ? (
          <ToolPageLayout
            tool={activeTool}
            onBack={goHome}
            isFavorite={favorites.includes(activeTool.id)}
            onToggleFavorite={() => toggleFavorite(activeTool.id)}
            relatedTools={relatedTools}
            onSelectRelated={selectTool}
          />
        ) : (
          <div className="space-y-10">
            <HeroSection
              onSearchFocus={() => setIsCommandPaletteOpen(true)}
              onSelectTool={selectTool}
              tools={TOOLS}
            />

            <ToolGrid
              tools={TOOLS}
              onSelectTool={selectTool}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveTool(null);
          setSelectedCategory(cat);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onSelectTool={selectTool}
        tools={TOOLS}
      />

      {/* Command Palette (⌘K) Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        tools={TOOLS}
        onSelectTool={selectTool}
      />
    </div>
  );
}
