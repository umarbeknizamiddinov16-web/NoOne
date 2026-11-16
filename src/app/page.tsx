'use client';

import dynamic from 'next/dynamic';
import { motion, useMotionValue, useTransform } from 'motion/react';
import React, { useRef, useState } from 'react';
import CyberText from '@/components/ui/CyberText'; // Импортируем наш глитч-текст сюда
// Добавьте эту строку к остальным импортам в самом верху файла page.tsx:
import CustomCursor from '@/components/ui/CustomCursor';
import QuantumDraw from '@/components/ui/QuantumDraw';



// Загружаем 3D холст отдельно без серверного рендеринга
const QuantumCanvas = dynamic(() => import('@/components/3d/QuantumCanvas'), {
  ssr: false,
});

// ПРОЦЕДУРНЫЙ АУДИО-ДВИЖОК
const playCyberSound = (type: 'click' | 'hover') => {
  if (typeof window === 'undefined') return;
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.008, audioCtx.currentTime);
      osc.start(); osc.stop(audioCtx.currentTime + 0.04);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      osc.start(); osc.stop(audioCtx.currentTime + 0.15);
    }
  } catch (e) {}
};

// ИНТЕРАКТИВНАЯ 3D-КАРТОЧКА ПРОЕКТА
function TiltCard({ title, tech, num }: { title: string; tech: string; num: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [12, -12]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0); y.set(0);
        window.dispatchEvent(new CustomEvent('cyber-project-hover', { detail: false }));
      }}
      onMouseEnter={() => {
        playCyberSound('hover');
        window.dispatchEvent(new CustomEvent('cyber-project-hover', { detail: true }));
      }}
      onClick={() => playCyberSound('click')}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 hover:border-purple-500/40 transition-colors duration-500 cursor-pointer relative overflow-hidden backdrop-blur-md group perspective-1000"
    >
      <div className="absolute -inset-20 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div style={{ transform: 'translateZ(40px)' }} className="transition-transform duration-500">
        <div className="flex justify-between items-start">
          <span className="text-xs text-purple-400 font-bold tracking-widest">{tech}</span>
          <span className="text-4xl font-black text-white/5 group-hover:text-purple-500/20 transition-colors duration-500">{num}</span>
        </div>
        <h3 className="text-2xl font-black uppercase tracking-wide mt-6 group-hover:text-purple-300 transition-colors">{title}</h3>
        <p className="text-zinc-500 text-xs mt-2 font-light max-w-[200px]">Премиальный цифровой опыт на базе WebGL.</p>
        <div className="mt-10 text-[10px] text-white/40 tracking-widest uppercase border-b border-white/10 w-max pb-1 group-hover:text-white group-hover:border-purple-400 transition-all">Explore Case →</div>
      </div>
    </motion.div>
  );
}
// ========================================================
// ЧАСТЬ 2: ГЛАВНЫЙ КОМПОНЕНТ, СЕКЦИЯ 1 (ГЛИТЧ-ЗАГОЛОВКИ) И СЕКЦИЯ 2
// ========================================================
export default function AbsoluteUltimateWebsite() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    { name: 'WebGL // 3D Сцены', desc: 'Разработка трехмерных интерактивных пространств, процедурная генерация частиц, шейдерные эффекты искажений и плавная физика влета.', price: 'от $1,200', time: '14-20 дней' },
    { name: 'Next.js // Архитектура', desc: 'Создание сверхбыстрых веб-приложений на базе Next.js 16 и React 19. Безупречное SEO, мгновенный роутинг страниц и серверный рендеринг (SSR).', price: 'от $800', time: '7-12 дней' },
    { name: 'Telegram // Интеграция', desc: 'Связка вашего бизнес-интерфейса со сложными CRM-системами, сбор технических метрик пользователей, настройка защищенных шлюзов и ботов.', price: 'от $400', time: '3-5 дней' }
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#020204] text-white font-mono select-none overflow-x-hidden">
      
      <CustomCursor />
      <QuantumDraw />

      {/* КИНО-ШУМ — Теперь он лежит глубоко под текстом, чтобы не мешать кликам */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015] bg-[url('https://unsplash.com')] bg-repeat" />

      {/* Космический туман на фоне */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* 3D Сцена полностью чистит слои */}
      <QuantumCanvas />

      {/* ЕДИНСТВЕННЫЙ, ГЛАВНЫЙ СЛОЙ ИНТЕРФЕЙСА (z-30 и pointer-events-auto) */}
      <div className="relative z-30 isolate w-full pointer-events-auto">
        
        {/* СЕКЦИЯ 1: ГЛАВНАЯ С КИНЕМАТОГРАФИЧНЫМ ПРОЯВЛЕНИЕМ */}
        <section className="w-full h-screen flex flex-col justify-center items-center p-6 md:p-12">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 bg-purple-500/5 border border-purple-500/20 rounded-full mb-8 text-[9px] uppercase tracking-[0.3em] text-purple-400 backdrop-blur-md"
            >
              Quantum Systems // Node_Active_2026
            </motion.div>
            
            {/* УЛЬТИМАТИВНЫЕ ГЛИТЧ-ЗАГОЛОВКИ — Оживают при наведении мыши! */}
            <h1 className="text-6xl md:text-[115px] font-black tracking-tighter leading-none uppercase">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20">
                <CyberText text="ABSOLUTE" />
              </span>
              <span className="block tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 text-3xl md:text-[60px] font-light italic mt-4">
                <CyberText text="ENGINEERING" />
              </span>
            </h1>
            
            <p className="mt-10 text-xs md:text-sm font-light text-zinc-400 tracking-widest max-w-lg leading-relaxed text-center">
              Интерфейсы, которые преодолевают плоскость экрана. Каждое движение мыши меняет гравитацию и физику квантовых частиц.
            </p>
            
            <div className="mt-16 text-purple-400/50 text-[10px] tracking-[0.4em] uppercase flex flex-col items-center gap-2">
              <span>Scroll to explore laboratory</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent animate-pulse" />
            </div>

          </div>
        </section>

        {/* СЕКЦИЯ 2: IDENTITY И ХОТ-МЕТРИКИ */}
        <section className="w-full h-screen flex items-center justify-center p-6 bg-transparent">
          <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <span className="text-purple-400 text-xs font-bold tracking-[0.3em] block mb-3">// 01 _ METAFRAME</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-none">
                Разрушая правила <br />плоского веба
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed font-light max-w-xl">
                Пока индустрия штампует скучные квадратные блоки, мы создаем процедурные миры. Этот сайт полностью рендерится на чипах видеокарты, обеспечивая абсолютный отклик интерфейса.
              </p>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                { val: '120 FPS', label: 'Ultra Fluidity', desc: 'Аппаратное сглаживание' },
                { val: '4.2K', label: 'Vertex Buffer', desc: 'Процедурные вершины' }
              ].map((m, i) => (
                <div 
                  key={i}
                  onMouseEnter={() => playCyberSound('hover')}
                  className="p-6 rounded-xl bg-white/[0.01] border border-white/5 backdrop-blur-md relative group hover:border-purple-500/20 transition-colors cursor-default"
                >
                  <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{m.val}</div>
                  <div className="text-[10px] text-white uppercase tracking-wider mt-2 font-bold">{m.label}</div>
                  <div className="text-[9px] text-zinc-500 mt-1 font-light">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ========================================================
            ЧАСТЬ 3: ИНТЕРАКТИВНЫЙ ТЕРМИНАЛ УСЛУГ И КИБЕР-ХРОНОЛОГИЯ
            ======================================================== */}

        {/* СЕКЦИЯ 3: ИНТЕРАКТИВНЫЙ ТЕРМИНАЛ УСЛУГ */}
        <section className="w-full min-h-screen flex flex-col justify-center py-20 px-6 bg-transparent">
          <div className="max-w-5xl mx-auto w-full">
            <div className="border-b border-white/5 pb-6 mb-12">
              <span className="text-purple-400 text-xs font-bold tracking-[0.3em] block mb-2">// 02 _ QUANTUM_SERVICES</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Спецификация услуг</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Левый блок: Список вкладок выбора */}
              <div className="flex flex-col gap-2">
                {services.map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => { playCyberSound('click'); setActiveService(idx); }}
                    onMouseEnter={() => playCyberSound('hover')}
                    className={`p-4 rounded-xl text-left font-mono text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                      activeService === idx 
                        ? 'bg-purple-600/10 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                        : 'bg-white/[0.01] border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10'
                    }`}
                  >
                    {service.name}
                  </button>
                ))}
              </div>

              {/* Правый блок: Вывод описания и стоимости */}
              <div className="md:col-span-2 p-8 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-md min-h-[250px] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-purple-400 mb-3">Описание модуля //</div>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">{services[activeService].desc}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-zinc-500">Вычислительная стоимость:</div>
                    <div className="text-xl font-black text-cyan-400 mt-1">{services[activeService].price}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-zinc-500">Время компиляции (Сроки):</div>
                    <div className="text-xl font-black text-purple-400 mt-1">{services[activeService].time}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* СЕКЦИЯ 4: КИБЕР-ХРОНОЛОГИЯ HARD SKILLS */}
        <section className="w-full min-h-screen flex flex-col justify-center py-20 px-6 bg-transparent">
          <div className="max-w-5xl mx-auto w-full">
            <div className="border-b border-white/5 pb-6 mb-12">
              <span className="text-purple-400 text-xs font-bold tracking-[0.3em] block mb-2">// 03 _ TECH_TIMELINE</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Ядро технологий</h2>
            </div>

            <div className="relative border-l border-white/10 pl-6 ml-4 space-y-12">
              {[
                { era: '2024 - Настоящее', title: 'WebGL / Three.js Спецификация', level: '92%', color: 'bg-cyan-400', desc: 'Проектирование и математический расчет трехмерных сцен прямо в окне браузера.' },
                { era: '2025 - Настоящее', title: 'Next.js 16 / React 19 Архитектура', level: '96%', color: 'bg-purple-500', desc: 'Развертывание высокоскоростных интерфейсов с аппаратным ускорением рендеринга.' },
                { era: '2026', title: 'Квантовые CRM / API Шлюзы', level: '88%', color: 'bg-pink-500', desc: 'Интеграция систем сбора серверных логов, шифрования данных и умных ботов связи.' }
              ].map((tech, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#020204] border-2 border-purple-500 group-hover:scale-125 transition-transform" />
                  
                  <span className="text-[10px] text-zinc-500 tracking-widest block font-bold mb-1">{tech.era}</span>
                  <h3 className="text-xl font-bold uppercase text-white group-hover:text-purple-300 transition-colors">{tech.title}</h3>
                  <p className="text-zinc-400 text-xs mt-2 max-w-xl font-light leading-relaxed">{tech.desc}</p>
                  
                  <div className="mt-4 max-w-md">
                    <div className="flex justify-between text-[9px] uppercase text-zinc-500 tracking-wider mb-1">
                      <span>Синхронизация</span>
                      <span>{tech.level}</span>
                    </div>
                    <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: tech.level }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className={`h-full ${tech.color}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ========================================================
            ЧАСТЬ 4: ИЗБРАННЫЕ КЕЙСЫ, ПРЯМАЯ CRM-ФОРМА И ФИНАЛЬНЫЕ ТЕГИ
            ======================================================== */}
        
        {/* СЕКЦИЯ 5: ИЗБРАННЫЕ КЕЙСЫ */}
        <section className="w-full min-h-screen flex flex-col justify-center py-20 px-6 bg-transparent">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4 border-b border-white/5 pb-8">
              <div>
                <span className="text-purple-400 text-xs font-bold tracking-[0.3em] block mb-2">// 04 _ PRODUCTION</span>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Избранные кейсы</h2>
              </div>
              <p className="text-zinc-500 text-xs tracking-widest uppercase max-w-xs leading-relaxed text-left md:text-right">
                Проекты, которые меняют представление о возможностях коммерческого веба.
              </p>
            </div>
            
            {/* Сетка наших высокотехнологичных 3D-карточек */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TiltCard title="Cyber E-Com" tech="Next.js 16 + WebGL" num="01" />
              <TiltCard title="Neural Nexus" tech="Three.js + Shaders" num="02" />
              <TiltCard title="Meta Portal" tech="React 19 + GLSL" num="03" />
            </div>
          </div>
        </section>

        {/* СЕКЦИЯ 6: КВАНТОВАЯ СВЯЗЬ (НАМЕРТВО СВЯЗАННЫЙ CRM-МОДУЛЬ) */}
        <section className="w-full min-h-screen flex items-center justify-center p-6 bg-transparent relative">
          <div className="max-w-xl w-full border border-white/5 bg-black/40 p-8 rounded-2xl backdrop-blur-md">
            <span className="text-purple-400 text-xs font-bold tracking-[0.3em] block mb-2">// 05 _ COMM_NODE</span>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6">Инициализировать контакт</h2>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              playCyberSound('click');
              const formData = new FormData(e.currentTarget);
              
              const token = '8776213651:AAFoAR2Txa0ingl0ciwLRRe6VjZTE_E5j7g';
              const chatId = '804867683';

              const telegramMessage = `🛸 НОВОЕ ПОДКЛЮЧЕНИЕ С САЙТА\n────────────────────────\n👤 Имя: ${formData.get('name')}\n📡 Связь: ${formData.get('contact')}\n💬 Сообщение: "${formData.get('message')}"\n────────────────────────\n🛰️ Aether Lab CRM v1.0`;

              try {
                const apiHost = 'api.' + 'telegram' + '.org';
                const finalUrl = 'https://' + apiHost + '/bot' + token + '/sendMessage';

                const res = await fetch(finalUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramMessage,
                  }),
                });

                if (res.ok) {
                  alert('🛸 Сигнал принят! Квантовый пакет успешно доставлен оператору.');
                  (e.target as HTMLFormElement).reset();
                } else {
                  const errData = await res.json();
                  alert(`⚠️ Ошибка Telegram API: ${errData.description || 'Неизвестный сбой'}`);
                }
              } catch (err) {
                alert('⚠️ Сбой сети. Пакет потерян в гиперпространстве.');
              }
            }} className="flex flex-col gap-4">
              
              <input required name="name" type="text" placeholder="ИДЕНТИФИКАТОР (ИМЯ)" className="w-full bg-white/[0.02] border border-white/5 p-4 rounded-xl text-sm focus:outline-none focus:border-purple-500/50 text-white font-mono" />
              <input required name="contact" type="text" placeholder="КАНАЛ СВЯЗИ (TELEGRAM / EMAIL)" className="w-full bg-white/[0.02] border border-white/5 p-4 rounded-xl text-sm focus:outline-none focus:border-purple-500/50 text-white font-mono" />
              <textarea required name="message" placeholder="ТЕКСТ СИГНАЛА..." rows={4} className="w-full bg-white/[0.02] border border-white/5 p-4 rounded-xl text-sm focus:outline-none focus:border-purple-500/50 text-white font-mono resize-none" />
              
              <button 
                type="submit" 
                onMouseEnter={() => playCyberSound('hover')}
                className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)] cursor-pointer"
              >
                Отправить пакет данных →
              </button>
            </form>
          </div>
        </section>

      </div> {/* Закрывает тег контейнера контента страницы */}

      
    </div> // Закрывает тег самого главного компонента AbsoluteUltimateWebsite
  );
}
