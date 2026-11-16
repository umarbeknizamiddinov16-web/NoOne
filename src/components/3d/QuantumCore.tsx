'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

export default function QuantumCore() {
  const pointsRef = useRef<any>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const spherePositions = useMemo(() => {
    return random.inSphere(new Float32Array(4200), { radius: 2.5 }) as Float32Array;
  }, []);

  // УЛЬТИМАТИВНЫЙ ЦИКЛ РЕНДЕРИНГА И АНИМАЦИИ
  useFrame((state, delta) => {
    if (!pointsRef.current || !coreRef.current) return;

    const time = state.clock.getElapsedTime();

    // Плавная инерция скролла (Lerp)
    currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, targetScroll.current, 0.05);
    const offset = currentScroll.current;

    // ПРЯМОЕ И СВЕРХБЫСТРОЕ ЧТЕНИЕ ЧАСТОТ ИЗ WINDOW
    let audioBassBoost = 0;
    let audioMidBoost = 0;

    const globalAnalyser = (window as any).cyberAnalyser;
    const globalDataArray = (window as any).cyberDataArray;

    if (globalAnalyser && globalDataArray) {
      globalAnalyser.getByteFrequencyData(globalDataArray);
      
      // Считываем басы
      let bassSum = 0;
      for (let i = 0; i < 5; i++) bassSum += globalDataArray[i];
      audioBassBoost = (bassSum / 5) / 255;

      // Считываем средние частоты
      let midSum = 0;
      for (let i = 10; i < 25; i++) midSum += globalDataArray[i];
      audioMidBoost = (midSum / 15) / 255;
    }

    // 1. АНИМАЦИЯ ЗВЕЗД: Скорость вращения увеличивается от басов трека
    const speedFactor = 1 + audioBassBoost * 3;
    pointsRef.current.rotation.x += delta * 0.04 * speedFactor;
    pointsRef.current.rotation.y += delta * 0.06 * speedFactor;
    pointsRef.current.position.z = offset * 4.5;
    pointsRef.current.rotation.z = offset * Math.PI;

    // 2. АНИМАЦИЯ КИБЕР-СФЕРЫ: Пульсация под частоты музыки
    coreRef.current.rotation.y = time * 0.2 + offset * Math.PI;
    coreRef.current.rotation.x = time * 0.1;
    coreRef.current.position.z = offset * 4.5;

    const geometry = coreRef.current.geometry;
    const positionAttribute = geometry.attributes.position;
    
    if (!geometry.userData.origPositions) {
      geometry.userData.origPositions = positionAttribute.clone();
    }
    
    const orig = geometry.userData.origPositions;

    for (let i = 0; i < positionAttribute.count; i++) {
      const nx = orig.getX(i);
      const ny = orig.getY(i);
      const nz = orig.getZ(i);

      // Геометрия сферы взрывается волнами шума строго под басы!
      const waveFreq = 4 + audioMidBoost * 5;
      const waveAmp = 0.08 + audioBassBoost * 0.25; 
      
      const wave = Math.sin(nx * waveFreq + time * 2) * Math.cos(ny * waveFreq + time * 2) * waveAmp;
      const length = Math.sqrt(nx*nx + ny*ny + nz*nz);
      const factor = 1 + wave;

      positionAttribute.setXYZ(i, (nx / length) * factor, (ny / length) * factor, (nz / length) * factor);
    }
    
    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();

    // Общая динамическая пульсация масштаба всей сцены от музыки
    const pulse = Math.sin(time * 2) * 0.02 + audioBassBoost * 0.1;
    pointsRef.current.scale.setScalar(1 + pulse + offset * 0.5);
    coreRef.current.scale.setScalar(0.45 + pulse + offset * 0.2);
  }); // Скобка успешно закрывает useFrame

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      {/* ЗВЕЗДНОЕ ОБЛАКО */}
      <Points ref={pointsRef} positions={spherePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c084fc"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2}
        />
      </Points>

      {/* ЖИВАЯ АУДИО-РЕАКТИВНАЯ СФЕРА-ГОЛОГРАММА */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe={true}
          transparent={true}
          opacity={0.35}
          blending={2}
        />
      </mesh>
    </group>
  );
}
