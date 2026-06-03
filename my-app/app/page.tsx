'use client';
import { useLocalStorage } from '../src/hooks/useLocalStorage';
import Dashboard from '../src/components/Dashboard';
import InputForm from '../src/components/InputForm';

export default function Home() {
  const [totalXP, setTotalXP] = useLocalStorage('study-xp',0);
  const [streak, setStreak] = useLocalStorage('study-streak',0);
  const [lastActivityDate, setLastActivityDate] = useLocalStorage('last-activity-date', new Date().toISOString());

  const handleAddXP = (earned: number) => {
    const newTotalXP = totalXP + earned;
    setTotalXP(newTotalXP);

    // Update streak logic
    const currentDate = new Date();
    const lastDate = new Date(lastActivityDate);
    const newStreak = calculateNewStreak(streak, lastDate, currentDate);
    setStreak(newStreak);
    setLastActivityDate(currentDate.toISOString());
  };

  return (
    <main className = "p-10 space-y-8">
      <h1 className = "text-3xl font-bold mb-6">Gamified Study Web</h1>
      <Dashboard totalXP = {totalXP} />
      <InputForm onAddXP={(earned: number) => setTotalXP(totalXP + earned) }/>
    </main>
  );
}