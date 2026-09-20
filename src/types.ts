export interface Dragon9TimeState {
  currentGregorian: Date;
  d9Hours: number; // 0 to 26
  d9Minutes: number; // 0 to 53 (54-minute hour)
  d9Seconds: number; // 0 to 53 (54-second subdivision)
  totalDayProgress: number; // 0 to 1
  currentHourProgress: number; // 0 to 1 (progress through current 54 min)
  epochCycle: number;
  formattedD9: string;
}

export interface WebGLShaderUniforms {
  u_time: number;
  u_glassTransmission: number;
  u_glassRoughness: number;
  u_glassIOR: number;
  u_iridescenceIntensity: number;
  u_dispersionFactor: number;
  u_temporalPhase: number;
  u_cyanGlowIntensity: number;
  u_goldGlowIntensity: number;
  u_explodedDistance: number;
  u_wireframeMode: boolean;
  u_rotationSpeed: number;
  u_infinityPrecessionRate: number;
}

export interface PromptItem {
  id: string;
  title: string;
  category: 'combined' | 'coin' | 'note' | 'environment' | 'exploded';
  midjourneyPrompt: string;
  imagenPrompt: string;
  parameters: string;
  negativePrompt?: string;
  aspectRatio: string;
  focalLength: string;
  lightingSetup: string;
  description: string;
}

export interface ManifestData {
  protocol: string;
  version: string;
  asset_id: string;
  codename: string;
  temporal_framework: {
    hour_duration_minutes: number;
    hours_per_cycle: number;
    total_cycle_minutes: number;
    seconds_per_subdivision: number;
    temporal_quantum_value: string;
  };
  geometry: {
    banknote_core: {
      form: string;
      dimensions_mm: [number, number, number];
      aspect_ratio: string;
      corner_radius_mm: number;
      aperture_diameter_mm: number;
      aperture_geometry: string;
    };
    octagonal_coin: {
      form: string;
      subdivisions: number;
      circumradius_mm: number;
      inradius_mm: number;
      thickness_mm: number;
      chamfer_angle_deg: number;
      concentric_photonic_rings: number;
    };
  };
  materials: {
    polymer_glass_substrate: {
      type: string;
      ior: number;
      transmission: number;
      roughness: number;
      dispersion_abbe: number;
      thickness_profile: string;
    };
    titanomagnetite_alloy: {
      type: string;
      base_color_hex: string;
      metalness: number;
      roughness: number;
      anisotropy: number;
      surface_treatment: string;
    };
    holographic_diffraction_foil: {
      grating_pitch_lines_per_mm: number;
      color_shift_spectrum: string[];
      reflectivity_peak: number;
      angular_shift_gradient: string;
    };
    photonic_waveguides: {
      wavelength_cyan_nm: number;
      wavelength_gold_nm: number;
      luminance_nits: number;
      pulse_harmonics_hz: number[];
    };
  };
  webgl_shader_pipeline: {
    render_passes: string[];
    uniform_mappings: Record<string, string>;
  };
  motion_mechanics: {
    trajectory: string;
    parametric_formula: string;
    precession_ratio: string;
    phase_lock: string;
  };
}
