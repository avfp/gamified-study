'use client';
import React from 'react';
import ProgressBar from './ProgressBar';        

interface DashboardProps {
  totalXP: number;
  streak: number; 
}

export default function Dashboard({ totalXP }: DashboardProps) {
  // For now, let's keep the Level logic simple:
  // Level = Total XP / 100, rounded down, minimum 1.
  const level = Math.floor(totalXP / 100) + 1;

  return (
    <div className="p-6 border rounded-xl shadow-md bg-white">
      {/* Top Section ... keep the existing levela nd total xp code*/}

      {/* Stats Header */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b">
        <h1 className="text-2xl font-extrabold text-gray-900">Your Stats</h1>
        <div className="flex gap-4">
          {/* Level Display */}
          <div className="px-4 py-2 bg-purple-100 rounded-full border border-purple-200">
            <p className="text-sm text-purple-900 font-bold">Level {level}</p>
          </div>
          {/* Total XP Display */}
          <div className="px-4 py-2 bg-blue-100 rounded-full border border-blue-200">
            <p className="text-sm text-blue-900 font-bold">{totalXP} Total XP</p>
          </div>
        </div>
      </div>

      {/* Progress Bar Section (The actual implementation) */}
      <div className="p-4 bg-gray-50 rounded-lg border">
        <ProgressBar currentXP={totalXP} />
      </div>
    </div>
  );
}
     