'use client';
import React from 'react';

// For the MVP, let's say every level requires 100 XP.
// We will make this logic dynamic later!
const XP_PER_LEVEL = 100;

interface ProgressBarProps {
  currentXP: number;
}

export default function ProgressBar({ currentXP }: ProgressBarProps) {
  // 1. Calculate progress logic
  // Use modulo (%) to get XP remaining for the *current* level.
  const remainingXP = currentXP % XP_PER_LEVEL;
  // Calculate the percentage filled.
  const percentage = (remainingXP / XP_PER_LEVEL) * 100;

  return (
    <div className="mt-4">
      {/* Percentage Label */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-purple-700">Level Progress</span>
        <span className="text-sm font-semibold text-purple-700">{percentage.toFixed(0)}%</span>
      </div>

      {/* The Bar Container (Outer) */}
      <div className="w-full bg-purple-100 rounded-full h-4 shadow-inner overflow-hidden">
        {/* The Filled Bar (Inner) */}
        <div 
          className="bg-purple-600 h-4 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }} // Dynamic width
        />
      </div>
      
      {/* Contextual text */}
      <p className="text-xs text-gray-500 mt-1 italic">
        {remainingXP} / {XP_PER_LEVEL} XP to next level
      </p>
    </div>
  );
}