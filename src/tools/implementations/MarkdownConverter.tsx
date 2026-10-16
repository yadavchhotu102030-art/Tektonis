import React, { useState, useMemo } from 'react';
import { 
  FileText, Code, Copy, Check, Download, 
  Bold, Italic, Heading, Link, List, Quote, Table, Eye, Columns 
} from 'lucide-react';

export const MarkdownConverter: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(
`# Welcome to Tektonis Markdown Converter

Convert formatted markdown into clean, valid HTML with instant live preview.

## Key Features
- **Fast & Private**: All parsing happens in your local browser.
- **Copy Ready**: Grab clean HTML with a single click.
- *Supports lists, tables, code blocks, blockquotes, and links!*

### Sample Code Block
\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}
\`\`\`

> "Good design is as little design as possible." — Dieter Rams

Visit [Tektonis](https://tektonis.in) for more free developer utilities!`
  );

  const [activeTab, setActiveTab] = useState<'split' | 'preview' | 'html'>('split');
  const [copied, setCopied] = useState<string | null>(null);

  // Fast client-side markdown to HTML converter
  const htmlOutput = useMemo(() => {
    let html = markdown
      // Escape HTML characters
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Fenced Code blocks
    html = html.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/g, (_m, lang, code) => {
      return `<pre class="bg-slate-900 text-emerald-400 p-4 rounded-xl overflow-x-auto my-3 font-mono text-xs"><code class="language-${lang}">${code.trim()}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs text-rose-500">$1</code>');

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-5 mb-2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black text-slate-900 dark:text-white mt-6 mb-3">$1</h1>');

    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 py-1 italic my-3 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-r-lg">$1</blockquote>');

    // Bold & Italic
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">$1</a>');

    // Unordered lists
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 dark:text-slate-300 my-0.5">$1</li>');

    // Paragraphs
    html = html
      .split('\n\n')
      .map((block) => {
        if (/^<h[1-6]|<pre|<blockquote|<li/i.test(block.trim())) {
          return block;
        }
        return `<p class="my-2 leading-relaxed text-slate-700 dark:text-slate-300 text-sm">${block.replace(/\n/g, '<br />')}</p>`;
      })
      .join('\n');

    return html;
  }, [markdown]);

  const insertFormatting = (prefix: string, suffix = prefix) => {
    setMarkdown((prev) => `${prev} ${prefix}Text${suffix}`);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Action and Formatting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        {/* Formatting buttons */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => insertFormatting('**')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertFormatting('*')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertFormatting('## ', '')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Heading"
          >
            <Heading className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertFormatting('> ', '')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertFormatting('- ', '')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Bullet list"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertFormatting('[Link Title](https://example.com)', '')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Link"
          >
            <Link className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertFormatting('```javascript\n// code here\n```', '')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Code block"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        {/* View Mode Tabs & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-700 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('split')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition ${
                activeTab === 'split' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Split View</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition ${
                activeTab === 'preview' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition ${
                activeTab === 'html' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Raw HTML</span>
            </button>
          </div>

          <button
            onClick={() => handleCopy(htmlOutput, 'html')}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition"
          >
            {copied === 'html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied === 'html' ? 'Copied' : 'Copy HTML'}</span>
          </button>

          <button
            onClick={() => handleDownload(htmlOutput, 'document.html', 'text/html')}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs transition"
            title="Download .html"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor & Preview Area */}
      <div className={`grid gap-4 ${activeTab === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Markdown Input Area */}
        {activeTab !== 'preview' && activeTab !== 'html' && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs flex flex-col">
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 flex justify-between">
              <span>Markdown Input</span>
              <span>{markdown.length} characters</span>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={18}
              placeholder="Type or paste markdown..."
              className="w-full p-4 font-mono text-xs bg-transparent outline-hidden resize-y leading-relaxed text-slate-800 dark:text-slate-100"
            />
          </div>
        )}

        {/* Live Preview Pane */}
        {(activeTab === 'split' || activeTab === 'preview') && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 p-6 overflow-y-auto max-h-[500px] shadow-2xs">
            <div
              className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-100 leading-relaxed text-sm"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          </div>
        )}

        {/* Raw HTML Code Output */}
        {activeTab === 'html' && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-900 p-4 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed max-h-[500px]">
            <pre>{htmlOutput}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
