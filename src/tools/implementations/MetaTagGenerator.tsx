import React, { useState } from 'react';
import { Copy, Check, Eye, Code, Search, Globe, Share2 } from 'lucide-react';

export const MetaTagGenerator: React.FC = () => {
  const [title, setTitle] = useState('Best Free Online Tools for Developers & Creators');
  const [description, setDescription] = useState(
    'Discover 15+ fast, private, and 100% free web utility tools. Format JSON, count words, generate QR codes, test contrast, and convert units instantly.'
  );
  const [url, setUrl] = useState('https://omnitools.example.com');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop');
  const [author, setAuthor] = useState('OmniTools Pro');
  const [twitterUser, setTwitterUser] = useState('@omnitools');
  const [robots, setRobots] = useState('index, follow');
  const [copied, setCopied] = useState(false);
  const [previewTab, setPreviewTab] = useState<'google' | 'social'>('google');

  // Title & description length ratings
  const titleLen = title.length;
  const descLen = description.length;

  const generatedHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${url}">
<meta name="author" content="${author}">

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${imageUrl}">
<meta name="twitter:creator" content="${twitterUser}">`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Page Title (H1 / Title Tag)
                </label>
                <span
                  className={`text-[11px] font-mono font-semibold ${
                    titleLen >= 30 && titleLen <= 60
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : titleLen > 60
                      ? 'text-rose-500'
                      : 'text-amber-500'
                  }`}
                >
                  {titleLen} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
              />
              <p className="text-[11px] text-slate-400 mt-1">Recommended length: 30 to 60 characters.</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Meta Description
                </label>
                <span
                  className={`text-[11px] font-mono font-semibold ${
                    descLen >= 120 && descLen <= 160
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : descLen > 160
                      ? 'text-rose-500'
                      : 'text-amber-500'
                  }`}
                >
                  {descLen} / 160 chars
                </span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
              />
              <p className="text-[11px] text-slate-400 mt-1">Recommended length: 120 to 160 characters.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Canonical URL</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">OG Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Twitter Handle</label>
                <input
                  type="text"
                  value={twitterUser}
                  onChange={(e) => setTwitterUser(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Robots</label>
                <select
                  value={robots}
                  onChange={(e) => setRobots(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
                >
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Live SERP & Social Previews */}
        <div className="lg:col-span-6 space-y-4">
          {/* Tabs */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setPreviewTab('google')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition ${
                previewTab === 'google' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Google SERP Preview</span>
            </button>
            <button
              onClick={() => setPreviewTab('social')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition ${
                previewTab === 'social' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Social Share Card</span>
            </button>
          </div>

          {previewTab === 'google' ? (
            /* Google Search Snippet Simulation */
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1 font-sans">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold">
                  G
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-xs">{url}</div>
              </div>
              <h4 className="text-blue-800 dark:text-blue-400 hover:underline cursor-pointer text-base font-semibold leading-snug line-clamp-1">
                {title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal line-clamp-2">
                {description}
              </p>
            </div>
          ) : (
            /* Social Card Simulation */
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-xs">
              <div className="h-44 bg-slate-100 overflow-hidden relative">
                <img
                  src={imageUrl}
                  alt="OG"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {url.replace(/^https?:\/\//, '').split('/')[0]}
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{title}</p>
                <p className="text-[11px] text-slate-500 line-clamp-2">{description}</p>
              </div>
            </div>
          )}

          {/* Generated Code */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-900 overflow-hidden">
            <div className="px-3.5 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-blue-400" />
                <span>Generated HTML Meta Tags</span>
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold transition"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy HTML'}</span>
              </button>
            </div>
            <pre className="p-3.5 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed max-h-56">
              {generatedHtml}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
