import { PromptItem, ManifestData } from '../types';

export const D9_MANIFEST_DATA: ManifestData = {
  protocol: "DRAGON_9_TEMPORAL_STANDARDS",
  version: "2.4.0-SOVEREIGN",
  asset_id: "D9-CURRENCY-OCTA-POLY-009",
  codename: "DENIRO 9 PRIMAL ARTIFACT",
  temporal_framework: {
    hour_duration_minutes: 54,
    hours_per_cycle: 26.6666666667,
    total_cycle_minutes: 1440,
    seconds_per_subdivision: 54,
    temporal_quantum_value: "1.000 D9 = 1 Standard Harmonic Fluid Hour (54 Earth Minutes)"
  },
  geometry: {
    banknote_core: {
      form: "Rectangular Biaxially-Oriented Optic Glass-Polymer Substrate",
      dimensions_mm: [156.0, 70.0, 0.45],
      aspect_ratio: "2.228:1 (Sacred Octagonal Harmonic Rectification)",
      corner_radius_mm: 3.5,
      aperture_diameter_mm: 48.0,
      aperture_geometry: "Beveled Circular-Octagonal Magnetic Gimbal Well"
    },
    octagonal_coin: {
      form: "Regular Octagon (D8 Regular Polygon with 45-degree Chamfers)",
      subdivisions: 8,
      circumradius_mm: 22.0,
      inradius_mm: 20.32,
      thickness_mm: 3.2,
      chamfer_angle_deg: 45.0,
      concentric_photonic_rings: 3
    }
  },
  materials: {
    polymer_glass_substrate: {
      type: "High-Purity Fluorinated Optic Polymer with Refractive Quartz Silicate Layer",
      ior: 1.524,
      transmission: 0.935,
      roughness: 0.045,
      dispersion_abbe: 58.2,
      thickness_profile: "Variable 0.35mm core to 0.45mm perimeter lip"
    },
    titanomagnetite_alloy: {
      type: "Sintered Titanomagnetite (Fe2TiO4) Dark Slate Superconducting Alloy",
      base_color_hex: "#151921",
      metalness: 0.94,
      roughness: 0.28,
      anisotropy: 0.85,
      surface_treatment: "Micro-radial brushed lathe finish with PVD diamond-like carbon edge"
    },
    holographic_diffraction_foil: {
      grating_pitch_lines_per_mm: 1200,
      color_shift_spectrum: ["#00F0FF", "#38BDF8", "#A855F7", "#EC4899", "#FFD700"],
      reflectivity_peak: 0.88,
      angular_shift_gradient: "Incident angle theta (0 deg cyan to 60 deg solar gold)"
    },
    photonic_waveguides: {
      wavelength_cyan_nm: 472.0,
      wavelength_gold_nm: 589.3,
      luminance_nits: 2400,
      pulse_harmonics_hz: [0.03086, 0.1851, 1.0] // 54s, 9s, and 1s sub-cycles
    }
  },
  webgl_shader_pipeline: {
    render_passes: [
      "DepthPrePass",
      "GBuffer_Opaque_Coin",
      "Transmission_Refraction_Glass",
      "Holographic_Iridescence_Dispersion",
      "Photonic_Glow_Bloom",
      "Temporal_Particle_Drift"
    ],
    uniform_mappings: {
      "u_time": "Float (seconds elapsed in Dragon 9 sync)",
      "u_refractionRatio": "Float 0.985 (glass-to-air boundary)",
      "u_iridescenceBoost": "Float 1.45 (spectral diffraction coefficient)",
      "u_dispersionFactor": "Float 0.042 (chromatic aberration shift)",
      "u_temporalPhase": "Float 0.0 to 1.0 (54-minute cyclic pulse)",
      "u_cyanGlowIntensity": "Float 1.8 (472nm photonic emitter drive)",
      "u_goldGlowIntensity": "Float 1.2 (589nm harmonic accent)",
      "u_coinNutationMatrix": "Mat4 (Lemniscate precession coordinate transform)"
    }
  },
  motion_mechanics: {
    trajectory: "Perpetual Lemniscate of Bernoulli orbital precession",
    parametric_formula: "x(t) = a * cos(t) / (1 + sin^2(t)); y(t) = a * sin(t)*cos(t) / (1 + sin^2(t))",
    precession_ratio: "54:9 gearless quantum magnetic suspension ratio",
    phase_lock: "Two-phase alternating polarity reversal every 27 temporal minutes"
  }
};

