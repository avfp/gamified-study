'use client';
import { useLocalStorage } from '../src/hooks/useLocalStorage';
import Dashboard from '../src/components/Dashboard';
import InputForm from '../src/components/InputForm';
import Roadmap from '../src/components/Roadmap';
import Achievements from '../src/components/Achievements';
import Leaderboard from '../src/components/Leaderboard';
import Notifications from '../src/components/Notifications';
import { calculateNewStreak } from '../src/lib/streakLogic';

// Type definitions
interface RoadmapItem {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'locked';
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

export default function Home() {
  const [totalXP, setTotalXP] = useLocalStorage('study-xp',0);
  const [streak, setStreak] = useLocalStorage('study-streak',0);
  const [lastActivityDate, setLastActivityDate] = useLocalStorage('last-activity-date', new Date().toISOString());
  const [isSignedIn, setIsSignedIn] = useLocalStorage('is-signed-in', false);
  const [userId, setUserId] = useLocalStorage('user-id', null);
  const [userEmail, setUserEmail] = useLocalStorage('user-email', null);
  const [userName, setUserName] = useLocalStorage('user-name', null);
  const [userProfilePic, setUserProfilePic] = useLocalStorage('user-profile-pic', null);  
  const [userRole, setUserRole] = useLocalStorage('user-role', 'student'); // Default role is 'student'
  const [userPreferences, setUserPreferences] = useLocalStorage('user-preferences', {
    theme: 'light',
    notifications: true,
  });
  const [chapters, setChapters] = useLocalStorage('study-chapters', [
    { id: 1, title: 'Chapter 1: Introduction to React', status: 'completed' },
    { id: 2, title: 'Chapter 2: State and Props', status: 'in-progress' },
    { id: 3, title: 'Chapter 3: Lifecycle Methods', status: 'locked' },
    { id: 4, title: 'Chapter 4: Hooks', status: 'locked' },
    { id: 5, title: 'Chapter 5: Advanced Patterns', status: 'locked' },
  ]);
  const [notifications, setNotifications] = useLocalStorage('study-notifications', [
    { id: 1, message: 'Welcome to the Gamified Study Platform!', read: false },
    { id: 2, message: 'You earned 50 XP for completing Chapter 1!', read: false },
    { id: 3, message: 'Your streak is now 3 days! Keep it up!', read: false },
  ]);
  const [achievements, setAchievements] = useLocalStorage('study-achievements', [
    { id: 1, title: 'First Steps', description: 'Complete your first chapter', earned: true },
    { id: 2, title: 'Getting Serious', description: 'Earn 200 XP', earned: false },
    { id: 3, title: 'Streak Master', description: 'Maintain a 7-day streak', earned: false },
  ]); 
  const [leaderboard, setLeaderboard] = useLocalStorage('study-leaderboard', [  
    { id: 1, name: 'Alice', xp: 500 },
    { id: 2, name: 'Bob', xp: 450 },
    { id: 3, name: 'Charlie', xp: 400 },
    { id: 4, name: 'David', xp: 350 },
    { id: 5, name: 'Eve', xp: 300 },
  ]);
  const [settings, setSettings] = useLocalStorage('study-settings', {
    theme: 'light',
    notifications: true,
    privacy: 'public',
  }); 
  const [roadmap, setRoadmap] = useLocalStorage('study-roadmap', [
    { id: 1, title: 'Basics', status: 'completed' as const },
    { id: 2, title: 'Intermediate Concepts', status: 'in-progress' as const },
    { id: 3, title: 'Advanced Techniques', status: 'locked' as const },
  ] as RoadmapItem[]);
  const [feedback, setFeedback] = useLocalStorage('study-feedback', [
    { id: 1, message: 'Great platform! Loving the gamification.', date: '2024-06-01' },
    { id: 2, message: 'Would love to see more chapter content.', date: '2024-06-02' },
    { id: 3, message: 'The streak feature is really motivating!', date: '2024-06-03' },
  ]);
  const [supportTickets, setSupportTickets] = useLocalStorage('study-support-tickets', [
    { id: 1, issue: 'Unable to earn XP', status: 'open', date: '2024-06-01' },
    { id: 2, issue: 'Streak not updating correctly', status: 'in-progress', date: '2024-06-02' },
    { id: 3, issue: 'Chapter content not loading', status: 'resolved', date: '2024-06-03' },
  ]);
  const [adminPanel, setAdminPanel] = useLocalStorage('study-admin-panel', {
    userManagement: {
      totalUsers: 1000,
      activeUsers: 200,
      userRoles: {
        student: 800,
        teacher: 150,
        admin: 50,
      },
    },
    contentManagement: {
      totalChapters: 20,
      publishedChapters: 15,
      draftChapters: 5,
    },
    analytics: {
      dailyActiveUsers: 150,
      weeklyActiveUsers: 300,
      monthlyActiveUsers: 500,
    },
  });
  const [analytics, setAnalytics] = useLocalStorage('study-analytics', {
    dailyActiveUsers: 150,
    weeklyActiveUsers: 300,
    monthlyActiveUsers: 500,
    averageSessionDuration: '15m',
    retentionRate: '75%',
  }); 
  const [contentManagement, setContentManagement] = useLocalStorage('study-content-management', {
    totalChapters: 20,
    publishedChapters: 15,
    draftChapters: 5,
  });
  
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
    <main className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">🎓 Gamified Study Platform</h1>
        <p className="text-gray-600 mt-2">Master your skills and climb the leaderboard!</p>
      </header>
      
      <Dashboard totalXP={totalXP} streak={streak} />
      <InputForm onAddXP={handleAddXP} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Roadmap roadmap={roadmap} />
        <Notifications notifications={notifications} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Achievements achievements={achievements} />
        <Leaderboard leaderboard={leaderboard} />
      </div>
    </main>
  );
}
