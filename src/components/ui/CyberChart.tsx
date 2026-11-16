'use client';

import React, { useEffect, useState } from 'react';

export default function CyberChart() {
  const [points, setPoints] = useState<number[]>([40, 50, 45, 60, 55, 70, 65, 80]);

  // Симулируем постоянное изменение нагрузки на ядро сайта
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        const nextPoints = [...prev.slice(1), Math.floor(30 + Math.random() * 60)];
        return nextPoints;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Формируем путь для SVG-линии на основе массива точек
  const svgPath = points
    .map((p, index) => `${index === 0 ? 'M' : 'L'} ${index * 40} ${100 - p}`)
    .join(' ');

  return (
    <div className="w-full h-32 bg-purple-500/[0.02] border border-white/5 rounded-xl p-4 relative overflow-hidden backdrop-blur-md">
      <div className="absolute top-2 left-4 text-[9px] uppercase tracking-wider text-purple-400">
        CORE_LOAD // REAL_TIME_STREAM
      </div>
      
      {/* Декоративная сетка на фоне графика */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 opacity-10 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="border-[0.5px] border-white/20" />
        ))}
      </div>

      {/* Живая SVG-Линия */}
      <svg className="w-full h-full pt-6" viewBox="0 0 280 100" preserveAspectRatio="none">
        {/* Свечение под линией */}
        <path
          d={`${svgPath} L 280 100 L 0 100 Z`}
          fill="url(#chart-gradient)"
          className="transition-all duration-700 ease-in-out"
        />
        {/* Сама линия */}
        <path
          d={svgPath}
          fill="none"
          stroke="#c084fc"
          strokeWidth="2"
          className="transition-all duration-700 ease-in-out"
        />
        
        <defs>
          <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
