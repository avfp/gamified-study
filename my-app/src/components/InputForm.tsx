'use client';
import React, { useState } from 'react' ;
import { calculateXP } from '../lib/xpLogic' ;

export default function InputForm ({    onAddXP} : { onAddXP: (xp: number) => void }) {
    const [minutes, setMinutes] = useState(0);
    const [difficulty, setDifficulty] = useState(1);
    const [earnedXP, setEarnedXP] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (minutes <= 0) {
            alert('Please enter a valid number of minutes');
            return;
        }
        //streak is 0 for now
        const earned = calculateXP(minutes, difficulty, 0);
        setEarnedXP(earned);
        onAddXP(earned);
        setMinutes(0);
    };

    const getDifficultyLabel = (level: number) => {
        const labels = ['', 'Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];
        return labels[level] || 'Unknown';
    };

    return (
        <div className="p-6 border rounded-xl shadow-md bg-white mt-6">
            <form onSubmit = {handleSubmit} className="">
                <h2 className = "text-2xl font-bold mb-6">📝 Log Study Session</h2>
                
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Minutes Studied
                    </label>
                    <input 
                        type = "number"
                        placeholder = "Enter minutes"
                        value={minutes}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange = {(e) => setMinutes(Number(e.target.value))}
                    />
                </div>

                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-semibold text-gray-700">
                            Difficulty Level
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">
                                {difficulty === 1 && '😴'}
                                {difficulty === 2 && '😐'}
                                {difficulty === 3 && '😊'}
                                {difficulty === 4 && '😤'}
                                {difficulty === 5 && '🔥'}
                            </span>
                            <span className="text-lg font-bold text-blue-600">{difficulty}/5</span>
                        </div>
                    </div>
                    <input 
                        type = "range"
                        min = "1"
                        max = "5"
                        value={difficulty}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        onChange = {(e) => setDifficulty(Number(e.target.value))}
                    />
                    <p className="text-sm text-gray-600 mt-2">{getDifficultyLabel(difficulty)}</p>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-lg transition duration-200"
                >
                    Calculate XP
                </button>
            </form>

            {earnedXP !== null && (
                <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <p className="text-green-800 font-semibold">✓ You earned <span className="text-2xl text-green-600">{earnedXP} XP</span>!</p>
                </div>
            )}
        </div>
    );
};