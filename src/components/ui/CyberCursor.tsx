'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CyberCursor() {
  // Координаты мыши
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Физика плавного доводчика (Spring) для эффекта инерции шлейфа
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Центрируем по прицелу (32px / 2)
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Точка-прицел (двигается мгновенно) */}
      <motion.div
        className="fixed w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          // Смещаем точку ровно в центр прицела
          translateX: 12,
          translateY: 12,
        }}
      />

      {/* Внешнее кибер-кольцо с инерцией (шлейф) */}
      <motion.div
        className="fixed w-8 h-8 border border-purple-500/50 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
    </>
  );
}
