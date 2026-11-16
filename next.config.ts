import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // УЛЬТИМАТИВНАЯ НАСТРОЙКА ДВИЖКА TURBOPACK
  turbopack: {
    rules: {
      // Регистрируем файлы mp3 как системный медиа-ресурс
      '*.mp3': {
        type: 'asset',
      },
    },
  },
};

export default nextConfig;
