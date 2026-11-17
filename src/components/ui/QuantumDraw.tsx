// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { motion } from 'motion/react';

// interface DrawingLine {
//   id: number;
//   points: { x: number; y: number }[];
//   scale: number;
//   rotation: number;
//   position: { x: number; y: number };
//   targetPosition: { x: number; y: number };
// }

// export default function QuantumDraw() {
//   const [lines, setLines] = useState<DrawingLine[]>([]);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [selectedLine, setSelectedLine] = useState<number | null>(null);
//   const [isRotating, setIsRotating] = useState(false);

//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const currentLinePoints = useRef<{ x: number; y: number }[]>([]);
//   const startRotateAngle = useRef<number>(0);
//   const startLineRotation = useRef<number>(0);

//   const getCoords = (e: any) => {
//     if (!canvasRef.current) return { x: 0, y: 0 };
//     const rect = canvasRef.current.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;
//     return {
//       x: clientX - rect.left,
//       y: clientY - rect.top,
//     };
//   };

//   const startDrawing = (e: any) => {
//     if (e.target.tagName !== 'CANVAS' || isRotating) return;
//     setIsDrawing(true);
//     const coords = getCoords(e);
//     currentLinePoints.current = [coords];
//   };

//   const draw = (e: any) => {
//     if (isDrawing) {
//       const coords = getCoords(e);
//       currentLinePoints.current.push(coords);
//       const canvas = canvasRef.current;
//       if (canvas) {
//         const ctx = canvas.getContext('2d');
//         if (ctx) drawAllLines(ctx);
//       }
//     }
//   };

//   const getLineCenter = (line: DrawingLine) => {
//     if (!line.points || line.points.length === 0) return { x: 0, y: 0 };
//     const firstPt = line.points[0];
//     return {
//       x: firstPt.x + line.position.x,
//       y: firstPt.y + line.position.y
//     };
//   };


//   useEffect(() => {
//     const handleGlobalMove = (e: any) => {
//       if (!isRotating || selectedLine === null) return;

//       const activeLine = lines.find(l => l.id === selectedLine);
//       if (!activeLine) return;

//       const coords = getCoords(e);
//       const center = getLineCenter(activeLine);

//       const currentAngle = Math.atan2(coords.y - center.y, coords.x - center.x);
//       const angleDiff = currentAngle - startRotateAngle.current;

//       setLines(prev =>
//         prev.map(l =>
//           l.id === selectedLine
//             ? { ...l, rotation: startLineRotation.current + angleDiff }
//             : l
//         )
//       );

//       if (canvasRef.current) {
//         const ctx = canvasRef.current.getContext('2d');
//         if (ctx) drawAllLines(ctx);
//       }
//     };

//     const handleGlobalUp = () => {
//       if (isRotating) setIsRotating(false);
//     };

//     window.addEventListener('mousemove', handleGlobalMove);
//     window.addEventListener('mouseup', handleGlobalUp);
//     window.addEventListener('touchmove', handleGlobalMove, { passive: true });
//     window.addEventListener('touchend', handleGlobalUp);

//     return () => {
//       window.removeEventListener('mousemove', handleGlobalMove);
//       window.removeEventListener('mouseup', handleGlobalUp);
//       window.removeEventListener('touchmove', handleGlobalMove);
//       window.removeEventListener('touchend', handleGlobalUp);
//     };
//   }, [isRotating, selectedLine, lines]);
//   // ОТРИСОВКА ВСЕХ НЕОНОВЫХ КВАНТОВЫХ ЛИНИЙ НА МЕСТЕ
//   const drawAllLines = (ctx: CanvasRenderingContext2D) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     lines.forEach((line) => {
//       if (!line.points || line.points.length < 2) return;

//       ctx.save();
//       const firstPt = line.points[0];
//       ctx.translate(firstPt.x + line.position.x, firstPt.y + line.position.y);
//       ctx.rotate(line.rotation);
//       ctx.scale(line.scale, line.scale);
//       ctx.translate(-firstPt.x, -firstPt.y);

//       ctx.beginPath();
//       ctx.moveTo(line.points[0].x, line.points[0].y);
//       for (let i = 1; i < line.points.length; i++) {
//         ctx.lineTo(line.points[i].x, line.points[i].y);
//       }

//       const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//       grad.addColorStop(0, '#06b6d4');
//       grad.addColorStop(0.5, '#a855f7');
//       grad.addColorStop(1, '#f43f5e');

//       ctx.strokeStyle = grad;
//       ctx.lineWidth = 4;
//       ctx.lineCap = 'round';
//       ctx.lineJoin = 'round';
//       ctx.shadowBlur = 14;
//       ctx.shadowColor = '#a855f7';
//       ctx.stroke();
//       ctx.restore();
//     });

