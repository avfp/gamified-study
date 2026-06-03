'use client';
import React from 'react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  earned: boolean;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <div className="p-6 border rounded-xl shadow-md bg-white mt-6">
      <h2 className="text-2xl font-bold mb-4">Achievements ({earnedCount}/{achievements.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border-2 ${
              achievement.earned
                ? 'bg-yellow-100 border-yellow-300'
                : 'bg-gray-100 border-gray-300 opacity-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">
                {achievement.earned ? '🏆' : '🔒'}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                <p className="text-sm text-gray-700">{achievement.description}</p>
                {achievement.earned && (
                  <p className="text-xs text-green-600 font-semibold mt-2">✓ Unlocked</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
