import React, { useState } from 'react';
import { PROMPTS_LIST } from '../data/d9SpecificationData';
import { PromptItem } from '../types';
import { Copy, Check, Sparkles, Sliders, Camera, Sun, Layers } from 'lucide-react';

export const PromptsTab: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = activeFilter === 'all'
    ? PROMPTS_LIST
    : PROMPTS_LIST.filter((p) => p.category === activeFilter);

  return (
    <div className="flex flex-col gap-6 text-slate-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#0F141F] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> AI Visual Generation Suite
          </div>
          <h2 className="text-xl font-cinzel font-bold text-white tracking-wide mt-1">
            Photorealistic Asset Prompts (Midjourney v6.1 & Imagen 3)
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Calibrated for 8K photorealism, ray-traced caustics, and macro optical textures.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
          {['all', 'combined', 'coin', 'note', 'environment', 'exploded'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                activeFilter === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Cards */}
      <div className="space-y-6">
        {filteredPrompts.map((prompt: PromptItem) => (
          <div
            key={prompt.id}
            id={prompt.id}
            className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col gap-4 shadow-lg"
          >
            {/* Prompt Card Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  {prompt.category} asset
                </span>
                <h3 className="text-lg font-cinzel font-bold text-white tracking-wide mt-1">
                  {prompt.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {prompt.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(prompt.midjourneyPrompt, `${prompt.id}-mj`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 text-xs font-mono font-medium transition-all"
                >
                  {copiedId === `${prompt.id}-mj` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === `${prompt.id}-mj` ? 'Copied MJ!' : 'Copy Midjourney'}</span>
                </button>
                <button
                  onClick={() => handleCopy(prompt.imagenPrompt, `${prompt.id}-im`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 text-xs font-mono font-medium transition-all"
                >
                  {copiedId === `${prompt.id}-im` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === `${prompt.id}-im` ? 'Copied Imagen!' : 'Copy Imagen 3'}</span>
                </button>
              </div>
            </div>

            {/* Midjourney Prompt Block */}
            <div className="flex flex-col gap-1.5 bg-[#0A0E17] p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <span className="font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Midjourney v6.1 Prompt
                </span>
                <span className="text-[10px] text-slate-500">Includes parameters & raw style flag</span>
              </div>
              <p className="text-xs font-mono text-slate-200 leading-relaxed select-all">
                {prompt.midjourneyPrompt}
              </p>
            </div>

            {/* Imagen 3 Prompt Block */}
            <div className="flex flex-col gap-1.5 bg-[#0A0E17] p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                <span className="font-semibold flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" /> Google Imagen 3 Prompt
                </span>
                <span className="text-[10px] text-slate-500">Optimized for photorealistic macro optics</span>
              </div>
              <p className="text-xs font-mono text-slate-200 leading-relaxed select-all">
                {prompt.imagenPrompt}
              </p>
            </div>

            {/* Photography & Lighting Setup Spec */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
              <div className="flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-400">Optics:</span>
                <span className="text-slate-200">{prompt.focalLength}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400">Aspect Ratio:</span>
                <span className="text-slate-200">{prompt.aspectRatio}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-slate-400">Lighting:</span>
                <span className="text-slate-300 truncate" title={prompt.lightingSetup}>
                  {prompt.lightingSetup}
                </span>
              </div>
            </div>

            {/* Negative Prompt Recommendation */}
            {prompt.negativePrompt && (
              <div className="text-[11px] font-mono text-slate-500 bg-slate-950/20 px-3 py-1.5 rounded-lg border border-slate-800/40">
                <span className="text-rose-400 font-semibold">Recommended Negative Prompt: </span>
                <span>{prompt.negativePrompt}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
