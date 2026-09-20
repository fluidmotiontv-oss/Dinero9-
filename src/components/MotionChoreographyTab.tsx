import React, { useState } from 'react';
import { MOTION_CHOREOGRAPHY_DATA } from '../data/d9SpecificationData';
import { Activity, Zap, Play, Volume2, Compass, Waves, Check, Copy } from 'lucide-react';

export const MotionChoreographyTab: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyNotes = () => {
    const notes = `MOTION CHOREOGRAPHY & KINETIC PHYSICS SPECIFICATION: DENIRO 9
${MOTION_CHOREOGRAPHY_DATA.overview}

${MOTION_CHOREOGRAPHY_DATA.phases.map((p, i) => `[${p.name}]
Duration: ${p.duration}
Formula: ${p.formula}
Physics: ${p.physics}
Visual: ${p.visualCues}
`).join('\n')}

AUDIO/SOUND DESIGN CUE:
${MOTION_CHOREOGRAPHY_DATA.soundDesignCue}
`;
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 text-slate-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#0F141F] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <Activity className="w-4 h-4" /> Kinetic Physics & Animation Architecture
          </div>
          <h2 className="text-xl font-cinzel font-bold text-white tracking-wide mt-1">
            Motion Choreography: Perpetual Two-Phase Infinity Loop
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Bernoulli Lemniscate orbital trajectory coupled with dual-axis gyroscopic precession.
          </p>
        </div>

        <button
          onClick={handleCopyNotes}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 transition-all text-xs font-mono font-medium"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Choreography Notes Copied!' : 'Copy Choreography Spec'}</span>
        </button>
      </div>

      {/* Physics Overview Card */}
      <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
          <Zap className="w-4 h-4" /> Kinetic Framework Overview
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">
          {MOTION_CHOREOGRAPHY_DATA.overview}
        </p>
      </div>

      {/* Motion Phases */}
      <div className="space-y-4">
        {MOTION_CHOREOGRAPHY_DATA.phases.map((phase, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex flex-col gap-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-cinzel font-bold text-cyan-300">
                {phase.name}
              </h3>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                Harmonic: {phase.duration}
              </span>
            </div>

            {/* Formula Block */}
            <div className="bg-[#080B12] p-3.5 rounded-xl border border-slate-800/80 font-mono text-xs text-amber-300 flex items-center justify-between">
              <span className="text-slate-400">Parametric Formula:</span>
              <span className="font-mono-code font-bold tracking-wider">{phase.formula}</span>
            </div>

            {/* Physics Description */}
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="text-slate-400 font-semibold font-mono uppercase tracking-wider block mb-1">
                Kinetic Mechanics:
              </span>
              {phase.physics}
            </div>

            {/* Visual Cues */}
            <div className="text-xs text-cyan-200/90 leading-relaxed bg-cyan-950/20 border border-cyan-500/20 p-3 rounded-xl">
              <span className="text-cyan-400 font-semibold font-mono uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5" /> Optical Cue Behavior:
              </span>
              {phase.visualCues}
            </div>
          </div>
        ))}
      </div>

      {/* Sound Design & Acoustic Signature */}
      <div className="p-6 rounded-2xl bg-[#0E1524] border border-cyan-500/30 flex flex-col gap-3 shadow-[0_0_20px_rgba(0,240,255,0.08)]">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
          <Volume2 className="w-4 h-4 text-cyan-400" /> Acoustic Signature & Sound Design Cue
        </div>
        <p className="text-xs font-mono text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          {MOTION_CHOREOGRAPHY_DATA.soundDesignCue}
        </p>
      </div>
    </div>
  );
};