export const PROMPTS_LIST: PromptItem[] = [
  {
    id: "prompt-hero-combined",
    title: "1. Dual-Layer Combined Artifact (Cinematic Hero)",
    category: "combined",
    description: "Full view of the transparent polymer banknote intersected by the floating octagonal titanomagnetite coin locked in its infinity loop.",
    midjourneyPrompt: "A hyper-detailed cinematic studio photograph of the Deniro 9 (D9) physical-digital sovereign currency artifact. A transparent ultra-clear polymer-glass banknote (156mm x 70mm) floats horizontally, intersected at its center by a levitating, spinning octagonal coin made of dark brushed titanomagnetite slate alloy. The octagonal coin emits vibrant luminescent cyan (470nm) laser-etched photonic circuits and warm liquid gold (590nm) accents. Across the translucent polymer banknote are micro-engraved holographic guilloche security waveforms and crisp embossed typography reading 'DENIRO 9' and 'TEMPORAL SYNCHRONIZED VALUE'. Refractive iridescent diffraction foils shimmer across the glass surface with chromatic dispersion. The coin is caught in a perpetual two-phase infinity precession loop. Floating in a dark sovereign mesh node environment with deep charcoal obsidian backdrop and subtle ambient glowing micro-data dust particles. Unreal Engine 5 render style, 8k resolution, ray-traced subsurface scattering, macro camera lens, depth of field --ar 16:9 --v 6.1 --style raw --q 2",
    imagenPrompt: "Macro studio photograph of a futuristic physical-digital currency named Deniro 9. An ultra-thin transparent glass-polymer banknote with beveled corners, floating in zero gravity. In the center aperture of the note, a magnetic octagonal coin forged from brushed dark titanomagnetite metal hovers and rotates smoothly. The coin features glowing cyan photonic circuit inlays and brushed gold temporal markings dividing an hour into 54 subdivisions. The transparent banknote contains intricate holographic security patterns, fluid motion wave vectors, and embossed metallic lettering 'DENIRO 9'. Cinematic volumetric studio rim lighting, soft cyan and golden ray tracing, dark slate minimalist tech background, hyper-detailed textures, photorealistic 8k.",
    parameters: "--ar 16:9 --v 6.1 --style raw --q 2 --s 250",
    negativePrompt: "blurry, low quality, cartoon, 3d render plastic sheen, cheap paper money, fiat currency symbols, dollar sign, euro, distorted text, watermark, oversaturated purple, cluttered background",
    aspectRatio: "16:9",
    focalLength: "85mm Macro f/2.8",
    lightingSetup: "Dual rim lights (Luminescent Cyan & Warm 3200K Gold) + Soft overhead diffused key light with dark flag cutters"
  },
  {
    id: "prompt-coin-macro",
    title: "2. Octagonal Temporal Coin (Macro Surface & Photonics)",
    category: "coin",
    description: "Extreme close-up macro of the 8-sided titanomagnetite coin detailing the 54-minute temporal divisions and concentric photonic channels.",
    midjourneyPrompt: "Extreme macro photograph of an octagonal sovereign temporal coin, forged from dark titanomagnetite slate-black alloy with anisotropic radial brush textures. On the beveled 45-degree chamfer edges, 54 precision micro-laser engravings indicate temporal minutes within the Dragon 9 harmonic hour. Deep concentric octagonal grooves pulse with neon cyan photonics and warm polished gold inlay. In the center hub sits a recessed Dragon 9 ouroboros sigil with micro-machined fluid motion vector curves. Microscopic surface scratches, tactile bevels, optical dispersion along the edge chamfers. Cinematic low-angle macro view, Hasselblad H6D-100c, 120mm macro lens, f/4, shallow depth of field, high dynamic range, isolated on dark velvet carbon background --ar 1:1 --v 6.1 --style raw --q 2",
    imagenPrompt: "Extreme close up shot of a futuristic octagonal currency coin. Material is brushed dark titanomagnetite metal with a matte obsidian finish. The coin has eight distinct sides, engraved with fine geometric clock divisions for a 54-minute temporal system. Embedded micro-channels glow with bright cyan light and inlaid electroplated 24k gold. In the center, an embossed Dragon 9 infinity emblem with metallic luster. Cinematic lighting highlighting the beveled metallic edges and brushed anisotropic reflections, photorealistic 8k macro.",
    parameters: "--ar 1:1 --v 6.1 --style raw --q 2 --s 200",
    negativePrompt: "circular coin, fiat coin, copper penny, cheap plastic, rust, dirt, oversaturation, blur, 3d cartoon",
    aspectRatio: "1:1",
    focalLength: "120mm Macro f/4.0",
    lightingSetup: "Hard cross-polarized grazing light revealing microscopic lathe grooves + internal electroluminescent glow"
  },
  {
    id: "prompt-note-optics",
    title: "3. Holographic Polymer Banknote Core (Optical Dispersion)",
    category: "note",
    description: "Detailed capture of the transparent polymer-glass substrate with optical rainbow dispersion, guilloche wave lines, and tactile embossing.",
    midjourneyPrompt: "Macro studio shot of a transparent polymer-glass high-denomination banknote for 'DENIRO 9'. The substrate is crystal-clear optic-grade glass-polymer with a central circular-octagonal opening. Intricate micro-optic holographic security foils create brilliant prism rainbow chromatic dispersion as light strikes at a 45-degree angle. Ultra-fine Guilloche mathematical wave patterns flow across the surface in luminescent cyan and gold ink. Embossed tactile typography reads 'DENIRO 9' with high-relief micro-lettering and fluid motion equations. Light refracts through the clear glass edges creating caustic patterns on a dark slate surface beneath. Studio lighting, luxury security printing craftsmanship, ray-traced caustics, cinematic hyper-realism --ar 16:9 --v 6.1 --style raw --q 2",
    imagenPrompt: "High-end banknote photography of a transparent polymer glass bill. The banknote is made of optically pure flexible glass with anti-reflective coating. Intricate holographic diffraction strips shift between turquoise cyan, violet, and amber gold. Clean modern typography 'DENIRO 9' embossed in silver-gold foil. Laser-engraved guilloche wave patterns representing fluid time mechanics. A central octagonal aperture is cut cleanly into the glass. Volumetric caustic refractions casting soft prismatic light onto a dark grey backdrop, 8k resolution.",
    parameters: "--ar 16:9 --v 6.1 --style raw --q 2 --s 300",
    negativePrompt: "opaque paper, green dollar, crumples, tears, low resolution, cheap plastic, cartoonish colors",
    aspectRatio: "16:9",
    focalLength: "50mm Tilt-Shift f/5.6",
    lightingSetup: "Collimated laser-line edge backlight to illuminate internal total reflection within polymer substrate"
  },
  {
    id: "prompt-ue5-environment",
    title: "4. Sovereign Mesh Node Environment (UE5 Cinematic Scene)",
    category: "environment",
    description: "Wide shot showing the Deniro 9 artifact floating inside a decentralized futuristic quantum node with data stream particles.",
    midjourneyPrompt: "A cinematic wide establishing shot inside a futuristic sovereign mesh node server sanctuary. In the center of the frame, the Deniro 9 dual-layer holographic currency floats weightless in a glowing cyan magnetic containment field. Floating octagonal coin rotates inside the transparent polymer banknote. In the background, dark monolithic obsidian server pillars with vertical cyan fiber-optic conduit strips pulse softly. Ambient volumetric fog and subtle floating golden particle embers drift through the cool air. Clean minimalist architectural brutalism, Unreal Engine 5 cinematic screenshot, Lumen ray-tracing, volumetric fog, anamorphic lens flare, Blade Runner 2049 aesthetic, masterwork lighting --ar 21:9 --v 6.1 --style raw --q 2",
    imagenPrompt: "Futuristic decentralized vault room with dark charcoal slate walls and minimalist monolithic pillars. Hovering in the center of the room in a magnetic levitation field is the Deniro 9 holographic currency note with its rotating octagonal coin. Volumetric dust motes and gentle light rays pierce the darkness. Subtle cyan and amber LED indicator lights on distant server racks. Cinematic wide shot, anamorphic widescreen 2.39:1 aspect, photorealistic rendering.",
    parameters: "--ar 21:9 --v 6.1 --style raw --q 2 --s 180",
    negativePrompt: "bright sunlight, messy cables, vintage machinery, retro sci-fi, cartoon, cluttered room, noise",
    aspectRatio: "21:9",
    focalLength: "35mm Anamorphic T/2.0",
    lightingSetup: "Volumetric god-rays through atmospheric haze + cold ambient fill (6500K) with warm gold point highlights"
  },
  {
    id: "prompt-exploded-schematic",
    title: "5. Technical Exploded Isometric Blueprint",
    category: "exploded",
    description: "Engineering exploded view separating the front holographic foil, polymer glass core, magnetic gimbal ring, and octagonal coin.",
    midjourneyPrompt: "Technical exploded axonometric architectural diagram of the Deniro 9 digital-holographic currency assembly. Floating separated layers along an isometric diagonal axis: Layer 1: Front refractive optical diffraction foil with guilloche waves. Layer 2: Transparent 0.45mm quartz polymer-glass core with beveled aperture. Layer 3: Magnetic neodymium gimbal stabilization ring. Layer 4: Floating octagonal titanomagnetite coin with 54-minute radial engravings. Layer 5: Rear micro-circuit photonic waveguide layer. Fine laser blueprint measurement lines, cyan callout annotations, high-precision CAD rendering, dark technical grey background, clean Apple hardware presentation style --ar 16:9 --v 6.1 --style raw --q 2",
    imagenPrompt: "Exploded engineering diagram of the Deniro 9 currency artifact. Each component is separated along a central axis: the transparent polymer banknote, the magnetic containment ring, and the floating octagonal metallic coin. Precise geometric lines, subtle dimension callouts, glowing cyan laser wireframes on dark graphite slate background.",
    parameters: "--ar 16:9 --v 6.1 --style raw --q 2 --s 220",
    negativePrompt: "hand drawn, sketch, watercolor, messy handwriting, low-poly wireframe, messy text, dirty background",
    aspectRatio: "16:9",
    focalLength: "90mm Orthographic Projection",
    lightingSetup: "Even technical studio flood with soft drop-shadow pass on blueprint backing plane"
  }
];

