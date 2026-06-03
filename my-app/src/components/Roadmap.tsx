'use client';
import React from 'react';

interface RoadmapItem {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'locked';
}

interface RoadmapProps {
  roadmap: RoadmapItem[];
}

export default function Roadmap({ roadmap }: RoadmapProps) {
  const completedCount = roadmap.filter((item) => item.status === 'completed').length;

  return (
    <div className="p-6 border rounded-xl shadow-md bg-white mt-6">
      <h2 className="text-2xl font-bold mb-2">📚 Study Roadmap</h2>
      <p className="text-gray-600 mb-4 text-sm">
        Progress: {completedCount}/{roadmap.length} completed
      </p>
      <div className="space-y-3">
        {roadmap.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-lg border-l-4 ${
              item.status === 'completed'
                ? 'bg-green-50 border-green-500'
                : item.status === 'in-progress'
                ? 'bg-yellow-50 border-yellow-500'
                : 'bg-gray-50 border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-xl">
                {item.status === 'completed' && '✅'}
                {item.status === 'in-progress' && '⏳'}
                {item.status === 'locked' && '🔒'}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-600 capitalize">{item.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}