//     if (isDrawing && currentLinePoints.current.length >= 2) {
//       ctx.save();
//       ctx.beginPath();
//       ctx.moveTo(currentLinePoints.current[0].x, currentLinePoints.current[0].y);
//       for (let i = 1; i < currentLinePoints.current.length; i++) {
//         ctx.lineTo(currentLinePoints.current[i].x, currentLinePoints.current[i].y);
//       }
//       const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//       grad.addColorStop(0, '#06b6d4');
//       grad.addColorStop(1, '#a855f7');
//       ctx.strokeStyle = grad;
//       ctx.lineWidth = 4;
//       ctx.lineCap = 'round';
//       ctx.lineJoin = 'round';
//       ctx.shadowBlur = 15;
//       ctx.shadowColor = '#06b6d4';
//       ctx.stroke();
//       ctx.restore();
//     }
//   };

//   const stopDrawing = () => {
//     if (isDrawing) {
//       setIsDrawing(false);
//       if (currentLinePoints.current.length >= 2) {
//         const newLine: DrawingLine = {
//           id: Date.now(),
//           points: [...currentLinePoints.current],
//           scale: 1,
//           rotation: 0,
//           position: { x: 0, y: 0 },
//           targetPosition: { x: 0, y: 0 },
//         };
//         setLines((prev) => [...prev, newLine]);
//         setSelectedLine(newLine.id);
//       }
//       currentLinePoints.current = [];
//     }
//   };

//   // ИСПРАВЛЕНО: Поставили жесткие тормоза на инерцию, чтобы линии физически не могли улететь
//   useEffect(() => {
//     let animationFrameId: number;
//     const updatePhysics = () => {
//       setLines((prevLines) => {
//         let changed = false;
//         const nextLines = prevLines.map((line) => {
//           let dx = line.targetPosition.x - line.position.x;
//           let dy = line.targetPosition.y - line.position.y;

//           // ОГРАНИЧИТЕЛЬ (ТОРМОЗА): Если шаг слишком огромный из-за рывка мыши, режем его до безопасных 60px
//           const maxClamp = 60;
//           if (dx > maxClamp) dx = maxClamp;
//           if (dx < -maxClamp) dx = -maxClamp;
//           if (dy > maxClamp) dy = maxClamp;
//           if (dy < -maxClamp) dy = -maxClamp;

//           if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
//             changed = true;
//             return {
//               ...line,
//               position: {
//                 x: line.position.x + dx * 0.15, // Хлесткий докат без дрейфа
//                 y: line.position.y + dy * 0.15,
//               },
//             };
//           }
//           return line;
//         });
//         if (changed && canvasRef.current) {
//           const ctx = canvasRef.current.getContext('2d');
//           if (ctx) drawAllLines(ctx);
//         }
//         return nextLines;
//       });
//       animationFrameId = requestAnimationFrame(updatePhysics);
//     };
//     animationFrameId = requestAnimationFrame(updatePhysics);
//     return () => cancelAnimationFrame(animationFrameId);
//   }, [lines]);

//   useEffect(() => {
//     const updateCanvasSize = () => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
//       canvas.width = window.innerWidth;
//       canvas.height = document.documentElement.scrollHeight;
//       const ctx = canvas.getContext('2d');
//       if (ctx) drawAllLines(ctx);
//     };
//     updateCanvasSize();
//     window.addEventListener('resize', updateCanvasSize);
//     return () => window.removeEventListener('resize', updateCanvasSize);
//   }, [lines]);

//   const changeScale = (factor: number) => {
//     if (selectedLine === null) return;
//     setLines((prev) =>
//       prev.map((line) =>
//         line.id === selectedLine
//           ? { ...line, scale: Math.max(0.2, Math.min(5, line.scale * factor)) }
//           : line
//       )
//     );
//   };

//   const clearCanvas = () => {
//     setLines([]);
//     setSelectedLine(null);
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   return (
//     <div className="absolute inset-0 z-40 pointer-events-none w-full h-full">
//       <canvas
//         ref={canvasRef}
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={stopDrawing}
//         onMouseLeave={stopDrawing}
//         onTouchStart={startDrawing}
//         onTouchMove={draw}
//         onTouchEnd={stopDrawing}
//         className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair bg-transparent"
//       />

//       {lines.map((line) => {
//         if (!line.points || line.points.length === 0) return null;
//         const firstPoint = line.points[0];

//         return (
//           <motion.div
//             key={line.id}
//             drag
//             dragMomentum={false}
//             onDrag={(e, info) => {
//               setLines((prev) =>
//                 prev.map((l) =>
//                   l.id === line.id
//                     ? {
//                       ...l,
//                       targetPosition: {
//                         x: l.targetPosition.x + info.delta.x,
//                         y: l.targetPosition.y + info.delta.y,
//                       },
//                     }
//                     : l
//                 )
//               );
//             }}
//             onPointerDown={(e) => {
//               e.stopPropagation();
//               setSelectedLine(line.id);
//             }}
//             style={{
//               left: firstPoint.x + line.position.x,
//               top: firstPoint.y + line.position.y,
//             }}
//             className={`absolute w-6 h-6 md:w-5 md:h-5 -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-sm pointer-events-auto cursor-move flex items-center justify-center transition-colors z-50 ${selectedLine === line.id
//                 ? 'bg-purple-500/20 border-purple-400 shadow-[0_0_15px_#a855f7]'
//                 : 'bg-white/5 border-white/20'
//               }`}
//           >
//             <div className="w-1.5 h-1.5 md:w-1 md:h-1 rounded-full bg-white" />
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// }
