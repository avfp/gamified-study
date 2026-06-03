'use client';
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (userId: string, userName: string) => void;
}

export default function SimpleLogin({ onLogin }: LoginProps) {
  const [userName, setUserName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      // Use a simple hash or the username as userId
      const userId = `user-${userName.toLowerCase().replace(/\s+/g, '-')}`;
      onLogin(userId, userName);
      localStorage.setItem('current-user', JSON.stringify({ userId, userName }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-sage-500 to-white-600 flex items-center justify-center">
      <div className="bg-mint p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <h1 className="text-4xl font-bold text-center mb-2">M.A.R.G.O.</h1>
        <p className="text-center text-gray-600 mb-8">Gamified Study Platform</p>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-sage-500 hover:bg-gray-300 text-cream-600 font-bold py-3 px-4 rounded-lg mb-3 transition"
          >
            Get Started
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What's your name?
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={!userName.trim()}
                className="flex-1 bg-sage-500 hover:bg-sage-600 disabled:bg-gray-400 text-cream-600 font-bold py-2 px-4 rounded-lg transition"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setUserName('');
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
              >
                Back
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>No real authentication - for demonstration only</p>
        </div>
      </div>
    </div>
  );
}
