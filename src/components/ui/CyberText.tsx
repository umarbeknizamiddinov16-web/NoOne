'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CyberTextProps {
  text: string;
  className?: string;
}

export default function CyberText({ text, className = '' }: CyberTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789X_#$@%+*";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startGlitch = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1 / 3;
    }, 25);
  };

  // Эффект срабатывает при загрузке и намертво вешается на наведение мыши
  useEffect(() => {
    startGlitch();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [text]);

  return (
    <span 
      onMouseEnter={startGlitch} // При каждом наведении мыши запускаем пересборку!
      className={`${className} cursor-default select-none inline-block font-mono`}
    >
      {displayText}
    </span>
  );
}
