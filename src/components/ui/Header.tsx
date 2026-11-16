'use client';

import React from 'react';
import Link from 'next/link';
import CyberText from './CyberText';

export default function Header() {
  return (
    // Добавили pointer-events-auto — теперь шапка на 100% кликабельна!
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center pointer-events-auto">
      
      <Link href="/" className="flex items-center gap-2 cursor-pointer group">
        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
        <CyberText 
          text="AETHER // LAB" 
          className="text-[11px] font-mono tracking-[0.25em] font-black uppercase text-white group-hover:text-purple-400 transition-colors duration-300" 
        />
      </Link>

      <Link 
        href="/dashboard" 
        className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-purple-500/30 backdrop-blur-md transition-all duration-300 group cursor-pointer"
      >
        <CyberText 
          text="TERMINAL // LIVE FEED" 
          className="text-[9px] font-mono tracking-widest text-zinc-400 group-hover:text-white uppercase font-bold" 
        />
      </Link>

    </header>
  );
}
