import React, { useState, useEffect, useCallback } from 'react';
import { TOOLS, CATEGORIES } from './tools/registry';
import { ToolDefinition, ToolCategory } from './types/tool';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ToolGrid } from './components/ToolGrid';
import { ToolPageLayout } from './components/ToolPageLayout';
import { CommandPalette } from './components/CommandPalette';
import { SEOHead } from './components/SEOHead';
import { NotFoundView } from './components/NotFoundView';

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolDefinition | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [notFoundSlug, setNotFoundSlug] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Favorites stored in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('tektonis_favorites') || localStorage.getItem('omni_favorites');
      return stored ? JSON.parse(stored) : ['word-counter', 'json-formatter', 'qr-code-generator'];
    } catch {
      return ['word-counter', 'json-formatter', 'qr-code-generator'];
    }
  });

  // Dark Mode with localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tektonis_theme') || localStorage.getItem('omni_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('tektonis_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('tektonis_theme', 'light');
    }
  }, [darkMode]);

  // Sync active route from window.location pathname and handle legacy ?tool= queries
  const syncRoute = useCallback(() => {
    // 1. Check legacy query parameter: /?tool=<slug>
    const searchParams = new URLSearchParams(window.location.search);
    const legacySlug = searchParams.get('tool');
    const searchParam = searchParams.get('search') || searchParams.get('q');

    if (searchParam !== null) {
      setSearchQuery(searchParam);
    }

    if (legacySlug) {
      // 301 client redirect: drop query params, push clean /tools/<slug> path
      const cleanPath = `/tools/${encodeURIComponent(legacySlug)}`;
      window.history.replaceState(null, '', cleanPath);

      const found = TOOLS.find((t) => t.slug === legacySlug || t.id === legacySlug);
      if (found) {
        setActiveTool(found);
        setIsNotFound(false);
        setNotFoundSlug('');
      } else {
        setActiveTool(null);
        setIsNotFound(true);
        setNotFoundSlug(legacySlug);
      }
      return;
    }

    // 2. Parse clean pathname: / or /tools/<slug>
    const rawPath = window.location.pathname;
    const cleanPath = rawPath.replace(/\/+$/, '') || '/';

    if (cleanPath === '/') {
      setActiveTool(null);
      setIsNotFound(false);
      setNotFoundSlug('');
      return;
    }

    const toolMatch = cleanPath.match(/^\/tools\/([^/]+)$/);
    if (toolMatch) {
      const slug = decodeURIComponent(toolMatch[1]);
      const found = TOOLS.find((t) => t.slug === slug || t.id === slug);
      if (found) {
        setActiveTool(found);
        setIsNotFound(false);
        setNotFoundSlug('');
      } else {
        setActiveTool(null);
        setIsNotFound(true);
        setNotFoundSlug(slug);
      }
      return;
    }

    // Any other unrecognized route (e.g. /unknown)
    setActiveTool(null);
    setIsNotFound(true);
    setNotFoundSlug(cleanPath.replace(/^\//, ''));
  }, []);

  useEffect(() => {
    syncRoute();
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, [syncRoute]);

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
    setIsNotFound(false);
    setNotFoundSlug('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const targetPath = `/tools/${tool.slug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  const goHome = () => {
    setActiveTool(null);
    setIsNotFound(false);
    setNotFoundSlug('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId];
      try {
        localStorage.setItem('tektonis_favorites', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const relatedTools = activeTool
    ? (activeTool.relatedToolIds && activeTool.relatedToolIds.length > 0
        ? (activeTool.relatedToolIds
            .map((id) => TOOLS.find((t) => t.id === id || t.slug === id))
            .filter((t): t is ToolDefinition => Boolean(t)))
        : TOOLS.filter((t) => t.id !== activeTool.id && (t.category === activeTool.category || t.badge === 'Popular')).slice(0, 3))
    : [];

  const popularTools = TOOLS.filter((t) => t.badge === 'Popular' || ['word-counter', 'json-formatter', 'qr-code-generator', 'password-generator'].includes(t.slug));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors duration-150">
      {/* Dynamic SEO metadata & JSON-LD structured data */}
      <SEOHead tool={activeTool} isNotFound={isNotFound} />

      {/* Global Header */}
      <Header
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        favoritesCount={favorites.length}
        onShowFavorites={() => {
          goHome();
          setSelectedCategory('all');
          setOnlyFavorites((prev) => !prev);
        }}
        onGoHome={() => {
          setOnlyFavorites(false);
          goHome();
        }}
        activeTool={activeTool}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isNotFound ? (
          <NotFoundView
            slug={notFoundSlug}
            onGoHome={goHome}
            onSelectTool={selectTool}
            popularTools={popularTools}
          />
        ) : activeTool ? (
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
              onlyFavorites={onlyFavorites}
              onToggleOnlyFavorites={setOnlyFavorites}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectCategory={(cat) => {
          goHome();
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
