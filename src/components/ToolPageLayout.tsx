import React, { useState } from 'react';
import { 
  Star, Share2, ArrowLeft, Check, ChevronDown, ChevronUp, 
  Sparkles, CheckCircle2, HelpCircle, ShieldCheck, BookOpen, Layers
} from 'lucide-react';
import { ToolDefinition } from '../types/tool';

interface ToolPageLayoutProps {
  tool: ToolDefinition;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  relatedTools: ToolDefinition[];
  onSelectRelated: (tool: ToolDefinition) => void;
}

export const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({
  tool,
  onBack,
  isFavorite,
  onToggleFavorite,
  relatedTools,
  onSelectRelated,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedShare, setCopiedShare] = useState(false);

  const ToolComponent = tool.component;

  const handleShare = () => {
    const rawSiteUrl = 
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
      'https://tektonis.in';
    const siteUrl = rawSiteUrl.replace(/\/+$/, '');
    const url = `${siteUrl}/tools/${tool.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumb & Navigation */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3">
        <a
          href="/"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
              e.preventDefault();
              onBack();
            }
          }}
          aria-label="Back to all utilities"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs transition focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to All Tools</span>
        </a>

        <div className="flex items-center gap-2">
          {/* Favorite Toggle */}
          <button
            onClick={onToggleFavorite}
            aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Bookmark ${tool.name}`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${
              isFavorite
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-500'}`} aria-hidden="true" />
            <span>{isFavorite ? 'Favorited' : 'Bookmark Tool'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            aria-label="Copy tool URL to clipboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            {copiedShare ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            ) : (
              <Share2 className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            )}
            <span>{copiedShare ? 'URL Copied!' : 'Share'}</span>
          </button>
        </div>
      </nav>

      {/* Hero Header for this Tool (Single H1) */}
      <header className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-xs relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 tracking-wide">
              {tool.category.toUpperCase()}
            </span>
            {tool.badge && (
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
                {tool.badge}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {tool.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {tool.longDescription}
          </p>

          {/* Tags */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Target Keywords:</span>
            {tool.targetKeywords.map((kw) => (
              <span
                key={kw}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Main Tool Functional Widget Container */}
      <div className="p-4 sm:p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <ToolComponent />
      </div>

      {/* Comprehensive Explainer Section (Hero Tools Thin Content Fix - 300-400 words) */}
      {tool.explainer && (
        <article 
          aria-labelledby="explainer-heading" 
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs"
        >
          <div className="max-w-[720px] mx-auto space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
              <h2 id="explainer-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {tool.explainer.title}
              </h2>
            </div>

            {/* What It Does */}
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                What This Tool Does
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {tool.explainer.whatItDoes}
              </p>
            </div>

            {/* How It Works */}
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                How It Works Under the Hood
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {tool.explainer.howItWorks}
              </p>
            </div>

            {/* When to Use */}
            <div className="space-y-2.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                When and Why to Use {tool.name}
              </h3>
              <ul className="space-y-2 pt-1">
                {tool.explainer.whenToUse.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* In-Browser Privacy Note */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                <h3 className="text-sm sm:text-base font-bold text-emerald-900 dark:text-emerald-200">
                  100% Client-Side Privacy Guarantee
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                {tool.explainer.clientSideBenefit}
              </p>
            </div>
          </div>
        </article>
      )}

      {/* How To Use Section */}
      {tool.howToUse && tool.howToUse.length > 0 && (
        <section aria-labelledby="how-to-use-heading" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <h2 id="how-to-use-heading" className="text-lg font-bold text-slate-900 dark:text-white">
              How to Use {tool.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {tool.howToUse.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/60 space-y-1.5"
              >
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block font-mono">
                  STEP {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{step.step}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features & Benefits */}
      {tool.features && tool.features.length > 0 && (
        <section aria-labelledby="features-heading" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <h2 id="features-heading" className="text-lg font-bold text-slate-900 dark:text-white">
              Key Features & Performance Highlights
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {tool.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Accordion with semantic markup for Google Rich Snippets */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section aria-labelledby="faq-heading" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            <h2 id="faq-heading" className="text-lg font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-700/70 pt-2">
            {tool.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-3.5">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full flex items-center justify-between text-left gap-4 group focus:outline-hidden focus:text-blue-600"
                  >
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                    )}
                  </button>

                  {isOpen && (
                    <div 
                      id={`faq-answer-${idx}`} 
                      role="region"
                      className="pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in duration-150"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Tools to Strengthen Internal Link Equity */}
      {relatedTools.length > 0 && (
        <section aria-labelledby="related-tools-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 id="related-tools-heading" className="text-base font-bold text-slate-900 dark:text-white">
              Related Tools You Might Find Useful
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((rel) => (
              <a
                key={rel.id}
                href={`/tools/${rel.slug}`}
                aria-label={`Open ${rel.name}: ${rel.shortDescription}`}
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                    e.preventDefault();
                    onSelectRelated(rel);
                  }
                }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition shadow-2xs hover:shadow-sm flex flex-col justify-between focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {rel.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{rel.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {rel.shortDescription}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="text-[11px] font-medium">Free Utility</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">Open Tool →</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
