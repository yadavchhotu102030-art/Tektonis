import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';

export const ImageCompressor: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [originalDim, setOriginalDim] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressedDim, setCompressedDim] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const [format, setFormat] = useState<'image/webp' | 'image/jpeg' | 'image/png'>('image/webp');
  const [quality, setQuality] = useState<number>(80);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setOriginalPreview(src);

      const img = new Image();
      img.onload = () => {
        setOriginalDim({ w: img.width, h: img.height });
        setMaxWidth(Math.min(1920, img.width));
        processCompression(img, img.width, img.height, quality, format);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const processCompression = (
    img: HTMLImageElement,
    srcW: number,
    srcH: number,
    q: number,
    mimeType: string
  ) => {
    setIsProcessing(true);
    const canvas = document.createElement('canvas');
    let targetW = srcW;
    let targetH = srcH;

    if (targetW > maxWidth) {
      targetH = Math.round((targetH * maxWidth) / targetW);
      targetW = maxWidth;
    }

    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, targetW, targetH);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          if (compressedUrl) URL.revokeObjectURL(compressedUrl);
          const newUrl = URL.createObjectURL(blob);
          setCompressedUrl(newUrl);
          setCompressedSize(blob.size);
          setCompressedDim({ w: targetW, h: targetH });
        }
        setIsProcessing(false);
      },
      mimeType,
      mimeType === 'image/png' ? undefined : q / 100
    );
  };

  const triggerRecompress = (newQ = quality, newFmt = format, newMaxW = maxWidth) => {
    if (!originalPreview) return;
    const img = new Image();
    img.onload = () => {
      processCompression(img, originalDim.w, originalDim.h, newQ, newFmt);
    };
    img.src = originalPreview;
  };

  const percentSaved =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
      : 0;

  const handleDownload = () => {
    if (!compressedUrl) return;
    const ext = format === 'image/webp' ? 'webp' : format === 'image/jpeg' ? 'jpg' : 'png';
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `compressed-${Date.now()}.${ext}`;
    a.click();
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload area */}
      {!originalPreview ? (
        <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-center flex flex-col items-center justify-center">
          <ImageIcon className="w-12 h-12 text-blue-500 mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Upload an Image to Compress & Convert</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            100% Client-side. Photos are never uploaded to any remote server, ensuring complete confidentiality.
          </p>
          <label className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-sm transition">
            Select PNG, JPG, or WebP
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Format */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Output Format</label>
              <select
                value={format}
                onChange={(e) => {
                  const f = e.target.value as typeof format;
                  setFormat(f);
                  triggerRecompress(quality, f, maxWidth);
                }}
                className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
              >
                <option value="image/webp">WebP (Best Compression)</option>
                <option value="image/jpeg">JPEG (Universal)</option>
                <option value="image/png">PNG (Lossless)</option>
              </select>
            </div>

            {/* Quality */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quality</label>
                <span className="text-xs font-bold text-blue-600">{quality}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                disabled={format === 'image/png'}
                onChange={(e) => {
                  const q = Number(e.target.value);
                  setQuality(q);
                  triggerRecompress(q, format, maxWidth);
                }}
                className="w-full accent-blue-600 cursor-pointer disabled:opacity-40"
              />
            </div>

            {/* Change File button */}
            <div className="flex items-center gap-2 justify-end">
              <label className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer transition">
                Change Image
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
              <button
                onClick={handleDownload}
                disabled={!compressedUrl}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Stats Comparison Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Original Size</span>
              <span className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200">
                {formatBytes(originalSize)}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {originalDim.w} × {originalDim.h} px
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/30 text-center">
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block">Compressed Size</span>
              <span className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">
                {formatBytes(compressedSize)}
              </span>
              <span className="text-[11px] text-blue-500 block mt-0.5">
                {compressedDim.w} × {compressedDim.h} px
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30 text-center flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Bandwidth Saved</span>
              <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {percentSaved}%
              </span>
            </div>
          </div>

          {/* Previews side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <p className="text-xs font-semibold text-slate-500 mb-2">Original Image</p>
              <div className="rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center max-h-72 overflow-hidden">
                <img src={originalPreview} alt="Original" className="max-h-64 object-contain rounded" />
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <p className="text-xs font-semibold text-slate-500 mb-2">Optimized Output</p>
              <div className="rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center max-h-72 overflow-hidden">
                {compressedUrl && (
                  <img src={compressedUrl} alt="Compressed" className="max-h-64 object-contain rounded" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
