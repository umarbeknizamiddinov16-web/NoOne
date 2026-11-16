'use client';
export default function CyberOverlay() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
        <span className="text-xs tracking-[0.4em] font-black uppercase text-white/90">AETHER // LAB</span>
      </div>
      <button className="px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500">
        Connect Identity
      </button>
    </div>
  );
}
