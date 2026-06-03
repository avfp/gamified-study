'use client';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../src/hooks/useLocalStorage';
import Dashboard from '../src/components/Dashboard';
import InputForm from '../src/components/InputForm';
import Achievements from '../src/components/Achievements';
import Leaderboard from '../src/components/Leaderboard';
import Notifications from '../src/components/Notifications';
import RoadmapManager from '../src/components/RoadmapManager';
import RoadmapList, { saveRoadmapToStorage } from '../src/components/RoadmapList';
import SimpleLogin from '../src/components/SimpleLogin';
import { calculateNewStreak } from '../src/lib/streakLogic';

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

interface Achievement {
  id: number;
  title: string;
  description: string;
  earned: boolean;
}

interface LeaderboardEntry {
  id: number;
  name: string;
  xp: number;
}

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

interface CurrentUser {
  userId: string;
  userName: string;
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [showRoadmapManager, setShowRoadmapManager] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState<RoadmapData | null>(null);
  
  const [totalXP, setTotalXP] = useLocalStorage('study-xp', 0);
  const [streak, setStreak] = useLocalStorage('study-streak', 0);
  const [lastActivityDate, setLastActivityDate] = useLocalStorage('last-activity-date', new Date().toISOString());

  const [achievements] = useLocalStorage<Achievement[]>('study-achievements', [
    { id: 1, title: 'First Steps', description: 'Complete your first roadmap', earned: true },
    { id: 2, title: 'Getting Serious', description: 'Earn 200 XP', earned: false },
    { id: 3, title: 'Roadmap Master', description: 'Create 5 roadmaps', earned: false },
  ]);

  const [leaderboard] = useLocalStorage<LeaderboardEntry[]>('study-leaderboard', [
    { id: 1, name: 'Alice', xp: 500 },
    { id: 2, name: 'Bob', xp: 450 },
    { id: 3, name: 'Charlie', xp: 400 },
    { id: 4, name: 'David', xp: 350 },
    { id: 5, name: 'Eve', xp: 300 },
  ]);

  const [notifications] = useLocalStorage<Notification[]>('study-notifications', [
    { id: 1, message: 'Welcome to Gamified Study!', read: false },
    { id: 2, message: 'Create your first roadmap to get started', read: false },
  ]);

  useEffect(() => {
    const stored = localStorage.getItem('current-user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }, []);

  const handleLogin = (userId: string, userName: string) => {
    setCurrentUser({ userId, userName });
  };

  const handleAddXP = (earned: number) => {
    const newTotalXP = totalXP + earned;
    setTotalXP(newTotalXP);

    const currentDate = new Date();
    const lastDate = new Date(lastActivityDate);
    const newStreak = calculateNewStreak(streak, lastDate, currentDate);
    setStreak(newStreak);
    setLastActivityDate(currentDate.toISOString());
  };

  const handleSaveRoadmap = (roadmap: RoadmapData) => {
    if (currentUser) {
      saveRoadmapToStorage(currentUser.userId, roadmap);
      setShowRoadmapManager(false);
      setEditingRoadmap(null);
      alert('Roadmap saved successfully!');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('current-user');
  };

  if (!currentUser) {
    return <SimpleLogin onLogin={handleLogin} />;
  }

  return (
    <main className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">🎓 Gamified Study Platform</h1>
          <p className="text-gray-600 mt-1">Welcome, <span className="font-bold text-blue-600">{currentUser.userName}</span>!</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Logout
        </button>
      </header>

      {/* Main Stats */}
      <Dashboard totalXP={totalXP} streak={streak} />
      <InputForm onAddXP={handleAddXP} />

      {/* Roadmap Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">📚 My Roadmaps</h2>
          <button
            onClick={() => {
              setEditingRoadmap(null);
              setShowRoadmapManager(!showRoadmapManager);
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {showRoadmapManager ? '❌ Cancel' : '➕ Create Roadmap'}
          </button>
        </div>

        {showRoadmapManager && (
          <RoadmapManager
            userId={currentUser.userId}
            onSave={handleSaveRoadmap}
            initialRoadmap={editingRoadmap || undefined}
          />
        )}

        {!showRoadmapManager && <RoadmapList userId={currentUser.userId} />}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Achievements achievements={achievements} />
        <Leaderboard leaderboard={leaderboard} />
      </div>

      {/* Notifications */}
      <Notifications notifications={notifications} />
    </main>
  );
}