export const MOTION_CHOREOGRAPHY_DATA = {
  overview: "The Deniro 9 artifact kinetic system operates under a mathematically coupled, perpetual two-phase infinity loop (Bernoulli Lemniscate precession). It embodies the fluid motion of time where the 54-minute hour replaces the rigid 60-minute construct.",
  phases: [
    {
      name: "Phase 1: Lemniscate Precession (Bernoulli Infinity Trajectory)",
      duration: "54.0 Seconds Base Cycle (Harmonic with 54-Minute Hour)",
      formula: "x(t) = [a · cos(t)] / [1 + sin²(t)],  y(t) = [a · sin(t) · cos(t)] / [1 + sin²(t)]",
      physics: "The octagonal titanomagnetite coin translates through the polymer-glass banknote's central aperture along a true infinity curve. As it crosses the z=0 neutral aperture plane, the magnetic polarity reverses smoothly, generating an optical Doppler chromatic shift in the surrounding diffraction foil.",
      visualCues: "Cyan photonic waveguides brighten to 2400 nits at peak velocity (aperture transit), dropping to 800 nits at the orbital apogees."
    },
    {
      name: "Phase 2: Dual-Axis Gyroscopic Nutation",
      duration: "9.0 Seconds Sub-Harmonic (9-fold Dragon subdivision)",
      formula: "θ_pitch(t) = 15° · sin(ω₁ · t),  ψ_yaw(t) = 45° · cos(ω₂ · t + π/4)",
      physics: "While translating along the lemniscate, the coin precesses along both pitch and yaw axes at a 6:1 gearless ratio. This exposes each of the 8 octagonal faces consecutively to the viewer, catching key light reflections on the 45° chamfers.",
      visualCues: "The brushed anisotropic metal reflection spins radially, producing an iridescent starburst strobe every 1.125 seconds."
    },
    {
      name: "Phase 3: Resonant Holographic Dispersion Wave",
      duration: "1,440 ms (Macro Pulse Synchronization)",
      formula: "λ_dispersion(θ) = d · (sin θ_incident + sin θ_diffracted) = m · λ",
      physics: "The transparent polymer banknote maintains a micro-frequency flexural breathing oscillation (amplitude < 0.2mm). The holographic security foil shifts in color from deep cyan (472nm) through amethyst violet (420nm) to solar gold (589nm).",
      visualCues: "Subsurface caustics project a dancing interference pattern onto the underlying observation surface."
    }
  ],
  soundDesignCue: "Sub-bass 54Hz resonant sine carrier with micro-granular metallic shimmer. At each aperture transit, an acoustic high-frequency crystalline chime (4.86 kHz, harmonic of 54) pings cleanly, signifying a synchronized temporal epoch quantum."
};

