import React, { useState, useMemo } from 'react';
import { Copy, Trash2, FileText, Clock, Volume2, Sparkles, BarChart2, Check } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>(
    'Search engine optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic. Modern SEO requires crafting engaging, keyword-optimized content with natural reading rhythm and clear structural headings.'
  );
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMin: 0,
        speakingTimeMin: 0,
        readabilityScore: 0,
        readabilityGrade: 'N/A',
        keywordDensity: [] as { word: string; count: number; percent: number }[],
      };
    }

    const wordsArray = trimmed.match(/[\p{L}\p{N}'’_-]+/gu) || [];
    const words = wordsArray.length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s+/g, '').length;
    
    // Sentence count
    const sentences = (trimmed.match(/[.!?]+(?:\s|$)/g) || []).length || (words > 0 ? 1 : 0);
    
    // Paragraph count
    const paragraphs = trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length;

    // Reading time: ~225 wpm; Speaking time: ~130 wpm
    const readingTimeMin = Math.ceil((words / 225) * 10) / 10;
    const speakingTimeMin = Math.ceil((words / 130) * 10) / 10;

    // Syllables estimation for Flesch Reading Ease
    const countSyllables = (word: string) => {
      const clean = word.toLowerCase().replace(/[^a-z]/g, '');
      if (clean.length <= 3) return 1;
      const matches = clean.replace(/(?:[^laeiouy]|ed|es|e)$/, '').match(/[aeiouy]{1,2}/g);
      return matches ? matches.length : 1;
    };

    let totalSyllables = 0;
    const wordFreq: Record<string, number> = {};
    const stopWords = new Set([
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he',
      'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
      'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about',
      'who', 'get', 'which', 'go', 'me', 'is', 'are', 'was', 'were', 'has', 'had'
    ]);

    wordsArray.forEach((w) => {
      totalSyllables += countSyllables(w);
      const lower = w.toLowerCase();
      if (lower.length > 2 && !stopWords.has(lower)) {
        wordFreq[lower] = (wordFreq[lower] || 0) + 1;
      }
    });

    // Flesch Reading Ease Score
    let readabilityScore = 0;
    let readabilityGrade = 'Fair';
    if (words > 0 && sentences > 0) {
      const avgSentenceLength = words / sentences;
      const avgSyllablesPerWord = totalSyllables / words;
      readabilityScore = Math.round(206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord);
      readabilityScore = Math.max(0, Math.min(100, readabilityScore));

      if (readabilityScore >= 90) readabilityGrade = 'Very Easy (5th grade)';
      else if (readabilityScore >= 80) readabilityGrade = 'Easy (6th grade)';
      else if (readabilityScore >= 70) readabilityGrade = 'Fairly Easy (7th grade)';
      else if (readabilityScore >= 60) readabilityGrade = 'Standard (8th–9th grade)';
      else if (readabilityScore >= 50) readabilityGrade = 'Fairly Difficult (High School)';
      else if (readabilityScore >= 30) readabilityGrade = 'Difficult (College)';
      else readabilityGrade = 'Very Difficult (Graduate)';
    }

    const keywordDensity = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word, count]) => ({
        word,
        count,
        percent: words > 0 ? Math.round((count / words) * 1000) / 10 : 0,
      }));

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTimeMin,
      speakingTimeMin,
      readabilityScore,
      readabilityGrade,
      keywordDensity,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  const handleSample = () => {
    setText(
      'Online tools are essential instruments in modern digital workflows. Whether you are generating secure passwords, optimizing copy for search engine rankings, or formatting complex JSON structures, having instant, client-side web tools saves valuable engineering and marketing time. With zero data collection and instant local execution, your privacy remains completely protected at all times.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Words</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">{stats.words.toLocaleString()}</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Characters</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{stats.characters.toLocaleString()}</p>
          <span className="text-[11px] text-slate-500">{stats.charactersNoSpaces} no spaces</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Sentences</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{stats.sentences.toLocaleString()}</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Paragraphs</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{stats.paragraphs.toLocaleString()}</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <p className="text-xs font-semibold uppercase tracking-wider">Reading</p>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-violet-600 dark:text-violet-400 mt-1">
            {stats.readingTimeMin} <span className="text-xs font-medium text-slate-500">min</span>
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Volume2 className="w-3.5 h-3.5" />
            <p className="text-xs font-semibold uppercase tracking-wider">Speaking</p>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
            {stats.speakingTimeMin} <span className="text-xs font-medium text-slate-500">min</span>
          </p>
        </div>
      </div>

      {/* Editor Box */}
      <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-sm">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
            <FileText className="w-4 h-4 text-blue-500" />
            <span>Real-time Text Input</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSample}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition"
            >
              Load Sample
            </button>
            <button
              onClick={handleCopy}
              disabled={!text}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition disabled:opacity-40"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition disabled:opacity-40"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to view instant word count, reading time, keyword density, and readability analysis..."
          rows={9}
          className="w-full p-4 text-slate-800 dark:text-slate-100 bg-transparent resize-y outline-hidden font-normal text-base leading-relaxed"
        />
      </div>

      {/* SEO & Readability Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Readability Score */}
        <div className="bg-white dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Flesch Readability Ease</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              Score: {stats.readabilityScore} / 100
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-3 overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${
                stats.readabilityScore >= 70
                  ? 'bg-emerald-500'
                  : stats.readabilityScore >= 50
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${stats.readabilityScore}%` }}
            />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            Level: <strong className="text-slate-900 dark:text-white">{stats.readabilityGrade}</strong>
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Higher scores indicate content that is easier to read and comprehend for broader audiences, ideal for web content and SEO ranking.
          </p>
        </div>

        {/* Top Keyword Density */}
        <div className="bg-white dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-blue-500" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Keyword Frequency & Density</h3>
            </div>
            <span className="text-xs text-slate-500">Top repeated words</span>
          </div>

          {stats.keywordDensity.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Enter text to see prominent keyword occurrences and densities.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {stats.keywordDensity.map((k) => (
                <div
                  key={k.word}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-xs"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[90px]">{k.word}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 text-[10px]">{k.count}x</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{k.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
