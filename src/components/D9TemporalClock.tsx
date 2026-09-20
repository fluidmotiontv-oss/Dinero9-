import React, { useState, useEffect } from 'react';
import { calculateDragon9Time, formatGregorianTime } from '../utils/dragon9Time';
import { Dragon9TimeState } from '../types';
import { Clock, Zap, Shield, Globe } from 'lucide-react';

export const D9TemporalClock: React.FC = () => {
  const [timeState, setTimeState] = useState<Dragon9TimeState>(calculateDragon9Time());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeState(calculateDragon9Time(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { d9Hours, d9Minutes, d9Seconds, currentHourProgress, epochCycle, currentGregorian } = timeState;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div id="d9-temporal-clock" className="w-full bg-[#0C1019] border-b border-slate-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between gap-4 select-none">
      {/* Left: Branding & Core Metric */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
          <span className="font-cinzel font-bold text-sm">D9</span>
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-cinzel font-bold text-slate-100 tracking-wider text-sm">
              DRAGON 9 TEMPORAL CLOCK
            </span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              54m/h SYNC
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <span>Cycle #{epochCycle}</span>
            <span>•</span>
            <span className="text-amber-300/90 font-medium">1,440m ⟷ 26.666h</span>
          </div>
        </div>
      </div>

      {/* Center: Live Harmonic D9 Time Display */}
      <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-1.5 shadow-inner">
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">D9 Harmonic Time</span>
          <div className="flex items-baseline gap-1 font-mono-code font-bold text-lg text-cyan-300 tracking-wider">
            <span className="text-xl text-white">{pad(d9Hours)}</span>
            <span className="text-cyan-400 animate-pulse">:</span>
            <span className="text-xl text-white">{pad(d9Minutes)}</span>
            <span className="text-cyan-400 animate-pulse">:</span>
            <span className="text-sm text-amber-400">{pad(d9Seconds)}</span>
          </div>
        </div>

        {/* 54-Minute Hour Progress Bar */}
        <div className="w-28 sm:w-36 flex flex-col gap-1">
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Subdivision</span>
            <span className="text-cyan-400">{Math.round(currentHourProgress * 100)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 transition-all duration-300"
              style={{ width: `${currentHourProgress * 100}%` }}
            />
          </div>
          <span className="text-[9px] font-mono text-slate-500 text-right">
            {d9Minutes}/54 min
          </span>
        </div>
      </div>

      {/* Right: Valuation & Gregorian Cross-Reference */}
      <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">Gregorian UTC:</span>
          <span className="text-slate-200">{formatGregorianTime(currentGregorian)}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>1 D9 = 54 Min Fluid Flow</span>
        </div>
      </div>
    </div>
  );
};
