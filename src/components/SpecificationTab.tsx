import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, Compass, Sparkles, Layers, Cpu, Eye } from 'lucide-react';

export const SpecificationTab: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const fullSpecMarkdown = `# DENIRO 9 (D9) DIGITAL-HOLOGRAPHIC CURRENCY SUITE
## Comprehensive Architectural & Geometric Specification
**Ecosystem:** Dragon 9 Temporal Framework (54-Minute Harmonic Hours · 26.666 Cycles/Day · 1,440 Minute Solar Equivalence)
**Asset Codename:** D9-CURRENCY-OCTA-POLY-009
**Status:** Canonical Sovereign Specification // Version 2.4.0

---

### 1. SYSTEM OVERVIEW & ECONOMIC PHILOSOPHY
Deniro 9 (D9) represents the first physical-digital hybrid currency engineered not to measure debt, fiat inflation, or resource extraction, but the fluid motion of time itself.
- **Harmonic Redistribution:** 1,440 Earth minutes reallocated into 26.666 hours of exactly 54 standard minutes each.
- **Denomination Valuation:** 1.00 D9 = 1 Harmonic Focus Hour (54 Standard Earth Minutes of focused fluid human/agent creative energy).
- **Physical-Digital Dualism:** A physical tactile banknote-glass substrate that docks magnetically with a floating, decentralized octagonal cryptographic coin.

---

### 2. VISUAL & GEOMETRIC SPECIFICATION

#### 2.1 Dual-Layer Artifact Form Factor
- **Substrate A (Banknote Core):** Transparent, biaxially-oriented fluoropolymer glass substrate. Dimensions: 156.0 mm × 70.0 mm × 0.45 mm (Aspect ratio 2.228:1, rectified with sacred octagonal geometry).
- **Substrate B (Central Gimbal Well):** A laser-machined circular aperture of 48.0 mm diameter flanked by an octagonal neodymium magnetic containment ring.
- **Artifact C (Floating Octagonal Coin):** Regular D8 octagonal prism (diameter 44.0 mm, thickness 3.2 mm, 45° chamfered perimeter) levitating weightlessly inside the aperture in a continuous Bernoulli Lemniscate precession.

#### 2.2 Geometry & Mathematical Subdivisions
- **Radial Symmetry:** 8 primary facets representing the octagonal foundation of stability and quantum directionality.
- **Temporal Graduation:** 54 precision micro-laser radial engravings around the outer perimeter representing the 54 minutes of each Dragon 9 hour.
- **Subdivision Indices:**
  - 9-Minute Epoch Markers: Emphasized with high-relief 24k gold inlay.
  - 18-Minute Tiers: Cyan luminescent micro-nodes (472 nm).
  - 27-Minute Meridian: Half-hour harmonic phase reversal gate.
- **Guilloche Security Waveforms:** Continuous non-repeating Lissajous interference curves generated from the equation:
  x = A · sin(54·t) + B · cos(9·t),  y = C · cos(26.666·t) + D · sin(t).

---

### 3. MATERIALITY & OPTICAL ATTRIBUTES

| Component | Material Composition | Optical / Physical Properties | Functional Purpose |
| :--- | :--- | :--- | :--- |
| **Banknote Substrate** | High-Purity Fluorinated Optic Polymer + SiO2 Silicate | IOR: 1.524, Transmission: 93.5%, Roughness: 0.045, Abbe: 58.2 | Crystal transparency, ballistic scratch resistance |
| **Octagonal Coin** | Sintered Titanomagnetite (Fe2TiO4) Dark Slate Alloy | Density: 5.18 g/cm³, Metalness: 0.94, Roughness: 0.28, Anisotropy: 0.85 | Superconducting magnetic lock, obsidian aesthetic |
| **Holographic Foil** | Multi-layer Photonic Diffraction Grating (1200 lines/mm) | Peak Reflectance: 88%, Angular dispersion: 470nm to 590nm | Angular-dependent color shift prevents counterfeiting |
| **Waveguides** | Thin-Film Electroluminescent Phosphor Tracks | Luminance: 2400 nits, Wavelengths: 472nm (Cyan) & 589nm (Gold) | Real-time visual synchronization with temporal pulse |

---

### 4. BRANDING, EMBOSSING & SECURITY TYPOGRAPHY
- **Primary Wordmark:** "DENIRO 9" rendered in custom high-contrast geometric serif typography (Cinzel Roman variant), embossed with 80-micron raised tactile relief.
- **Sigil Crest:** Dragon 9 Ouroboros lemniscate emblem—an 8-sided ouroboros dragon consuming its tail along an infinity loop, laser-etched into the coin's core.
- **Micro-Print Security Bands:**
  - Top margin: "SOVEREIGN DRAGON 9 TEMPORAL FRAMEWORK · 54-MINUTE HARMONIC HOUR · 26.666 CYCLE/DAY"
  - Bottom margin: "REPRESENTING THE FLUID MOTION OF THE FUTURE · CRYPTOGRAPHIC VALUE EMBODIED IN TIME"

---

### 5. LIGHTING & RENDERING ENVIRONMENT (UNREAL ENGINE 5 & WEBGL)
- **Render Engine Standard:** Unreal Engine 5.4 Lumen Global Illumination + Nanite Subsurface Scatter Profile.
- **Key Light:** 3500K warm solar gold spotlight (Intensity: 120,000 lux), casting sharp anisotropic specular streaks across the brushed coin chamfers.
- **Rim Light:** 470nm pure cyan laser flood at 135° opposing angle, picking up the translucent edges of the polymer-glass core.
- **Volumetric Atmosphere:** Clean, futuristic sovereign mesh node sanctuary; low-density Rayleigh scattering with floating gold and cyan data embers.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullSpecMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="flex flex-col gap-6 text-slate-300">
      {/* Header with Quick Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#0F141F] border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-cinzel font-bold text-white tracking-wide">
              Deniro 9 Architectural Specification
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Form Factor · Geometric Subdivisions · Optical Materiality · UE5 Environment
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 transition-all text-xs font-mono font-medium shadow-[0_0_15px_rgba(0,240,255,0.15)]"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Specification Copied!' : 'Copy Full Spec (Markdown)'}</span>
        </button>
      </div>

      {/* Grid of Key Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Layers className="w-4 h-4" /> Dual-Layer Form Factor
          </div>
          <div className="text-xl font-cinzel font-bold text-white">Banknote + Coin</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            156mm × 70mm transparent polymer-glass core intersected by a floating 44mm octagonal coin in a perpetual lemniscate loop.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider">
            <Compass className="w-4 h-4" /> Sacred Geometry
          </div>
          <div className="text-xl font-cinzel font-bold text-white">8-Fold Octagonal</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Silver Ratio geometry (1+√2) mapping 54-minute temporal subdivisions with micro-engraved 9-minute epoch nodes.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Optical Materiality
          </div>
          <div className="text-xl font-cinzel font-bold text-white">Titanomagnetite</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sintered Fe2TiO4 slate dark alloy with cyan (472nm) and gold (589nm) photonics + 1200 lines/mm holographic dispersion.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-4 h-4" /> Temporal Mechanics
          </div>
          <div className="text-xl font-cinzel font-bold text-white">54m / 26.66h</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            1,440 solar minutes redistributed into 26.666 cycles. 1 D9 unit equals 1 hour of sovereign fluid human creative focus.
          </p>
        </div>
      </div>

      {/* Deep Specification Breakdown */}
      <div className="space-y-6 bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
        <section className="space-y-3">
          <h3 className="text-base font-cinzel font-bold text-cyan-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            1. Form Factor & Layer Integration Architecture
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            The Deniro 9 physical-digital currency is a dual-tier artifact engineered to bridge sovereign physical bearer possession with digital-holographic state persistence. The structural foundation consists of an ultra-pure fluorinated quartz polymer plate (<span className="text-cyan-300 font-mono">156.0 mm × 70.0 mm × 0.45 mm</span>). At the precise optical center of the banknote sits an octagonal magnetic aperture ring. Within this aperture, a solid <span className="text-amber-300 font-mono">titanomagnetite metallic coin</span> hovers in non-contact magnetic suspension.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-cinzel font-bold text-amber-300 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            2. Temporal Coordinate Engravings (54-Minute Subdivisions)
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Unlike conventional currency which carries arbitrary monarchic portraits or institutional emblems, every surface marking on Deniro 9 serves an optical-temporal function:
          </p>
          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1.5 pl-2 font-mono">
            <li><span className="text-cyan-400 font-semibold">54 Perimeter Ticks:</span> Precision laser-ablated micro-ticks corresponding to the 54 minutes of each Dragon 9 hour.</li>
            <li><span className="text-amber-400 font-semibold">9 Major Epoch Quadrants:</span> Every 6th tick features high-relief gold micro-nodes (6m, 12m, 18m, 24m, 30m, 36m, 42m, 48m, 54m).</li>
            <li><span className="text-purple-400 font-semibold">Guilloche Mathematical Waveforms:</span> High-security mathematical spirograph curves whose wave frequencies encode the 1,440-minute day harmonic ratio (1440/54 = 80/3 = 26.666...).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-cinzel font-bold text-purple-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            3. Materiality & Shader Physics Specifications
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-950/60 text-slate-300">
                  <th className="p-3">Layer Substrate</th>
                  <th className="p-3">Material Grade</th>
                  <th className="p-3">IOR & Transmission</th>
                  <th className="p-3">Roughness & Specular</th>
                  <th className="p-3">Color Wavelength</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-cyan-300">Polymer Core</td>
                  <td className="p-3">Fluorinated Biaxially-Oriented Quartz</td>
                  <td className="p-3">IOR: 1.524 / Trans: 93.5%</td>
                  <td className="p-3">Roughness: 0.045</td>
                  <td className="p-3">Broadband Optic Clear</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-slate-200">Octagonal Coin</td>
                  <td className="p-3">Sintered Titanomagnetite Alloy (Fe2TiO4)</td>
                  <td className="p-3">Metalness: 0.94 / Opaque</td>
                  <td className="p-3">Roughness: 0.28 (Aniso 0.85)</td>
                  <td className="p-3">Obsidian Dark Slate (#151921)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-purple-300">Hologram Foil</td>
                  <td className="p-3">1200 lines/mm Diffraction Grating</td>
                  <td className="p-3">Dispersion: 0.042 Abbe: 58.2</td>
                  <td className="p-3">Reflective Peak: 88%</td>
                  <td className="p-3">Angular Gradient (470nm - 590nm)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-amber-300">Photonic Bus</td>
                  <td className="p-3">Electroluminescent Phosphor Tracks</td>
                  <td className="p-3">Luminance: 2400 nits</td>
                  <td className="p-3">Internal Waveguide Emissive</td>
                  <td className="p-3">472nm (Cyan) / 589nm (Gold)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-cinzel font-bold text-emerald-300 flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            4. Unreal Engine 5 Cinematic Render Setup
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            In Unreal Engine 5.4, the scene is lit using Lumen Hardware Ray Tracing with Subsurface Profile shading on the polymer banknote. An anamorphic cine-camera with 50mm Prime lens at f/2.8 captures optical caustics projected onto the floor plane. Ambient dark node server racks flank the backdrop with subtle atmospheric fog (ExponentialHeightFog density 0.02, extinction 0.15), conveying a clean sovereign mesh node sanctuary free from centralized clutter.
          </p>
        </section>
      </div>
    </div>
  );
};
