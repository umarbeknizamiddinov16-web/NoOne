'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import CyberChart from '@/components/ui/CyberChart';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({ revenue: 12450, visitors: 8234, fps: 120 });
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Инициализация квантового ядра...',
    '[OK] WebGL контекст успешно запущен.',
    '[INFO] Выделено 4.2К активных частиц буфера.'
  ]);

  // Симуляция потока данных для метрик
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 8),
        visitors: prev.visitors + Math.floor(Math.random() * 2),
        fps: +(119.2 + Math.random() * 0.8).toFixed(2)
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Симуляция бегущих системных логов в терминале
  useEffect(() => {
    const logPool = [
      '[STATUS] Синхронизация 3D слоев завершена.',
      '[METRIC] Оптимизация кэша: LightningCSS скомпилирован.',
      '[INFO] Обновление координат Z-буфера в реальном времени.',
      '[SECURITY] Подключение зашифровано SHA-256.',
      '[SYS] Очистка неиспользуемых вершин WebGL.'
    ];

    const interval = setInterval(() => {
      setLogs(prev => {
        const nextLog = logPool[Math.floor(Math.random() * logPool.length)];
        const timestamp = new Date().toLocaleTimeString();
        return [...prev.slice(-4), `[${timestamp}] ${nextLog}`];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020204] text-white font-mono p-6 md:p-12 relative overflow-hidden select-none">
      
      {/* Сетка кибер-интерфейса на фоне */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5 border-[1px] border-white/5 m-4 md:m-8 grid grid-cols-4 grid-rows-4">
        {[...Array(16)].map((_, i) => <div key={i} className="border-[0.5px] border-white/5" />)}
      </div>

      <div className="max-w-6xl mx-auto mb-10 relative z-10">
        <Link href="/" className="text-xs text-purple-400 hover:text-white transition-colors uppercase tracking-[0.2em]">
          ← На главную орбиту
        </Link>
      </div>

      <main className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Левая колонка: Заголовок и Главные Метрики */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="border-b border-white/5 pb-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-purple-400">Aether System Control</span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-1">Квантовый Центр</h1>
          </div>

          {/* Сетка карточек */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Live Revenue', value: `$${metrics.revenue.toLocaleString()}`, change: '+12.4%', color: 'text-purple-400' },
              { label: 'Core Visitors', value: metrics.visitors.toLocaleString(), change: '+8.2%', color: 'text-blue-400' },
              { label: 'Stream Frequency', value: `${metrics.fps} HZ`, change: 'STABLE', color: 'text-emerald-400' }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-white/[0.01] border border-white/5 backdrop-blur-md relative overflow-hidden group hover:border-purple-500/20 transition-colors"
              >
                <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">{card.label}</div>
                <div className={`text-2xl font-black ${card.color} tracking-tight`}>{card.value}</div>
                <div className="text-[8px] mt-2 font-bold opacity-40 group-hover:opacity-80 transition-opacity">
                  {card.change}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Интерактивный живой график */}
          <CyberChart />
        </div>

        {/* Правая колонка: Терминал Логов */}
        <div className="flex flex-col h-full justify-between border border-white/5 bg-black/40 rounded-xl p-6 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
              <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">TERMINAL_FEED</span>
            </div>
            
            {/* Вывод живых логов */}
            <div className="flex flex-col gap-2.5 font-mono text-[11px] text-zinc-400 min-h-[160px]">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={index === logs.length - 1 ? 'text-purple-300 font-semibold' : ''}
                >
                  {log}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[9px] text-zinc-500 flex justify-between items-center">
            <span>SECURE_NODE // OK</span>
            <span className="animate-pulse">● ONLINE</span>
          </div>
        </div>

      </main>
    </div>
  );
}
