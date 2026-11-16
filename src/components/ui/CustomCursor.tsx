'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(true); // По умолчанию скрываем
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  const springConfig = { damping: 18, stiffness: 450, mass: 0.2 };
  
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);
  const rotateXSpring = useSpring(rotateX, { damping: 20, stiffness: 200 });
  const rotateYSpring = useSpring(rotateY, { damping: 20, stiffness: 200 });
  const scaleSpring = useSpring(scale, { damping: 15, stiffness: 300 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ИСПРАВЛЕНО: Проверяем, мобильное ли это устройство по разрешению экрана или тач-возможностям
    const checkDevice = () => {
      const isMobileSize = window.innerWidth < 1024;
      const isTouchOnly = window.matchMedia('(pointer: coarse)').matches;
      setIsMobileDevice(isMobileSize || isTouchOnly);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    const moveCursor = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      
      rotateX.set(Math.min(Math.max(-deltaY * 1.5, -35), 35));
      rotateY.set(Math.min(Math.max(deltaX * 1.5, -35), 35));

      lastX = e.clientX;
      lastY = e.clientY;

      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('button, a, .cursor-pointer, input, textarea');

      if (interactiveEl) {
        const rect = interactiveEl.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
        setIsHovered(true);
        scale.set(1.4);
        rotateX.set(0);
        rotateY.set(0);
      } else {
        setIsHovered(false);
        scale.set(1);
      }

      mouseX.set(targetX);
      mouseY.set(targetY);

      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', checkDevice);
    };
  }, [isVisible]);

  // ИСПРАВЛЕНО: Если это телефон или планшет, принудительно выключаем рендеринг 3D-прицела
  if (isMobileDevice || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-0 h-0 z-50 pointer-events-none mix-blend-screen perspective-1000"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    >
      <motion.div
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          scale: scaleSpring,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-12 h-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <motion.div 
          animate={{
            borderColor: isHovered ? '#f43f5e' : '#10b981',
            boxShadow: isHovered ? '0 0 25px #f43f5e' : '0 0 20px #10b981',
          }}
          className="absolute inset-0 border-2 rounded-full transition-all duration-300" 
        />
        <motion.div 
          style={{ transform: 'translateZ(15px)' }} 
          animate={{
            borderColor: isHovered ? '#10b981' : '#f43f5e',
            boxShadow: isHovered ? '0 0 15px #10b981' : '0 0 15px #f43f5e',
          }}
          className="absolute w-8 h-8 border border-dashed rounded-full animate-spin [animation-duration:12s] transition-all duration-300" 
        />
        <motion.div animate={{ backgroundColor: isHovered ? 'rgba(244,63,94,0.3)' : 'rgba(16,185,129,0.2)' }} className="absolute w-full h-[1px] transition-colors" />
        <motion.div animate={{ backgroundColor: isHovered ? 'rgba(244,63,94,0.3)' : 'rgba(16,185,129,0.2)' }} className="absolute h-full w-[1px] transition-colors" />
        <motion.div style={{ transform: 'translateZ(20px)' }} animate={{ backgroundColor: isHovered ? '#f43f5e' : '#10b981' }} className="absolute -top-1 -left-1 w-1 h-1 rounded-full shadow-[0_0_10px_#10b981]" />
        <motion.div style={{ transform: 'translateZ(20px)' }} animate={{ backgroundColor: isHovered ? '#f43f5e' : '#10b981' }} className="absolute -top-1 -right-1 w-1 h-1 rounded-full shadow-[0_0_10px_#10b981]" />
        <motion.div style={{ transform: 'translateZ(20px)' }} animate={{ backgroundColor: isHovered ? '#f43f5e' : '#10b981' }} className="absolute -bottom-1 -left-1 w-1 h-1 rounded-full shadow-[0_0_10px_#10b981]" />
        <motion.div style={{ transform: 'translateZ(20px)' }} animate={{ backgroundColor: isHovered ? '#f43f5e' : '#10b981' }} className="absolute -bottom-1 -right-1 w-1 h-1 rounded-full shadow-[0_0_10px_#10b981]" />

        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, z: 0 }}
            animate={{ opacity: 1, scale: 1, z: 30 }}
            className="absolute text-[6px] font-black text-rose-400 tracking-[0.25em] uppercase bg-rose-950/50 border border-rose-500/40 px-2 py-0.5 rounded backdrop-blur-sm -bottom-6 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
          >
            SYS_LOCK
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
