import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Layers } from 'lucide-react';

export const LoremIpsumGenerator: React.FC = () => {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words' | 'list'>('paragraphs');
  const [count, setCount] = useState<number>(3);
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [wrapHtml, setWrapHtml] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const baseWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
    'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
    'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse',
    'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
    'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim',
    'id', 'est', 'laborum', 'perspiciatis', 'unde', 'omnis', 'iste', 'natus', 'error',
    'voluptatem', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem', 'aperiam',
    'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis', 'quasi', 'architecto',
    'beatae', 'vitae', 'dicta', 'sunt', 'explicabo', 'nemo', 'ipsam', 'quia', 'voluptas'
  ];

  const generateSentence = (minWords = 6, maxWords = 14) => {
    const len = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const words: string[] = [];
    for (let i = 0; i < len; i++) {
      words.push(baseWords[Math.floor(Math.random() * baseWords.length)]);
    }
    const sentence = words.join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  const generateParagraph = (sentencesCount = 5) => {
    const sentences: string[] = [];
    for (let i = 0; i < sentencesCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const generatedContent = (() => {
    if (type === 'words') {
      const words: string[] = [];
      if (startWithLorem && count >= 5) {
        words.push('lorem', 'ipsum', 'dolor', 'sit', 'amet');
      }
      while (words.length < count) {
        words.push(baseWords[Math.floor(Math.random() * baseWords.length)]);
      }
      return words.slice(0, count).join(' ');
    }

    if (type === 'sentences') {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0 && startWithLorem) {
          sentences.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        } else {
          sentences.push(generateSentence());
        }
      }
      return sentences.join(' ');
    }

    if (type === 'list') {
      const items: string[] = [];
      for (let i = 0; i < count; i++) {
        items.push(generateSentence(4, 9).replace(/\.$/, ''));
      }
      if (wrapHtml) {
        return '<ul>\n' + items.map((it) => `  <li>${it}</li>`).join('\n') + '\n</ul>';
      }
      return items.map((it) => `• ${it}`).join('\n');
    }

    // Paragraphs
    const paras: string[] = [];
    for (let i = 0; i < count; i++) {
      if (i === 0 && startWithLorem) {
        paras.push(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
            generateParagraph(4)
        );
      } else {
        paras.push(generateParagraph(5));
      }
    }

    if (wrapHtml) {
      return paras.map((p) => `<p>${p}</p>`).join('\n\n');
    }
    return paras.join('\n\n');
  })();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'paragraphs', label: 'Paragraphs' },
            { id: 'sentences', label: 'Sentences' },
            { id: 'words', label: 'Words' },
            { id: 'list', label: 'Bullet List' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setType(item.id as typeof type)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                type === item.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 dark:border-slate-700">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Quantity ({count})
            </label>
            <input
              type="range"
              min={1}
              max={type === 'words' ? 100 : 20}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-sm"
              />
              <span>Start with "Lorem ipsum..."</span>
            </label>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={wrapHtml}
                onChange={(e) => setWrapHtml(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-sm"
              />
              <span>Wrap in HTML Tags</span>
            </label>
          </div>
        </div>
      </div>

      {/* Generated text card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-600 dark:text-slate-300">Generated Dummy Copy</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
          </button>
        </div>

        <div className="p-5 font-serif text-slate-800 dark:text-slate-200 leading-relaxed text-sm whitespace-pre-line max-h-96 overflow-y-auto">
          {generatedContent}
        </div>
      </div>
    </div>
  );
};
