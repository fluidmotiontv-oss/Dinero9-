import React, { useState } from 'react';
import { D9_MANIFEST_DATA } from '../data/d9SpecificationData';
import { Copy, Check, Download, FileCode, Cpu, CheckCircle } from 'lucide-react';

export const JsonManifestTab: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(D9_MANIFEST_DATA, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `deniro9-structural-manifest-v2.4.0.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 text-slate-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#0F141F] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <FileCode className="w-4 h-4" /> 3D Engine & Shader Interface
          </div>
          <h2 className="text-xl font-cinzel font-bold text-white tracking-wide mt-1">
            Structural JSON Manifest & WebGL Parameters
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Standardized parametric schema for Three.js, Babylon.js, WebGL2, and Unreal Engine 5 Nanite pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 transition-all text-xs font-mono font-medium"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'JSON Copied!' : 'Copy JSON Manifest'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 transition-all text-xs font-mono font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download .json</span>
          </button>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
          <div>
            <div className="text-xs font-mono text-slate-400">Shader Uniforms</div>
            <div className="text-sm font-bold text-white font-mono">8 Parametric Maps</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="text-xs font-mono text-slate-400">Schema Validation</div>
            <div className="text-sm font-bold text-white font-mono">Canonical D9 Protocol</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <FileCode className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <div className="text-xs font-mono text-slate-400">Temporal Harmonic</div>
            <div className="text-sm font-bold text-white font-mono">54-Minute Pulse Sync</div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="relative rounded-2xl bg-[#080B11] border border-slate-800 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-slate-300 font-semibold">deniro9-manifest-v2.4.0.json</span>
          </div>
          <span className="text-[11px] text-cyan-400 font-mono">UTF-8 // application/json</span>
        </div>

        <pre className="p-5 text-xs font-mono-code text-cyan-300/90 leading-relaxed overflow-x-auto max-h-[600px] select-all scrollbar-thin">
          <code>{jsonString}</code>
        </pre>
      </div>
    </div>
  );
};
