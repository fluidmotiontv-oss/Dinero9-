import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { WebGLShaderUniforms } from '../types';

interface D9Canvas3DProps {
  uniforms: WebGLShaderUniforms;
  viewPreset: 'combined' | 'coin' | 'note' | 'exploded';
  onResetView?: () => void;
  isPaused?: boolean;
}

export const D9Canvas3D: React.FC<D9Canvas3DProps> = ({
  uniforms,
  viewPreset,
  isPaused = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coinGroupRef = useRef<THREE.Group | null>(null);
  const noteGroupRef = useRef<THREE.Group | null>(null);
  const gimbalRingRef = useRef<THREE.Mesh | null>(null);
  const cyanLightRef = useRef<THREE.PointLight | null>(null);
  const goldLightRef = useRef<THREE.PointLight | null>(null);
  const glassMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const coinMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const timeRef = useRef<number>(0);

  // Mouse interaction state
  const mouseState = useRef({
    isDown: false,
    prevX: 0,
    prevY: 0,
    targetRotX: 0.25,
    targetRotY: -0.35,
    currRotX: 0.25,
    currRotY: -0.35,
    targetZoom: 6.2,
    currZoom: 6.2,
  });

  // Camera presets map
  const updateCameraPreset = useCallback((preset: 'combined' | 'coin' | 'note' | 'exploded') => {
    const s = mouseState.current;
    if (preset === 'combined') {
      s.targetRotX = 0.22;
      s.targetRotY = -0.35;
      s.targetZoom = 5.8;
    } else if (preset === 'coin') {
      s.targetRotX = 0.35;
      s.targetRotY = 0.45;
      s.targetZoom = 3.2;
    } else if (preset === 'note') {
      s.targetRotX = 0.05;
      s.targetRotY = 0.0;
      s.targetZoom = 4.6;
    } else if (preset === 'exploded') {
      s.targetRotX = 0.45;
      s.targetRotY = -0.65;
      s.targetZoom = 6.8;
    }
  }, []);

  useEffect(() => {
    updateCameraPreset(viewPreset);
  }, [viewPreset, updateCameraPreset]);

  // Create high-resolution procedural banknote texture on offscreen canvas
  const generateBanknoteTextures = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 920; // ~2.228:1 aspect ratio
    const ctx = canvas.getContext('2d');
    if (!ctx) return { map: null, alphaMap: null };

    // Transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const apertureRadius = 240;

    // 1. Subtle polymer substrate tint
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, 'rgba(8, 20, 32, 0.4)');
    bgGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.25)');
    bgGrad.addColorStop(1, 'rgba(8, 20, 32, 0.4)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Guilloche mathematical wave patterns (Spirograph curves)
    ctx.lineWidth = 1.0;
    for (let r = 1; r <= 3; r++) {
      ctx.beginPath();
      ctx.strokeStyle = r === 1 ? 'rgba(0, 240, 255, 0.35)' : r === 2 ? 'rgba(255, 215, 0, 0.3)' : 'rgba(168, 85, 247, 0.25)';
      for (let x = 40; x < w - 40; x += 3) {
        const distFromCenter = Math.hypot(x - cx, 0);
        // Skip over central aperture
        if (distFromCenter < apertureRadius + 30) continue;
        const wave1 = Math.sin(x * 0.015 + r) * 45;
        const wave2 = Math.cos(x * 0.035 - r) * 25;
        const y = cy + wave1 + wave2;
        if (x === 40) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Concentric Guilloche around aperture
    for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
      const rad = apertureRadius + 60 + Math.sin(angle * 18) * 15;
      const x = cx + Math.cos(angle) * rad;
      const y = cy + Math.sin(angle) * rad;
      if (angle === 0) ctx.beginPath();
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
    ctx.stroke();

    // 3. Precision 54-Minute Subdivision Scale around aperture
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '14px monospace';
    for (let m = 0; m < 54; m++) {
      const angle = (m / 54) * Math.PI * 2 - Math.PI / 2;
      const isMajor = m % 6 === 0;
      const isQuarter = m % 9 === 0;
      const innerR = apertureRadius + 15;
      const outerR = apertureRadius + (isQuarter ? 42 : isMajor ? 30 : 20);

      const x1 = cx + Math.cos(angle) * innerR;
      const y1 = cy + Math.sin(angle) * innerR;
      const x2 = cx + Math.cos(angle) * outerR;
      const y2 = cy + Math.sin(angle) * outerR;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isQuarter ? '#FFD700' : isMajor ? '#00F0FF' : 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = isQuarter ? 2.5 : isMajor ? 1.8 : 1.0;
      ctx.stroke();

      if (isQuarter) {
        const textR = outerR + 18;
        const tx = cx + Math.cos(angle) * textR;
        const ty = cy + Math.sin(angle) * textR;
        ctx.fillStyle = '#FFD700';
        ctx.fillText(`${m}m`, tx, ty);
      }
    }

    // 4. Outer Borders & Micro-Security Text
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(42, 42, w - 84, h - 84);

    // Microprint text border
    ctx.fillStyle = 'rgba(226, 232, 240, 0.5)';
    ctx.font = '12px monospace';
    ctx.fillText('SOVEREIGN DRAGON 9 TEMPORAL FRAMEWORK · 54-MINUTE HARMONIC HOUR · 26.666 CYCLE/DAY · 1440 MINUTE EQUIVALENCE · QUANTUM FLUID MOTION', w / 2, 54);
    ctx.fillText('REPRESENTING THE FLUID MOTION OF THE FUTURE · CRYPTOGRAPHIC VALUE EMBODIED IN TIME · SINTERED TITANOMAGNETITE HYBRID', w / 2, h - 54);

    // 5. Typography & Branding
    // Left Banknote Side: DENIRO 9
    ctx.save();
    ctx.textAlign = 'left';
    ctx.fillStyle = '#E2E8F0';
    ctx.font = 'bold 58px "Cinzel", serif';
    ctx.fillText('DENIRO 9', 75, 140);

    ctx.fillStyle = '#00F0FF';
    ctx.font = '16px monospace';
    ctx.fillText('TEMPORAL HYBRID NOTE // D9-009', 75, 175);

    ctx.fillStyle = 'rgba(255, 215, 0, 0.85)';
    ctx.font = 'bold 36px "Cinzel", serif';
    ctx.fillText('⬡ 1.00 D9', 75, 235);

    ctx.fillStyle = 'rgba(148, 163, 184, 0.75)';
    ctx.font = '14px monospace';
    ctx.fillText('VALUATION: 54 EARTH MINUTES', 75, 265);
    ctx.fillText('LEMNISTCATE PRECESSED UNIT', 75, 288);
    ctx.restore();

    // Right Banknote Side: Fluid motion vectors & Dragon 9 seal
    ctx.save();
    ctx.textAlign = 'right';
    ctx.fillStyle = '#E2E8F0';
    ctx.font = 'bold 44px "Cinzel", serif';
    ctx.fillText('FLUID MOTION', w - 75, 135);

    ctx.fillStyle = '#FFD700';
    ctx.font = '16px monospace';
    ctx.fillText('SECURED BY HARMONIC TIME · 1440m', w - 75, 170);

    ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
    ctx.font = '28px monospace';
    ctx.fillText('26.6666 h/cycle', w - 75, 230);

    ctx.fillStyle = 'rgba(148, 163, 184, 0.75)';
    ctx.font = '14px monospace';
    ctx.fillText('SERIES 2026 // GENESIS ALPHA', w - 75, 260);
    ctx.restore();

    // Alpha mask canvas (creating a 100% transparent hole for the central aperture)
    const alphaCanvas = document.createElement('canvas');
    alphaCanvas.width = w;
    alphaCanvas.height = h;
    const aCtx = alphaCanvas.getContext('2d');
    if (aCtx) {
      aCtx.fillStyle = '#ffffff';
      aCtx.fillRect(0, 0, w, h);
      aCtx.globalCompositeOperation = 'destination-out';
      aCtx.beginPath();
      aCtx.arc(cx, cy, apertureRadius, 0, Math.PI * 2);
      aCtx.fill();
    }

    const mapTexture = new THREE.CanvasTexture(canvas);
    mapTexture.needsUpdate = true;

    const alphaTexture = new THREE.CanvasTexture(alphaCanvas);
    alphaTexture.needsUpdate = true;

    return { map: mapTexture, alphaMap: alphaTexture };
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null; // transparent canvas so CSS backdrop shines through

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;
    camera.position.set(0, 0, mouseState.current.currZoom);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Lighting Environment
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    // Golden directional key light
    const keyLight = new THREE.DirectionalLight(0xffdf99, 2.4);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Luminescent cyan rim light
    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 2.8);
    cyanRimLight.position.set(-5, -3, 3);
    scene.add(cyanRimLight);

    // Photonic point lights (following the coin)
    const cyanPointLight = new THREE.PointLight(0x00f0ff, 2.5, 8);
    scene.add(cyanPointLight);
    cyanLightRef.current = cyanPointLight;

    const goldPointLight = new THREE.PointLight(0xffd700, 1.8, 6);
    scene.add(goldPointLight);
    goldLightRef.current = goldPointLight;

    // 5. Build Banknote Mesh Group
    const noteGroup = new THREE.Group();
    noteGroupRef.current = noteGroup;
    scene.add(noteGroup);

    const { map, alphaMap } = generateBanknoteTextures();

    // Polymer-glass substrate
    const noteGeo = new THREE.BoxGeometry(7.0, 3.15, 0.04);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: uniforms.u_glassTransmission,
      roughness: uniforms.u_glassRoughness,
      ior: uniforms.u_glassIOR,
      thickness: 0.8,
      transparent: true,
      opacity: 0.96,
      map: map,
      alphaMap: alphaMap,
      metalness: 0.05,
      iridescence: uniforms.u_iridescenceIntensity,
      iridescenceIOR: 1.55,
      wireframe: uniforms.u_wireframeMode,
      side: THREE.DoubleSide
    });
    glassMaterialRef.current = glassMat;
    const noteMesh = new THREE.Mesh(noteGeo, glassMat);
    noteGroup.add(noteMesh);

    // Gimbal magnetic bevel ring around central aperture
    const gimbalRingGeo = new THREE.TorusGeometry(1.22, 0.035, 16, 64);
    const gimbalRingMat = new THREE.MeshStandardMaterial({
      color: 0x222a36,
      metalness: 0.95,
      roughness: 0.25,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.35,
    });
    const gimbalRing = new THREE.Mesh(gimbalRingGeo, gimbalRingMat);
    gimbalRingRef.current = gimbalRing;
    noteGroup.add(gimbalRing);

    // Outer octagonal magnetic retainer frame
    const octaRetainerGeo = new THREE.RingGeometry(1.26, 1.35, 8);
    const octaRetainerMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    const octaRetainer = new THREE.Mesh(octaRetainerGeo, octaRetainerMat);
    noteGroup.add(octaRetainer);

    // 6. Build Floating Octagonal Coin Group
    const coinGroup = new THREE.Group();
    coinGroupRef.current = coinGroup;
    scene.add(coinGroup);

    // Octagonal coin core (8-sided cylinder: radius 0.92, thickness 0.16)
    const coinGeo = new THREE.CylinderGeometry(0.92, 0.92, 0.16, 8, 1, false);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0x151922, // Dark slate titanomagnetite
      metalness: 0.94,
      roughness: 0.28,
      wireframe: uniforms.u_wireframeMode,
    });
    coinMaterialRef.current = coinMat;
    const coinMesh = new THREE.Mesh(coinGeo, coinMat);
    // Orient cylinder so circular/octagonal faces point towards Z
    coinMesh.rotation.x = Math.PI / 2;
    coinGroup.add(coinMesh);

    // Outer beveled ring of the coin (gold chamfer edge)
    const coinChamferGeo = new THREE.CylinderGeometry(0.94, 0.94, 0.08, 8, 1, true);
    const coinChamferMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.96,
      roughness: 0.18,
      emissive: 0xffa500,
      emissiveIntensity: 0.2
    });
    const coinChamfer = new THREE.Mesh(coinChamferGeo, coinChamferMat);
    coinChamfer.rotation.x = Math.PI / 2;
    coinGroup.add(coinChamfer);

    // Concentric Photonic Rings (Front and Back)
    const createPhotonicRings = (zOffset: number) => {
      const ringGroup = new THREE.Group();
      ringGroup.position.z = zOffset;

      // Inner cyan photonic ring
      const cyanRingGeo = new THREE.RingGeometry(0.55, 0.62, 8);
      const cyanRingMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide
      });
      const cyanRing = new THREE.Mesh(cyanRingGeo, cyanRingMat);
      ringGroup.add(cyanRing);

      // Middle gold temporal ring
      const goldRingGeo = new THREE.RingGeometry(0.72, 0.78, 8);
      const goldRingMat = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        side: THREE.DoubleSide
      });
      const goldRing = new THREE.Mesh(goldRingGeo, goldRingMat);
      ringGroup.add(goldRing);

      // Center Dragon 9 embossed sigil (9-pointed star / ouroboros geometric icon)
      const sigilGeo = new THREE.CircleGeometry(0.35, 9);
      const sigilMat = new THREE.MeshStandardMaterial({
        color: 0x0d121b,
        metalness: 0.95,
        roughness: 0.25,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.5
      });
      const sigil = new THREE.Mesh(sigilGeo, sigilMat);
      ringGroup.add(sigil);

      return ringGroup;
    };

    const frontPhotonic = createPhotonicRings(0.085);
    const backPhotonic = createPhotonicRings(-0.085);
    coinGroup.add(frontPhotonic);
    coinGroup.add(backPhotonic);

    // 7. Ambient Data Stream Particle Cloud
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cyanC = new THREE.Color(0x00f0ff);
    const goldC = new THREE.Color(0xffd700);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePos[i3] = (Math.random() - 0.5) * 14;
      particlePos[i3 + 1] = (Math.random() - 0.5) * 8;
      particlePos[i3 + 2] = (Math.random() - 0.5) * 6;

      const c = Math.random() > 0.4 ? cyanC : goldC;
      particleColors[i3] = c.r;
      particleColors[i3 + 1] = c.g;
      particleColors[i3 + 2] = c.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    scene.add(particles);

    // 8. Animation loop
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!isPaused) {
        timeRef.current += delta * uniforms.u_rotationSpeed;
      }
      const t = timeRef.current;

      // Bernoulli Lemniscate equation for the perpetual infinity loop:
      // x(t) = a * cos(t) / (1 + sin^2(t))
      // y(t) = a * sin(t) * cos(t) / (1 + sin^2(t))
      const a = 1.35; // Lemniscate orbital scale
      const sinT = Math.sin(t * uniforms.u_infinityPrecessionRate);
      const cosT = Math.cos(t * uniforms.u_infinityPrecessionRate);
      const denom = 1 + sinT * sinT;

      const lemniscateX = (a * cosT) / denom;
      const lemniscateY = (a * sinT * cosT) / denom;
      // Z-depth nutation oscillation passing smoothly through the aperture
      const nutationZ = Math.sin(t * uniforms.u_infinityPrecessionRate * 2.0) * 0.45;

      if (coinGroupRef.current) {
        // Position on lemniscate
        coinGroupRef.current.position.x = lemniscateX;
        coinGroupRef.current.position.y = lemniscateY;

        // Exploded view offset on Z
        const explodedOffset = uniforms.u_explodedDistance * 1.5;
        coinGroupRef.current.position.z = nutationZ + explodedOffset;

        // Dual-axis gyroscopic nutation rotation
        coinGroupRef.current.rotation.y = t * 1.4;
        coinGroupRef.current.rotation.x = Math.sin(t * 0.8) * 0.35;
        coinGroupRef.current.rotation.z = Math.cos(t * 1.1) * 0.25;

        // Update point light positions to follow the coin
        if (cyanLightRef.current) {
          cyanLightRef.current.position.set(lemniscateX + 0.3, lemniscateY + 0.2, nutationZ + 0.5 + explodedOffset);
        }
        if (goldLightRef.current) {
          goldLightRef.current.position.set(lemniscateX - 0.3, lemniscateY - 0.2, nutationZ - 0.5 + explodedOffset);
        }
      }

      // Banknote gentle floating breathing motion
      if (noteGroupRef.current) {
        noteGroupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
        noteGroupRef.current.rotation.z = Math.cos(t * 0.4) * 0.02;

        if (gimbalRingRef.current) {
          // Gimbal magnetic ring precession
          gimbalRingRef.current.rotation.z = -t * 0.5;
          gimbalRingRef.current.position.z = -uniforms.u_explodedDistance * 0.6;
        }
      }

      // Particle subtle upward drift
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.003;
          if (positions[i] > 4) positions[i] = -4;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Smooth camera interpolation
      const s = mouseState.current;
      s.currRotX += (s.targetRotX - s.currRotX) * 0.08;
      s.currRotY += (s.targetRotY - s.currRotY) * 0.08;
      s.currZoom += (s.targetZoom - s.currZoom) * 0.08;

      camera.position.x = s.currZoom * Math.sin(s.currRotY) * Math.cos(s.currRotX);
      camera.position.y = s.currZoom * Math.sin(s.currRotX);
      camera.position.z = s.currZoom * Math.cos(s.currRotY) * Math.cos(s.currRotX);
      camera.lookAt(0, 0, 0);

      // Dynamic photonic pulse synchronization
      if (cyanLightRef.current) {
        cyanLightRef.current.intensity = uniforms.u_cyanGlowIntensity * (1 + Math.sin(t * 3.14) * 0.25);
      }
      if (goldLightRef.current) {
        goldLightRef.current.intensity = uniforms.u_goldGlowIntensity * (1 + Math.cos(t * 2.0) * 0.2);
      }

      renderer.render(scene, camera);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update dynamic material properties when uniforms change
  useEffect(() => {
    if (glassMaterialRef.current) {
      glassMaterialRef.current.transmission = uniforms.u_glassTransmission;
      glassMaterialRef.current.roughness = uniforms.u_glassRoughness;
      glassMaterialRef.current.ior = uniforms.u_glassIOR;
      glassMaterialRef.current.iridescence = uniforms.u_iridescenceIntensity;
      glassMaterialRef.current.wireframe = uniforms.u_wireframeMode;
      glassMaterialRef.current.needsUpdate = true;
    }
    if (coinMaterialRef.current) {
      coinMaterialRef.current.wireframe = uniforms.u_wireframeMode;
      coinMaterialRef.current.needsUpdate = true;
    }
  }, [uniforms]);

  // Pointer interactions for smooth 3D rotation & zoom
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsInteracting(true);
    mouseState.current.isDown = true;
    mouseState.current.prevX = e.clientX;
    mouseState.current.prevY = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!mouseState.current.isDown) return;
    const dx = e.clientX - mouseState.current.prevX;
    const dy = e.clientY - mouseState.current.prevY;
    mouseState.current.prevX = e.clientX;
    mouseState.current.prevY = e.clientY;

    mouseState.current.targetRotY += dx * 0.007;
    mouseState.current.targetRotX = Math.max(
      -Math.PI / 2.3,
      Math.min(Math.PI / 2.3, mouseState.current.targetRotX + dy * 0.007)
    );
  };

  const handlePointerUp = () => {
    setIsInteracting(false);
    mouseState.current.isDown = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    mouseState.current.targetZoom = Math.max(
      2.5,
      Math.min(10.0, mouseState.current.targetZoom + e.deltaY * 0.004)
    );
  };

  return (
    <div
      ref={mountRef}
      id="webgl-canvas-viewport"
      className="relative w-full h-full min-h-[460px] cursor-grab active:cursor-grabbing select-none overflow-hidden touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* Visual Overlay Info Ticks */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase font-semibold">
            WebGL 3D Shader Engine // ACES Filmic
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Infinity Precession Trajectory · Dual-Layer Refractive Optics
        </span>
      </div>

      {/* Floating Interaction Hint */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none px-3 py-1 rounded-full border border-slate-700/60 bg-slate-900/80 backdrop-blur text-[11px] font-mono text-slate-300 transition-opacity duration-300 ${isInteracting ? 'opacity-20' : 'opacity-85'}`}>
        Drag to Orbit 3D · Wheel to Zoom · Two-Phase Lemniscate Precession
      </div>
    </div>
  );
};
