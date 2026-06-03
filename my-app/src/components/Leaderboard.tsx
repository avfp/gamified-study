'use client';
import React from 'react';

interface LeaderboardEntry {
  id: number;
  name: string;
  xp: number;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
}

export default function Leaderboard({ leaderboard }: LeaderboardProps) {
  return (
    <div className="p-6 border rounded-xl shadow-md bg-white mt-6">
      <h2 className="text-2xl font-bold mb-4">🏅 Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="pb-3 font-bold text-gray-900">Rank</th>
              <th className="pb-3 font-bold text-gray-900">Player</th>
              <th className="pb-3 font-bold text-gray-900 text-right">XP</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr
                key={entry.id}
                className={`border-b border-gray-200 hover:bg-blue-50 transition ${
                  index === 0 ? 'bg-yellow-50' : index === 1 ? 'bg-gray-100' : ''
                }`}
              >
                <td className="py-3 font-bold text-gray-900">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && `#${index + 1}`}
                </td>
                <td className="py-3 font-semibold text-gray-900">{entry.name}</td>
                <td className="py-3 text-right font-bold text-purple-600">{entry.xp} XP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
