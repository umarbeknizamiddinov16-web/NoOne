// Инициализируем аудио-контекст лениво, чтобы не блокировать загрузку сайта
let audioCtx: AudioContext | null = null;

export const playCyberSound = (type: 'click' | 'hover') => {
  if (typeof window === 'undefined') return;
  
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  // Создаем генератор звуковой частоты и регулятор громкости
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === 'hover') {
    // Короткий, ультратонкий высокочастотный щелчок при наведении
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.015, audioCtx.currentTime); // Очень тихий, чтобы не раздражать
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } else if (type === 'click') {
    // Глубокий, технологичный импульс при клике
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  }
};
