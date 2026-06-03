import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Dashboard({totalXP}: {totalXP: number}) {
    const [totalXP, setTotalXP] = useLocalStorage('study-xp', 0);

    return (
        <div className = "p-6 border rounded-xl shadow-md">
            <h1 className = "text-2xl font-bold">Your Stats</h1>
            <div className = "flex gap-4 mt-4">
                <div className = "p-4 bg-purple-100 rounded">
                    <p>Total XP</p>
                    <p className = "text-3xl font-bold">{totalXP}</span></p>
                </div>
            </div>
        </div>
    )
}