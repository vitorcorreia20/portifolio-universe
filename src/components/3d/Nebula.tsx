"use client";

import { useMemo } from 'react';

export function Nebula() {
  const { positions, colors } = useMemo(() => {
    const particleCount = 8000;
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const virtualIndex = (i / particleCount) * 35;
      
      const radius = 8 + (virtualIndex * 2.5);
      const angle = virtualIndex * 0.7;

      const scatter = 3 + (virtualIndex * 0.15);
      
      pos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * scatter;
      pos[i * 3 + 1] = (Math.random() - 0.5) * (scatter * 0.8);
      pos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * scatter;

      const mix = Math.random();
      col[i * 3] = 0.0 * mix + 0.3 * (1 - mix);      
      col[i * 3 + 1] = 0.48 * mix + 0.0 * (1 - mix);  
      col[i * 3 + 2] = 0.8 * mix + 0.6 * (1 - mix);   
    }

    return { positions: pos, colors: col };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args = {[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}