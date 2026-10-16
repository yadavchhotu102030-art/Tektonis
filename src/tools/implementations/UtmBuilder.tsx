import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Link2, RotateCcw } from 'lucide-react';

export const UtmBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'utm' | 'url-codec'>('utm');

  // UTM state
  const [baseUrl, setBaseUrl] = useState('https://mysite.com/landing-page');
  const [source, setSource] = useState('google');
  const [medium, setMedium] = useState('cpc');
  const [campaign, setCampaign] = useState('spring_sale_2026');
  const [term, setTerm] = useState('developer+tools');
  const [content, setContent] = useState('hero_button_v1');
  const [copied, setCopied] = useState(false);

  // URL Codec state
  const [codecInput, setCodecInput] = useState('https://example.com/search?q=free tools&category=web dev');
  const [codecOutput, setCodecOutput] = useState('');
  const [codecCopied, setCodecCopied] = useState(false);

  // Generate complete UTM URL
  const generatedUrl = (() => {
    if (!baseUrl.trim()) return '';
    let finalUrl = baseUrl.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
    }

    try {
      const urlObj = new URL(finalUrl);
      if (source) urlObj.searchParams.set('utm_source', source.trim());
      if (medium) urlObj.searchParams.set('utm_medium', medium.trim());
      if (campaign) urlObj.searchParams.set('utm_campaign', campaign.trim());
      if (term) urlObj.searchParams.set('utm_term', term.trim());
      if (content) urlObj.searchParams.set('utm_content', content.trim());
      return urlObj.toString();
    } catch {
      return '';
    }
  })();

  const handleCopy = (str: string) => {
    navigator.clipboard.writeText(str);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setBaseUrl('https://mysite.com');
    setSource('');
    setMedium('');
    setCampaign('');
    setTerm('');
    setContent('');
  };

  const handleEncode = () => {
    try {
      setCodecOutput(encodeURIComponent(codecInput));
    } catch {
      setCodecOutput('Encoding error');
    }
  };

  const handleDecode = () => {
    try {
      setCodecOutput(decodeURIComponent(codecInput));
    } catch {
      setCodecOutput('Decoding error: Invalid URI sequence');
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab('utm')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
            activeTab === 'utm' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          UTM Campaign Builder
        </button>
        <button
          onClick={() => setActiveTab('url-codec')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
            activeTab === 'url-codec' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          URL Encoder & Decoder
        </button>
      </div>

      {activeTab === 'utm' ? (
        <div className="space-y-5">
          {/* Result Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-850 border border-blue-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Generated Campaign Tracking URL
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(generatedUrl)}
                  disabled={!generatedUrl}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-40"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy URL'}</span>
                </button>
                {generatedUrl && (
                  <a
                    href={generatedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 border border-slate-200 dark:border-slate-600"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <p className="font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-100 break-all select-all p-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-700">
              {generatedUrl || 'Fill in the website URL and source below...'}
            </p>
          </div>

          {/* Form Fields */}
          <div className="p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Campaign Parameters</span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Website URL <span className="text-rose-500">* (Required)</span>
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://example.com/pricing"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Campaign Source (utm_source) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. google, newsletter, twitter, linkedin"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Campaign Medium (utm_medium)
                  </label>
                  <div className="flex gap-1">
                    {['cpc', 'email', 'social'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMedium(m)}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  placeholder="e.g. cpc, email, social, referral, banner"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Campaign Name (utm_campaign)
                </label>
                <input
                  type="text"
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  placeholder="e.g. summer_promo, launch_2026"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Campaign Term / Keywords (utm_term)
                </label>
                <input
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="e.g. running+shoes, seo+tools"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Campaign Content (utm_content)
                </label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="e.g. logolink, textlink, hero_cta"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* URL Codec Tab */
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Input String or URL</label>
            <textarea
              value={codecInput}
              onChange={(e) => setCodecInput(e.target.value)}
              rows={3}
              placeholder="Enter text or URL to encode or decode..."
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-mono"
            />

            <div className="flex gap-2">
              <button
                onClick={handleEncode}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Encode URL Component
              </button>
              <button
                onClick={handleDecode}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-200 transition"
              >
                Decode URL Component
              </button>
            </div>
          </div>

          {codecOutput && (
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">Output Result</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(codecOutput);
                    setCodecCopied(true);
                    setTimeout(() => setCodecCopied(false), 2000);
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                >
                  {codecCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{codecCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                {codecOutput}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
