/**
 * Animated Background Component
 * Epic animated mesh gradient background that flows and shifts
 */

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Gradient configuration
    const gradientColors = [
      { r: 195, g: 0, b: 47 },    // SMU Red
      { r: 139, g: 92, b: 246 },  // Purple
      { r: 59, g: 130, b: 246 },  // Blue
      { r: 6, g: 182, b: 212 },   // Cyan
    ];

    let time = 0;

    const animate = () => {
      time += 0.003;

      // Create animated gradient
      const gradient = ctx.createLinearGradient(
        Math.sin(time) * canvas.width / 2,
        Math.cos(time) * canvas.height / 2,
        canvas.width / 2 + Math.cos(time + Math.PI / 2) * canvas.width / 2,
        canvas.height / 2 + Math.sin(time + Math.PI / 2) * canvas.height / 2
      );

      // Animate colors
      gradientColors.forEach((color, index) => {
        const offset = index / (gradientColors.length - 1);
        const opacity = 0.15 + Math.sin(time + offset * Math.PI * 2) * 0.05;
        gradient.addColorStop(offset, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`);
      });

      // Draw gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add blob overlay
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 3; i++) {
        const x = canvas.width / 2 + Math.sin(time * 0.5 + i * Math.PI * 2 / 3) * 300;
        const y = canvas.height / 2 + Math.cos(time * 0.7 + i * Math.PI * 2 / 3) * 200;
        const size = 300 + Math.sin(time + i) * 100;

        const blobGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        const color = gradientColors[i % gradientColors.length];
        blobGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`);
        blobGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`);
        blobGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = blobGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.globalCompositeOperation = 'source-over';

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}