export const MEDIA_PRODUCTION_SCRIPT = {
  title: "DENIRO 9: The Quantum of Fluid Time",
  format: "High-Production Cinematic Video Voiceover Script",
  runtime: "60 Seconds (1 Harmonic D9 Minute)",
  targetAudience: "Sovereign Thinkers, Media Architects, Alternative Economic Pioneers",
  scenes: [
    {
      timestamp: "00:00 - 00:08",
      audioCue: "[Audio Cue: Sub-bass 54Hz resonant drone emerges from silence; distant high-frequency crystal resonance]",
      visualCue: "[Visual Cue: Extreme macro shot of brushed dark titanomagnetite alloy. A laser-etched numeral '54' glows with neon cyan photonics. Camera pulls back slowly.]",
      voiceover: "For centuries, you traded your life in arbitrary sixty-minute fragments. But time is not a box to be filled—it is a current to be directed."
    },
    {
      timestamp: "00:08 - 00:22",
      audioCue: "[Audio Cue: Gentle rising whoosh of air through glass; tactile acoustic mechanical click of magnetic suspension]",
      visualCue: "[Visual Cue: The transparent polymer-glass banknote comes into view, floating weightless. The central octagonal coin detaches and begins its smooth Bernoulli lemniscate infinity drift.]",
      voiceover: "Welcome to Deniro 9. The sovereign digital-holographic currency unit of the Dragon 9 temporal architecture. Fifty-four minute hours. Twenty-six point six six cycles per Earth rotation. Perfect harmonic redistribution."
    },
    {
      timestamp: "00:22 - 00:40",
      audioCue: "[Audio Cue: Prismatic audio sweep, stereo binaural panning as the coin precesses]",
      visualCue: "[Visual Cue: Light catches the holographic foil at 45 degrees. Prismatic rainbow dispersion washes across the embossed 'DENIRO 9' typography. Cyan and warm gold photonics pulse in sync with the D9 clock.]",
      voiceover: "Forged in brushed titanomagnetite slate alloy, held within a biaxially-oriented quartz polymer core. Locked in perpetual two-phase infinity precession. Deniro 9 does not measure debt. It measures human creative flow."
    },
    {
      timestamp: "00:40 - 00:54",
      audioCue: "[Audio Cue: Deep resonant chime at 4.86 kHz, signifying epoch confirmation; ambient electronic strings build to harmonic resolution]",
      visualCue: "[Visual Cue: The coin nests perfectly back into the aperture gimbal. The complete dual-layer artifact settles into its hero pose against a dark sovereign mesh node backdrop.]",
      voiceover: "One Deniro 9. One quantum of dedicated focus. Own your rhythm. Reclaim your hours. Step into the fluid motion of the future."
    },
    {
      timestamp: "00:54 - 01:00",
      audioCue: "[Audio Cue: Clean sub-bass fadeout with sustained golden harmonic note]",
      visualCue: "[Visual Cue: Graphic lockup: 'DENIRO 9 // DRAGON 9 ECOSYSTEM'. Dynamic URL and decentralized node identifier pulse gently.]",
      voiceover: "Deniro 9. Time is currency. Fluidity is sovereignty."
    }
  ]
};

