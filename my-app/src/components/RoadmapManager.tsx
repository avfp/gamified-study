'use client';
import React, { useState } from 'react';

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

interface RoadmapManagerProps {
  userId: string;
  onSave?: (roadmap: RoadmapData) => void;
  initialRoadmap?: RoadmapData;
}

export default function RoadmapManager({ userId, onSave, initialRoadmap }: RoadmapManagerProps) {
  const [title, setTitle] = useState(initialRoadmap?.title || '');
  const [description, setDescription] = useState(initialRoadmap?.description || '');
  const [steps, setSteps] = useState<RoadmapStep[]>(initialRoadmap?.steps || []);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepDescription, setNewStepDescription] = useState('');

  const addStep = () => {
    if (!newStepTitle.trim()) {
      alert('Please enter a step title');
      return;
    }
    if (steps.length >= 20) {
      alert('Maximum 20 steps per roadmap');
      return;
    }

    const newStep: RoadmapStep = {
      id: Date.now(),
      title: newStepTitle,
      description: newStepDescription,
      completed: false,
    };

    setSteps([...steps, newStep]);
    setNewStepTitle('');
    setNewStepDescription('');
  };

  const removeStep = (id: number) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const toggleStepCompletion = (id: number) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a roadmap title');
      return;
    }
    if (steps.length === 0) {
      alert('Please add at least one step');
      return;
    }

    const roadmap: RoadmapData = {
      id: initialRoadmap?.id || Date.now(),
      userId,
      title,
      description,
      steps,
      createdAt: initialRoadmap?.createdAt || new Date().toISOString(),
    };

    onSave?.(roadmap);
  };

  const completedCount = steps.filter((s) => s.completed).length;
  const progress = steps.length > 0 ? (completedCount / steps.length) * 100 : 0;

  return (
    <div className="p-6 border rounded-xl shadow-md bg-white mt-6">
      <h2 className="text-2xl font-bold mb-6">
        {initialRoadmap ? '✏️ Edit Roadmap' : '🆕 Create New Roadmap'}
      </h2>

      {/* Roadmap Info */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Roadmap Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Learn React"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your roadmap..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
      </div>

      {/* Progress Bar */}
      {steps.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Progress</span>
            <span className="text-sm font-bold text-blue-600">
              {completedCount}/{steps.length} ({Math.round(progress)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-500 h-3 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Add Step */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
        <h3 className="text-lg font-bold mb-3">➕ Add Step</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={newStepTitle}
            onChange={(e) => setNewStepTitle(e.target.value)}
            placeholder="Step title"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={steps.length >= 20}
          />
          <textarea
            value={newStepDescription}
            onChange={(e) => setNewStepDescription(e.target.value)}
            placeholder="Step description (optional)"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            disabled={steps.length >= 20}
          />
          <button
            onClick={addStep}
            disabled={steps.length >= 20}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold p-2 rounded-lg transition"
          >
            Add Step {steps.length >= 20 && '(Max reached)'}
          </button>
        </div>
      </div>

      {/* Steps List */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">📋 Steps ({steps.length}/20)</h3>
        <div className="space-y-2">
          {steps.length === 0 ? (
            <p className="text-gray-500 italic">No steps yet. Add your first step above!</p>
          ) : (
            steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-3 rounded-lg border-l-4 flex justify-between items-start ${
                  step.completed
                    ? 'bg-green-50 border-green-500'
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={step.completed}
                      onChange={() => toggleStepCompletion(step.id)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <h4 className={`font-semibold ${step.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {index + 1}. {step.title}
                    </h4>
                  </div>
                  {step.description && (
                    <p className="text-sm text-gray-600 ml-7">{step.description}</p>
                  )}
                </div>
                <button
                  onClick={() => removeStep(step.id)}
                  className="ml-2 text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-lg transition"
      >
        {initialRoadmap ? '💾 Update Roadmap' : '💾 Save Roadmap'}
      </button>
    </div>
  );
}
