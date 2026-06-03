'use client';
import { useLocalStorage } from '../src/hooks/useLocalStorage';
import Dashboard from '../src/components/Dashboard';
import InputForm from '../src/components/InputForm';

export default function Home() {
  const [totalXP, setTotalXP] = useLocalStorage('study-xp',0);

  return (
    <main className = "p-10 space-y-8">
      <h1 className = "text-3xl font-bold mb-6">Gamified Study Web</h1>
      <Dashboard totalXP = {totalXP} />
      <InputForm onAddXP={(earned: number) => setTotalXP(totalXP + earned) }/>
    </main>
  );
}