export const EBOOK_STOREFRONT_PACKAGE = {
  bookTitle: "THE FLUID CURRENCY: Deniro 9 and the Dragon 9 Temporal Economy",
  subtitle: "Escaping the 60-Minute Cage: How Sovereign Time-Units and Harmonic Holographic Systems Redefine Human Value",
  pricingStrategy: {
    recommendedPriceUSD: "$29.00",
    d9DenominationPrice: "1.00 D9",
    payhipBundleOption: "Includes 3D WebGL interactive artifact viewer, printable holographic blueprint posters (300 DPI), and UE5 cinematic asset pack."
  },
  chapterBreakdown: [
    { number: "01", title: "The 1,440-Minute Problem", summary: "Why the Gregorian 24x60 minute system causes cognitive exhaustion and temporal friction." },
    { number: "02", title: "The Dragon 9 Framework", summary: "The mathematical derivation of 54-minute hours and 26.666 cycles per solar day." },
    { number: "03", title: "Deniro 9 Physical-Digital Architecture", summary: "Engineering the dual-layer polymer glass banknote and the octagonal titanomagnetite coin." },
    { number: "04", title: "Optical Diffraction & Cryptographic Security", summary: "Guilloche mathematics, 1200 lines/mm holographic grating, and tactile high-relief embossing." },
    { number: "05", title: "The Sovereign Node Economy", summary: "Implementing decentralized time-token minting for creators, developers, and autonomous agents." }
  ],
  storefrontBullets: [
    "Complete technical schematics and optical diffraction parameters for the Deniro 9 dual-layer currency.",
    "Mathematical proofs for 54-minute temporal subdivision and fluid productivity synchronization.",
    "Ready-to-use Midjourney & Imagen prompt suites for hyper-realistic 8K asset generation.",
    "Production-grade WebGL shader uniforms and Three.js integration manifests.",
    "Cinematic media voiceover scripts and atmospheric audio-visual production notes."
  ]
};
