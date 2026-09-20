import React, { useState } from 'react';
import { MEDIA_PRODUCTION_SCRIPT, EBOOK_STOREFRONT_PACKAGE } from '../data/d9SpecificationData';
import { Video, BookOpen, ShoppingBag, Copy, Check, Sparkles, Mic, FileText } from 'lucide-react';

export const MediaScriptTab: React.FC = () => {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedStorefront, setCopiedStorefront] = useState(false);

  const handleCopyScript = () => {
    const fullScript = `TITLE: ${MEDIA_PRODUCTION_SCRIPT.title}
FORMAT: ${MEDIA_PRODUCTION_SCRIPT.format}
RUNTIME: ${MEDIA_PRODUCTION_SCRIPT.runtime}

${MEDIA_PRODUCTION_SCRIPT.scenes.map((s) => `[${s.timestamp}]
${s.audioCue}
${s.visualCue}
VOICEOVER: "${s.voiceover}"
`).join('\n')}
`;
    navigator.clipboard.writeText(fullScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleCopyStorefront = () => {
    const copyText = `E-BOOK PACKAGING & STOREFRONT COPY
TITLE: ${EBOOK_STOREFRONT_PACKAGE.bookTitle}
SUBTITLE: ${EBOOK_STOREFRONT_PACKAGE.subtitle}
PRICING: ${EBOOK_STOREFRONT_PACKAGE.pricingStrategy.recommendedPriceUSD} (${EBOOK_STOREFRONT_PACKAGE.pricingStrategy.d9DenominationPrice})

CHAPTER BREAKDOWN:
${EBOOK_STOREFRONT_PACKAGE.chapterBreakdown.map((c) => `${c.number}. ${c.title} - ${c.summary}`).join('\n')}

KEY BENEFITS:
${EBOOK_STOREFRONT_PACKAGE.storefrontBullets.map((b) => `• ${b}`).join('\n')}
`;
    navigator.clipboard.writeText(copyText);
    setCopiedStorefront(true);
    setTimeout(() => setCopiedStorefront(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 text-slate-300">
      {/* 1. Video Voiceover Script */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#0F141F] border border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
              <Video className="w-4 h-4" /> Media Architect Production Script
            </div>
            <h2 className="text-xl font-cinzel font-bold text-white tracking-wide mt-1">
              Cinematic Voiceover & Audio/Visual Direction Script
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Structured 60-second video script with atmospheric cues for screen capture & voice synthesis.
            </p>
          </div>

          <button
            onClick={handleCopyScript}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 transition-all text-xs font-mono font-medium"
          >
            {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedScript ? 'Script Copied!' : 'Copy Video Script'}</span>
          </button>
        </div>

        {/* Script Scene Timeline */}
        <div className="space-y-4">
          {MEDIA_PRODUCTION_SCRIPT.scenes.map((scene, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all flex flex-col gap-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-semibold text-cyan-400">
                  Scene #{idx + 1} // {scene.timestamp}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Broadcast Spec
                </span>
              </div>

              {/* Audio Cue */}
              <div className="text-xs font-mono text-amber-300/90 bg-amber-950/20 border border-amber-500/20 px-3 py-2 rounded-lg">
                {scene.audioCue}
              </div>

              {/* Visual Cue */}
              <div className="text-xs font-mono text-cyan-300/90 bg-cyan-950/20 border border-cyan-500/20 px-3 py-2 rounded-lg">
                {scene.visualCue}
              </div>

              {/* Voiceover Delivery */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1 flex items-center gap-1.5">
                  <Mic className="w-3 h-3 text-emerald-400" /> Voiceover Actor Delivery:
                </span>
                <p className="text-sm font-sans italic text-slate-100 font-medium leading-relaxed">
                  "{scene.voiceover}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. E-Book Packaging & Storefront Copy */}
      <div className="flex flex-col gap-4 pt-4 border-t border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#0F141F] border border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest">
              <BookOpen className="w-4 h-4" /> Digital Content Producer Suite
            </div>
            <h2 className="text-xl font-cinzel font-bold text-white tracking-wide mt-1">
              E-Book Packaging & High-Converting Storefront Copy
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Ready-to-publish digital package for Gumroad, Payhip, and sovereign store distribution.
            </p>
          </div>

          <button
            onClick={handleCopyStorefront}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 transition-all text-xs font-mono font-medium"
          >
            {copiedStorefront ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedStorefront ? 'Storefront Copy Copied!' : 'Copy Storefront Pack'}</span>
          </button>
        </div>

        {/* Title, Subtitle, Pricing Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-2">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              Official Title & Subtitle
            </span>
            <h3 className="text-lg font-cinzel font-bold text-white">
              {EBOOK_STOREFRONT_PACKAGE.bookTitle}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {EBOOK_STOREFRONT_PACKAGE.subtitle}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                Pricing Strategy
              </span>
              <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
                {EBOOK_STOREFRONT_PACKAGE.pricingStrategy.recommendedPriceUSD}
              </div>
              <div className="text-xs font-mono text-slate-400">
                or {EBOOK_STOREFRONT_PACKAGE.pricingStrategy.d9DenominationPrice}
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-300 border-t border-amber-500/20 pt-2">
              {EBOOK_STOREFRONT_PACKAGE.pricingStrategy.payhipBundleOption}
            </p>
          </div>
        </div>

        {/* Chapter Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col gap-4">
          <h4 className="text-sm font-cinzel font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" /> Curated Chapter Architecture
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {EBOOK_STOREFRONT_PACKAGE.chapterBreakdown.map((ch) => (
              <div key={ch.number} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">CH. {ch.number}</span>
                </div>
                <div className="text-xs font-cinzel font-bold text-slate-200">{ch.title}</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">{ch.summary}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Storefront High-Converting Bullet Points */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col gap-3">
          <h4 className="text-sm font-cinzel font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-emerald-400" /> High-Converting Storefront Benefits
          </h4>
          <ul className="space-y-2">
            {EBOOK_STOREFRONT_PACKAGE.storefrontBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
