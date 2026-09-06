import React, { useRef, useEffect } from 'react';

interface Globe3DProps {
  size?: number;
  color?: string;
  speed?: number;
}

export const Globe3D: React.FC<Globe3DProps> = ({
  size = 36,
  color = '#ffffff',
  speed = 0.005,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 1;

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '255,255,255';
    };
    const rgb = hexToRgb(color);

    // Diagonal projection: rotates and tilts diagonally, moving smoothly across both side directions
    const project = (lat: number, lon: number, rotY: number, tiltX: number) => {
      const latR = (lat * Math.PI) / 180;
      const lonR = (lon * Math.PI) / 180 + rotY;

      // 3D point on sphere
      let x3 = r * Math.cos(latR) * Math.sin(lonR);
      let y3 = r * Math.sin(latR);
      let z3 = r * Math.cos(latR) * Math.cos(lonR);

      // Rotate around X axis (diagonal tilt)
      const y4 = y3 * Math.cos(tiltX) - z3 * Math.sin(tiltX);
      const z4 = y3 * Math.sin(tiltX) + z3 * Math.cos(tiltX);

      // Diagonal slant (~20 deg) so motion sweeps between both diagonal side directions
      const diagAngle = 0.35;
      const x5 = x3 * Math.cos(diagAngle) - y4 * Math.sin(diagAngle);
      const y5 = x3 * Math.sin(diagAngle) + y4 * Math.cos(diagAngle);

      return { x: cx + x5, y: cy - y5, z: z4 };
    };

    const STEPS = 72;
    const LW = size * 0.045; // line width scales with size

    const drawSegments = (
      getP: (i: number) => { x: number; y: number; z: number },
      alpha: number,
      lw: number
    ) => {
      let seg: { x: number; y: number }[] = [];
      for (let i = 0; i <= STEPS; i++) {
        const p = getP(i);
        if (p.z >= 0) {
          seg.push({ x: p.x, y: p.y });
        } else {
          if (seg.length >= 2) {
            ctx.beginPath();
            ctx.moveTo(seg[0].x, seg[0].y);
            seg.slice(1).forEach((s) => ctx.lineTo(s.x, s.y));
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.lineWidth = lw;
            ctx.lineCap = 'round';
            ctx.stroke();
          }
          seg = [];
        }
      }
      if (seg.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(seg[0].x, seg[0].y);
        seg.slice(1).forEach((s) => ctx.lineTo(s.x, s.y));
        ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
        ctx.lineWidth = lw;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      angleRef.current += speed;
      const t = angleRef.current;

      // Smooth diagonal oscillation across both side directions
      const rotY = Math.sin(t) * 1.5;
      const tiltX = Math.cos(t) * 0.42;

      // Outer circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rgb}, 0.95)`;
      ctx.lineWidth = LW;
      ctx.stroke();

      // 3 latitude parallels
      for (const lat of [-45, 0, 45]) {
        drawSegments(
          (i) => project(lat, -180 + (360 / STEPS) * i, rotY, tiltX),
          lat === 0 ? 0.95 : 0.8,
          lat === 0 ? LW : LW * 0.85
        );
      }

      // 3 longitude meridians as ellipses
      for (const lon of [0, 60, 120]) {
        drawSegments(
          (i) => project(-90 + (180 / STEPS) * i, lon, rotY, tiltX),
          0.85,
          LW * 0.85
        );
        drawSegments(
          (i) => project(-90 + (180 / STEPS) * i, lon + 180, rotY, tiltX),
          0.85,
          LW * 0.85
        );
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size, color, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, display: 'block' }}
    />
  );
};

export default Globe3D;
