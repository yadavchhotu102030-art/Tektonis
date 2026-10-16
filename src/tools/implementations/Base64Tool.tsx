import React, { useState } from 'react';
import { Copy, Check, ArrowRightLeft, Image, FileText, Download, Trash2, AlertCircle } from 'lucide-react';

export const Base64Tool: React.FC = () => {
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [subMode, setSubMode] = useState<'encode' | 'decode'>('encode');
  
  // Text state
  const [textInput, setTextInput] = useState('Hello World! Welcome to Tektonis (https://tektonis.in).');
  const [textOutput, setTextOutput] = useState('');
  const [textError, setTextError] = useState<string | null>(null);

  // Image state
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [imageSize, setImageSize] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  // Encode / Decode text
  React.useEffect(() => {
    if (mode !== 'text') return;
    setTextError(null);
    if (!textInput) {
      setTextOutput('');
      return;
    }

    try {
      if (subMode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(textInput)));
        setTextOutput(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(textInput.trim())));
        setTextOutput(decoded);
      }
    } catch (err: unknown) {
      setTextError(subMode === 'decode' ? 'Invalid Base64 sequence to decode' : 'Failed to encode');
      setTextOutput('');
    }
  }, [textInput, subMode, mode]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFileName(file.name);
    setImageSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (str: string) => {
    navigator.clipboard.writeText(str);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    element.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Tabs: Text vs Image */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-sm mx-auto">
        <button
          onClick={() => setMode('text')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition ${
            mode === 'text' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Text Base64</span>
        </button>
        <button
          onClick={() => setMode('image')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition ${
            mode === 'image' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Image className="w-3.5 h-3.5" />
          <span>Image to Base64</span>
        </button>
      </div>

      {mode === 'text' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-slate-200 dark:bg-slate-700 p-0.5 rounded-lg">
              <button
                onClick={() => setSubMode('encode')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  subMode === 'encode' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Encode Text → Base64
              </button>
              <button
                onClick={() => setSubMode('decode')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  subMode === 'decode' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Decode Base64 → Text
              </button>
            </div>

            <button
              onClick={() => {
                setTextInput(textOutput);
                setSubMode(subMode === 'encode' ? 'decode' : 'encode');
              }}
              disabled={!textOutput}
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 disabled:opacity-40"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Swap</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input pane */}
            <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs overflow-hidden">
              <div className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span>{subMode === 'encode' ? 'Plain Text Input' : 'Base64 Encoded Input'}</span>
                <button
                  onClick={() => setTextInput('')}
                  className="text-slate-400 hover:text-rose-500 transition"
                  title="Clear"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={subMode === 'encode' ? 'Type or paste plain text here...' : 'Paste base64 string here (e.g. SGVsbG8gV29ybGQh)...'}
                rows={10}
                className="p-3.5 text-xs font-mono bg-transparent outline-hidden resize-none text-slate-800 dark:text-slate-200"
              />
            </div>

            {/* Output pane */}
            <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shadow-xs overflow-hidden">
              <div className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  {subMode === 'encode' ? 'Base64 Output' : 'Plain Text Result'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(textOutput)}
                    disabled={!textOutput}
                    className="flex items-center gap-1 px-2 py-0.5 font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded transition disabled:opacity-40"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload(textOutput, subMode === 'encode' ? 'encoded.txt' : 'decoded.txt')}
                    disabled={!textOutput}
                    className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white disabled:opacity-40"
                    title="Download result"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {textError ? (
                <div className="p-4 flex items-center gap-2 text-rose-500 text-xs font-mono">
                  <AlertCircle className="w-4 h-4" />
                  <span>{textError}</span>
                </div>
              ) : (
                <textarea
                  readOnly
                  value={textOutput}
                  placeholder="Output will appear here instantly..."
                  rows={10}
                  className="p-3.5 text-xs font-mono bg-transparent outline-hidden resize-none text-slate-800 dark:text-slate-200 selection:bg-blue-200"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Image to Base64 mode */
        <div className="space-y-4">
          <div className="p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-center flex flex-col items-center justify-center">
            <Image className="w-10 h-10 text-blue-500 mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Upload Image to Convert to Base64 Data URL
            </p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP, GIF, or SVG (Up to 10MB)</p>
            <label className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-sm transition">
              Choose Image File
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          {imageSrc && (
            <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{imageFileName}</p>
                  <p className="text-[11px] text-slate-400">{(imageSize / 1024).toFixed(1)} KB original size</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(imageSrc)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Data URI Copied' : 'Copy Data URI'}</span>
                  </button>
                  <button
                    onClick={() => handleCopy(`<img src="${imageSrc}" alt="${imageFileName}" />`)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition"
                  >
                    Copy HTML &lt;img&gt;
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1.5">Image Preview</p>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center max-h-56 overflow-hidden">
                    <img src={imageSrc} alt="Preview" className="max-h-52 object-contain rounded-lg" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1.5">Base64 Data String</p>
                  <textarea
                    readOnly
                    value={imageSrc}
                    rows={8}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-[10px] text-slate-700 dark:text-slate-300 outline-hidden resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
