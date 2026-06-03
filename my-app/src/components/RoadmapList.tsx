'use client';
import React, { useState, useEffect } from 'react';

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface RoadmapData {
  id: number;
  userId: string;
  title: string;
  description: string;
  steps: RoadmapStep[];
  createdAt: string;
}

interface RoadmapListProps {
  userId: string;
  onSelectRoadmap?: (roadmap: RoadmapData) => void;
  onEditRoadmap?: (roadmap: RoadmapData) => void;
}

export default function RoadmapList({ userId, onSelectRoadmap, onEditRoadmap }: RoadmapListProps) {
  const [roadmaps, setRoadmaps] = useState<RoadmapData[]>([]);

  useEffect(() => {
    // Load roadmaps from localStorage
    const stored = localStorage.getItem(`user-roadmaps-${userId}`);
    if (stored) {
      try {
        setRoadmaps(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading roadmaps:', error);
      }
    }
  }, [userId]);

  const deleteRoadmap = (id: number) => {
    if (confirm('Are you sure you want to delete this roadmap?')) {
      const updated = roadmaps.filter((r) => r.id !== id);
      setRoadmaps(updated);
      localStorage.setItem(`user-roadmaps-${userId}`, JSON.stringify(updated));
    }
  };

  const getProgress = (roadmap: RoadmapData) => {
    if (roadmap.steps.length === 0) return 0;
    const completed = roadmap.steps.filter((s) => s.completed).length;
    return (completed / roadmap.steps.length) * 100;
  };

  return (
    <div className="p-6 border rounded-xl shadow-md bg-white mt-6">
      <h2 className="text-2xl font-bold mb-6">📚 Your Roadmaps ({roadmaps.length})</h2>

      {roadmaps.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No roadmaps yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadmaps.map((roadmap) => {
            const progress = getProgress(roadmap);
            const completedSteps = roadmap.steps.filter((s) => s.completed).length;

            return (
              <div
                key={roadmap.id}
                className="p-4 border rounded-lg hover:shadow-lg transition cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{roadmap.title}</h3>
                {roadmap.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{roadmap.description}</p>
                )}

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-700">
                      {completedSteps}/{roadmap.steps.length} steps
                    </span>
                    <span className="text-xs font-bold text-blue-600">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-2 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectRoadmap?.(roadmap)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded text-sm font-semibold transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEditRoadmap?.(roadmap)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded text-sm font-semibold transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRoadmap(roadmap.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded text-sm font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Helper to save roadmap
export function saveRoadmapToStorage(userId: string, roadmap: RoadmapData) {
  const stored = localStorage.getItem(`user-roadmaps-${userId}`);
  let roadmaps: RoadmapData[] = [];

  if (stored) {
    roadmaps = JSON.parse(stored);
  }

  // Update or add roadmap
  const index = roadmaps.findIndex((r) => r.id === roadmap.id);
  if (index >= 0) {
    roadmaps[index] = roadmap;
  } else {
    roadmaps.push(roadmap);
  }

  localStorage.setItem(`user-roadmaps-${userId}`, JSON.stringify(roadmaps));
  return roadmaps;
}
