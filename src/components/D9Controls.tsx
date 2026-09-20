import React from 'react';
import { WebGLShaderUniforms } from '../types';
import { Layers, Eye, Sparkles, Sliders, Play, Pause, RotateCcw, Box, Compass } from 'lucide-react';

interface D9ControlsProps {
  uniforms: WebGLShaderUniforms;
  onUniformChange: <K extends keyof WebGLShaderUniforms>(key: K, value: WebGLShaderUniforms[K]) => void;
  viewPreset: 'combined' | 'coin' | 'note' | 'exploded';
  onSelectPreset: (preset: 'combined' | 'coin' | 'note' | 'exploded') => void;
  isPaused: boolean;
  onTogglePause: () => void;
  onResetUniforms: () => void;
}

export const D9Controls: React.FC<D9ControlsProps> = ({
  uniforms,
  onUniformChange,
  viewPreset,
  onSelectPreset,
  isPaused,
  onTogglePause,
  onResetUniforms,
}) => {
  return (
    <div id="d9-shader-controls" className="w-full bg-[#0D121D]/90 backdrop-blur-md border-t border-slate-800/80 p-4 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Top Row: Presets & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 px-2 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-cyan-400" /> Presets:
            </span>
            <button
              id="btn-preset-combined"
              onClick={() => onSelectPreset('combined')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                viewPreset === 'combined'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Dual Artifact
            </button>
            <button
              id="btn-preset-coin"
              onClick={() => onSelectPreset('coin')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                viewPreset === 'coin'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Octagonal Coin
            </button>
            <button
              id="btn-preset-note"
              onClick={() => onSelectPreset('note')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                viewPreset === 'note'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Polymer Note
            </button>
            <button
              id="btn-preset-exploded"
              onClick={() => onSelectPreset('exploded')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                viewPreset === 'exploded'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Exploded Schematic
            </button>
          </div>

          {/* Play/Pause, Wireframe & Reset */}
          <div className="flex items-center gap-2">
            <button
              id="btn-toggle-pause"
              onClick={onTogglePause}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:bg-slate-800 transition-colors"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isPaused ? 'Resume Kinetic Loop' : 'Freeze Loop'}</span>
            </button>

            <button
              id="btn-toggle-wireframe"
              onClick={() => onUniformChange('u_wireframeMode', !uniforms.u_wireframeMode)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs font-mono transition-colors ${
                uniforms.u_wireframeMode
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Mesh Wireframe</span>
            </button>

            <button
              id="btn-reset-uniforms"
              onClick={onResetUniforms}
              title="Reset Shader & Physics Parameters"
              className="p-1.5 rounded-md bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-slate-800/60 text-xs font-mono">
          {/* Glass Transmission */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Glass Transmission</span>
              <span className="text-cyan-400">{Math.round(uniforms.u_glassTransmission * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.01"
              value={uniforms.u_glassTransmission}
              onChange={(e) => onUniformChange('u_glassTransmission', parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Holographic Iridescence */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Hologram Dispersion</span>
              <span className="text-amber-400">{uniforms.u_iridescenceIntensity.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="2.0"
              step="0.05"
              value={uniforms.u_iridescenceIntensity}
              onChange={(e) => onUniformChange('u_iridescenceIntensity', parseFloat(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Cyan Photonic Glow */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Cyan Emitter</span>
              <span className="text-cyan-400">{uniforms.u_cyanGlowIntensity.toFixed(1)} Nits</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.5"
              step="0.1"
              value={uniforms.u_cyanGlowIntensity}
              onChange={(e) => onUniformChange('u_cyanGlowIntensity', parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Gold Harmonic Glow */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Gold Photonic</span>
              <span className="text-amber-400">{uniforms.u_goldGlowIntensity.toFixed(1)} Nits</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={uniforms.u_goldGlowIntensity}
              onChange={(e) => onUniformChange('u_goldGlowIntensity', parseFloat(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Infinity Precession Speed */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Infinity Loop Speed</span>
              <span className="text-purple-400">{uniforms.u_rotationSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={uniforms.u_rotationSpeed}
              onChange={(e) => onUniformChange('u_rotationSpeed', parseFloat(e.target.value))}
              className="w-full accent-purple-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Exploded View Offset */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Exploded Offset</span>
              <span className="text-emerald-400">{uniforms.u_explodedDistance.toFixed(2)}m</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="2.5"
              step="0.05"
              value={uniforms.u_explodedDistance}
              onChange={(e) => onUniformChange('u_explodedDistance', parseFloat(e.target.value))}
              className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
