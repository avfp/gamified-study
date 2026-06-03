import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales del tema Gamified Study
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Color principal
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Colores de éxito (para logros)
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Color principal
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        // Colores de advertencia (para streaks)
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Color principal
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Colores de peligro (para eliminar)
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // Color principal
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Colores neutros
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      // Gradientes personalizados
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        'gradient-success': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        'gradient-gaming': 'linear-gradient(135deg, #3b82f6 0%, #22c55e 50%, #f59e0b 100%)',
      },
      // Sombreados personalizados
      boxShadow: {
        'glow-primary': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-success': '0 0 20px rgba(34, 197, 94, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
