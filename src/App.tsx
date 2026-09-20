import React, { useState } from 'react';
import { D9Canvas3D } from './components/D9Canvas3D';
import { D9TemporalClock } from './components/D9TemporalClock';
import { D9Controls } from './components/D9Controls';
import { SpecificationTab } from './components/SpecificationTab';
import { PromptsTab } from './components/PromptsTab';
import { JsonManifestTab } from './components/JsonManifestTab';
import { MotionChoreographyTab } from './components/MotionChoreographyTab';
import { MediaScriptTab } from './components/MediaScriptTab';
import { WebGLShaderUniforms } from './types';
import {
  Compass,
  Sparkles,
  FileCode,
  Activity,
  Video,
  Maximize2,
  Minimize2,
  Layers,
  ChevronDown,
} from 'lucide-react';

const INITIAL_UNIFORMS: WebGLShaderUniforms = {
  u_time: 0,
  u_glassTransmission: 0.94,
  u_glassRoughness: 0.05,
  u_glassIOR: 1.52,
  u_iridescenceIntensity: 1.45,
  u_dispersionFactor: 0.042,
  u_temporalPhase: 0.0,
  u_cyanGlowIntensity: 2.2,
  u_goldGlowIntensity: 1.6,
  u_explodedDistance: 0.0,
  u_wireframeMode: false,
  u_rotationSpeed: 1.0,
  u_infinityPrecessionRate: 0.85,
};

type ActiveTab = 'spec' | 'prompts' | 'manifest' | 'choreography' | 'media';

export default function App() {
  const [uniforms, setUniforms] = useState<WebGLShaderUniforms>(INITIAL_UNIFORMS);
  const [viewPreset, setViewPreset] = useState<'combined' | 'coin' | 'note' | 'exploded'>('combined');
  const [activeTab, setActiveTab] = useState<ActiveTab>('spec');
  const [isPaused, setIsPaused] = useState(false);
  const [is3DExpanded, setIs3DExpanded] = useState(false);

  const handleUniformChange = <K extends keyof WebGLShaderUniforms>(
    key: K,
    value: WebGLShaderUniforms[K]
  ) => {
    setUniforms((prev) => ({
      ...prev,
      [key]: value,
      // If user drags exploded slider, switch to exploded preset mode
      ...(key === 'u_explodedDistance' && (value as number) > 0.05
        ? { u_explodedDistance: value as number }
        : {}),
    }));
  };

  const handleSelectPreset = (preset: 'combined' | 'coin' | 'note' | 'exploded') => {
    setViewPreset(preset);
    if (preset === 'exploded') {
      setUniforms((prev) => ({ ...prev, u_explodedDistance: 1.2 }));
    } else {
      setUniforms((prev) => ({ ...prev, u_explodedDistance: 0.0 }));
    }
  };

  const handleResetUniforms = () => {
    setUniforms(INITIAL_UNIFORMS);
    setViewPreset('combined');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080B10] text-[#E2E8F0]">
      {/* 1. Global Synchronized Time & Valuation Header */}
      <D9TemporalClock />

      {/* 2. Main Workstation Area */}
      <main className="flex-1 flex flex-col w-full max-w-[1600px] mx-auto p-3 sm:p-5 gap-5">
        {/* Top Header Card */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#0D121B] border border-slate-800/90 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-amber-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-cinzel font-bold text-xl shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              D9
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-cinzel font-bold text-white tracking-wider">
                  DENIRO 9 (D9)
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
                  Sovereign Currency Suite
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Dragon 9 Temporal Framework · Dual-Layer Digital-Holographic Hybrid · 54-Minute Focus Unit
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-300 relative z-10">
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Polymer Glass Core</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Titanomagnetite D8</span>
            </div>
            <div className="hidden sm:flex px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Bernoulli Lemniscate</span>
            </div>
          </div>
        </div>

        {/* 3. Interactive 3D WebGL Viewport Container */}
        <section
          aria-label="3D WebGL Interactive Viewport"
          className={`relative rounded-2xl bg-[#090D15] border border-slate-800 overflow-hidden shadow-2xl transition-all duration-300 ${
            is3DExpanded ? 'h-[750px]' : 'h-[500px] sm:h-[560px]'
          }`}
        >
          {/* Viewport Top Right Actions */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => setIs3DExpanded(!is3DExpanded)}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 backdrop-blur transition-all"
              title={is3DExpanded ? 'Restore Standard Height' : 'Expand 3D Viewport'}
            >
              {is3DExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* 3D Canvas */}
          <D9Canvas3D
            uniforms={uniforms}
            viewPreset={viewPreset}
            isPaused={isPaused}
          />

          {/* Bottom Floating Shader Controls */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <D9Controls
              uniforms={uniforms}
              onUniformChange={handleUniformChange}
              viewPreset={viewPreset}
              onSelectPreset={handleSelectPreset}
              isPaused={isPaused}
              onTogglePause={() => setIsPaused(!isPaused)}
              onResetUniforms={handleResetUniforms}
            />
          </div>
        </section>

        {/* 4. Architectural Deliverables & Content Suite (Tabbed View) */}
        <section className="flex flex-col gap-4">
          {/* Navigation Bar for Deliverable Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="tab-spec"
                onClick={() => setActiveTab('spec')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                  activeTab === 'spec'
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(0,240,255,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Architectural Spec</span>
              </button>

              <button
                id="tab-prompts"
                onClick={() => setActiveTab('prompts')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                  activeTab === 'prompts'
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(0,240,255,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Visual AI Prompts</span>
              </button>

              <button
                id="tab-manifest"
                onClick={() => setActiveTab('manifest')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                  activeTab === 'manifest'
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(0,240,255,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <FileCode className="w-4 h-4" />
                <span>JSON Manifest & WebGL</span>
              </button>

              <button
                id="tab-choreography"
                onClick={() => setActiveTab('choreography')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                  activeTab === 'choreography'
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(0,240,255,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Motion Choreography</span>
              </button>

              <button
                id="tab-media"
                onClick={() => setActiveTab('media')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                  activeTab === 'media'
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(0,240,255,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Media & Video Scripts</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-500">
              Protocol: Dragon 9 v2.4.0
            </span>
          </div>

          {/* Active Tab Content Panel */}
          <div className="pb-12">
            {activeTab === 'spec' && <SpecificationTab />}
            {activeTab === 'prompts' && <PromptsTab />}
            {activeTab === 'manifest' && <JsonManifestTab />}
            {activeTab === 'choreography' && <MotionChoreographyTab />}
            {activeTab === 'media' && <MediaScriptTab />}
          </div>
        </section>
      </main>
    </div>
  );
}
