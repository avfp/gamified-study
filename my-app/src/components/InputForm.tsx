'use client';
import React, { useState } from 'react' ;
import { calculateXP } from '../lib/xpLogic' ;

export default function InputForm ({    onAddXP} : { onAddXP: (xp: number) => void }) {
    const [minutes, setMinutes] = useState(0);
    const [difficulty, setDifficulty] = useState(1);
    const [earnedXP, setEarnedXP] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //streak is 0 for now
        const earned = calculateXP(minutes, difficulty, 0);
        onAddXP(earned);
    };

    return (
        <div className="p-4 border rounded-lg">
            <form onSubmit = {handleSubmit} className="p-4 boder rounded-lg">
                <h2 className = "text-xl font-bold mb-4">Log Study Session</h2>
                <input 
                    type = "number"
                    placeholder = "Minutes"
                    className="block boder p-2 mb-2 w-full"
                    onChange = {(e) => setMinutes(Number(e.target.value))}
                />
                <input 
                    type = "number"
                    placeholder = "Difficulty (1-5)"
                    className="block boder p-2 mb-2 w-full"
                    onChange = {(e) => setDifficulty(Number(e.target.value))}
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Calculate XP
                </button>
            </form>

            {earnedXP !== null && (
                <div className="mt-4 p-2 bg-green-100 border-green-500 rounded">
                    You earned {earnedXP} XP!
                </div>
            )}
        </div>
    );
};