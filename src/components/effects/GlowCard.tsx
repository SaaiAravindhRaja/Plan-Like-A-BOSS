/**
 * Glow Card Component
 * Card with 3D transforms, depth, and epic glow effects
 */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlowCard({
  children,
  className = '',
  glowColor = '#3B82F6',
  intensity = 'medium',
}: GlowCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  const glowIntensity = {
    low: 0.2,
    medium: 0.4,
    high: 0.6,
  }[intensity];

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: isHovering ? (mousePosition.y - 0.5) * 10 : 0,
        rotateY: isHovering ? (mousePosition.x - 0.5) * 10 : 0,
        scale: isHovering ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${glowColor}80, transparent 70%)`,
          filter: 'blur(20px)',
          opacity: isHovering ? glowIntensity : 0,
        }}
        animate={{
          opacity: isHovering ? glowIntensity : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${glowColor}40, transparent 50%, ${glowColor}20)`,
          opacity: isHovering ? 0.5 : 0,
        }}
        animate={{
          opacity: isHovering ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
        style={{
          background: `linear-gradient(${mousePosition.x * 360}deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)`,
          opacity: isHovering ? 1 : 0,
        }}
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
