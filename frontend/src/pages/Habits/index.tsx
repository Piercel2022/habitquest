import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, TrendingUp, Calendar, Zap, Trophy, Target, ChevronDown } from 'lucide-react';

// Types
interface Habit {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'productivity' | 'learning' | 'social' | 'creative';
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
  frequency: 'daily' | 'weekly' | 'custom';
  streak: number;
  longestStreak: number;
  completedToday: boolean;
  xpReward: number;
  coinsReward: number;
  lastCompleted?: string;
  nextDue?: string;
  progress: number;
  icon?: string;
}

interface Stats {
  totalHabits: number;
  activeStreaks: number;
  completedToday: number;
  totalXP: number;
}

// Mock data
const mockHabits: Habit[] = [
  {
    id: '1',
    title: 'Méditation matinale',
    description: '10 minutes de méditation au réveil',
    category: 'health',
    difficulty: 'easy',
    frequency: 'daily',
    streak: 12,
    longestStreak: 25,
    completedToday: true,
    xpReward: 50,
    coinsReward: 10,
    progress: 85,
    icon: '🧘',
  },
  {
    id: '2',
    title: 'Coder 1 heure',
    description: 'Pratiquer le développement web',
    category: 'learning',
    difficulty: 'medium',
    frequency: 'daily',
    streak: 7,
    longestStreak: 15,
    completedToday: false,
    xpReward: 100,
    coinsReward: 20,
    progress: 60,
    icon: '💻',
  },
  {
    id: '3',
    title: 'Sport intense',
    description: '30 minutes d\'exercice cardiovasculaire',
    category: 'health',
    difficulty: 'hard',
    frequency: 'daily',
    streak: 5,
    longestStreak: 10,
    completedToday: false,
    xpReward: 150,
    coinsReward: 30,
    progress: 40,
    icon: '🏃',
  },
  {
    id: '4',
    title: 'Lire 30 pages',
    description: 'Lecture de développement personnel',
    category: 'learning',
    difficulty: 'easy',
    frequency: 'daily',
    streak: 20,
    longestStreak: 20,
    completedToday: true,
    xpReward: 75,
    coinsReward: 15,
    progress: 90,
    icon: '📚',
  },
];

const mockStats: Stats = {
  totalHabits: 12,
  activeStreaks: 4,
  completedToday: 2,
  totalXP: 15420,
};

const HabitsPage: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const [stats, setStats] = useState<Stats>(mockStats);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'streak' | 'progress' | 'difficulty'>('streak');
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const categories = [
    { id: 'all', label: 'Toutes', icon: '🎯' },
    { id: 'health', label: 'Santé', icon: '💪' },
    { id: 'productivity', label: 'Productivité', icon: '⚡' },
    { id: 'learning', label: 'Apprentissage', icon: '🎓' },
    { id: 'social', label: 'Social', icon: '👥' },
    { id: 'creative', label: 'Créativité', icon: '🎨' },
  ];

  const difficulties = [
    { id: 'all', label: 'Toutes', color: 'gray' },
    { id: 'easy', label: 'Facile', color: 'green' },
    { id: 'medium', label: 'Moyen', color: 'yellow' },
    { id: 'hard', label: 'Difficile', color: 'orange' },
    { id: 'epic', label: 'Épique', color: 'purple' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      easy: 'bg-green-500',
      medium: 'bg-yellow-500',
      hard: 'bg-orange-500',
      epic: 'bg-purple-500',
    };
    return colors[difficulty] || 'bg-gray-500';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      health: 'bg-red-500',
      productivity: 'bg-blue-500',
      learning: 'bg-indigo-500',
      social: 'bg-pink-500',
      creative: 'bg-purple-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  const handleToggleHabit = (habitId: string) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === habitId
          ? {
              ...h,
              completedToday: !h.completedToday,
              streak: !h.completedToday ? h.streak + 1 : h.streak - 1,
            }
          : h
      )
    );
  };

  const filteredHabits = habits
    .filter(h => {
      const matchesSearch = h.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || h.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || h.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    })
    .sort((a, b) => {
      if (sortBy === 'streak') return b.streak - a.streak;
      if (sortBy === 'progress') return b.progress - a.progress;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Mes Habitudes
              </h1>
              <p className="text-sm text-gray-400 mt-1">Construis ta légende jour après jour</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Nouvelle Habitude</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Target size={24} className="text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-2xl font-bold">{stats.totalHabits}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-600/20 to-orange-600/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <TrendingUp size={24} className="text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Streaks actifs</p>
                <p className="text-2xl font-bold">{stats.activeStreaks}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-green-600/5 backdrop-blur-sm border border-green-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Calendar size={24} className="text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Aujourd'hui</p>
                <p className="text-2xl font-bold">{stats.completedToday}/{stats.totalHabits}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-600/5 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Zap size={24} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total XP</p>
                <p className="text-2xl font-bold">{stats.totalXP.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une habitude..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Filter size={20} />
              <span>Filtres</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              {/* Categories */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Catégorie</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="mr-1">{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Difficulté</p>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map(diff => (
                    <button
                      key={diff.id}
                      onClick={() => setSelectedDifficulty(diff.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedDifficulty === diff.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Habits List */}
        <div className="grid gap-4">
          {filteredHabits.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center">
              <Trophy size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">Aucune habitude trouvée</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Créer ma première habitude
              </button>
            </div>
          ) : (
            filteredHabits.map(habit => (
              <div
                key={habit.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleHabit(habit.id)}
                    className={`flex-shrink-0 w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${
                      habit.completedToday
                        ? 'bg-green-500 border-green-500 scale-110'
                        : 'border-white/20 hover:border-purple-500 hover:scale-105'
                    }`}
                  >
                    {habit.completedToday ? '✓' : habit.icon}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{habit.title}</h3>
                        <p className="text-sm text-gray-400">{habit.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 ${getDifficultyColor(habit.difficulty)} rounded text-xs font-semibold`}>
                          {habit.difficulty}
                        </span>
                        <span className={`px-2 py-1 ${getCategoryColor(habit.category)} rounded text-xs font-semibold`}>
                          {habit.category}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <TrendingUp size={16} className="text-orange-400" />
                        <span className="text-gray-300">Streak: <span className="font-bold text-orange-400">{habit.streak}</span> jours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy size={16} className="text-yellow-400" />
                        <span className="text-gray-300">Record: {habit.longestStreak}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap size={16} className="text-purple-400" />
                        <span className="text-gray-300">{habit.xpReward} XP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">💰</span>
                        <span className="text-gray-300">{habit.coinsReward} coins</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-300"
                        style={{ width: `${habit.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Créer une nouvelle habitude</h2>
            <p className="text-gray-400 mb-4">Formulaire de création à venir...</p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="w-full px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitsPage;