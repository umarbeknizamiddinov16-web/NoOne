'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import QuantumCore from './QuantumCore';

export default function QuantumCanvas() {
  return (
    // Добавили pointer-events-none, чтобы сцена не воровала клики мыши у текста!
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <QuantumCore />
      </Canvas>
    </div>
  );
}
