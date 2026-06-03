'use client';
import React from 'react';

const XP_PER_LEVEL = 100;

interface Chapter {
    id: number;
    title: string;
    status: 'completed' | 'in-progress' | 'locked'; 
}

interface ProgressBarProps {
  currentXP: number;
  streak?: number;
  chapters?: Chapter[];
  onToggleChapterStatus?: (id: number) => void;
}

export default function ProgressBar({ 
  currentXP, 
  streak = 0, 
  chapters = [], 
  onToggleChapterStatus 
}: ProgressBarProps): React.ReactElement {
  const remainingXP = currentXP % XP_PER_LEVEL;
  const percentage = (remainingXP / XP_PER_LEVEL) * 100;

  const handleToggleChapter = (chapterId: number) => {
    if (onToggleChapterStatus) {
      onToggleChapterStatus(chapterId);
    }
  };

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
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Contextual text */}
      <p className="text-xs text-gray-500 mt-1 italic">
        {remainingXP} / {XP_PER_LEVEL} XP to next level
      </p>

      {/* Streak Display */}
      <div className="p-4 bg-yellow-100 rounded-lg border mt-4">
        <h2 className="text-lg font-bold text-yellow-900">Current Streak: {streak} days</h2>
      </div>

      {/* Study Roadmap */}
      <div className="p-4 bg-yellow-100 rounded-lg border mt-4">
        <h2 className="text-lg font-bold text-yellow-900">Study Roadmap</h2>
        <div className="mt-2">
          {chapters.length > 0 && chapters.map((chapter) => (
            <div key={chapter.id} className="flex items-center justify-between mb-2">
              <span className={`font-medium ${
                chapter.status === 'completed' ? 'text-green-600' : 
                chapter.status === 'in-progress' ? 'text-yellow-600' : 
                'text-gray-500'
              }`}>
                {chapter.title}
              </span>
              <button 
                className={`px-2 py-1 text-xs rounded ${
                  chapter.status === 'completed' ? 'bg-green-200 text-green-800' : 
                  chapter.status === 'in-progress' ? 'bg-yellow-200 text-yellow-800' : 
                  'bg-gray-200 text-gray-800'
                }`}
                onClick={() => handleToggleChapter(chapter.id)}
              >
                {chapter.status === 'completed' ? 'Completed' : 
                 chapter.status === 'in-progress' ? 'In Progress' : 
                 'Locked'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
