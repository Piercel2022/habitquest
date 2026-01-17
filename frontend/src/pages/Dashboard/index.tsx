import React, { useState } from 'react';
import { Swords, Trophy, Flame, Target, TrendingUp, Zap, Crown, Calendar, Plus, Check, X } from 'lucide-react';

const Dashboard = () => {
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [habits, setHabits] = useState([
    { id: 1, name: 'Méditation matinale', streak: 12, completed: true, xp: 50, category: 'health', icon: '🧘' },
    { id: 2, name: 'Lire 30 minutes', streak: 8, completed: false, xp: 40, category: 'learning', icon: '📚' },
    { id: 3, name: 'Exercice physique', streak: 5, completed: true, xp: 60, category: 'health', icon: '💪' },
    { id: 4, name: 'Apprendre le code', streak: 15, completed: false, xp: 75, category: 'learning', icon: '💻' },
  ]);

  const user = {
    name: 'Aventurier',
    level: 12,
    xp: 2450,
    xpToNextLevel: 3000,
    coins: 850,
    avatar: '⚔️',
    profile: 'Achiever'
  };

  const dailyQuest = {
    title: 'Conquérant du Jour',
    description: 'Complète 3 habitudes aujourd\'hui',
    progress: 2,
    total: 3,
    reward: 150
  };

  const activeBoss = {
    name: 'Le Procrastinateur',
    health: 650,
    maxHealth: 1000,
    level: 8,
    emoji: '😴'
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  const completedToday = habits.filter(h => h.completed).length;
  const xpProgress = (user.xp / user.xpToNextLevel) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{user.avatar}</div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <p className="text-purple-300 text-sm">Profil: {user.profile}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-bold">{user.coins}</span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-bold">Niveau {user.level}</span>
                </div>
                <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{user.xp} / {user.xpToNextLevel} XP</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quête quotidienne */}
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/30 rounded-xl">
                    <Target className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{dailyQuest.title}</h2>
                    <p className="text-amber-200 text-sm">{dailyQuest.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-400 font-bold">
                    <Trophy className="w-4 h-4" />
                    <span>+{dailyQuest.reward} XP</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-amber-200">
                  <span>Progression</span>
                  <span>{dailyQuest.progress} / {dailyQuest.total}</span>
                </div>
                <div className="h-3 bg-black/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                    style={{ width: `${(dailyQuest.progress / dailyQuest.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Habitudes du jour */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">Habitudes du Jour</h2>
                </div>
                <button 
                  onClick={() => setShowAddHabit(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              </div>

              <div className="space-y-3">
                {habits.map(habit => (
                  <div 
                    key={habit.id}
                    className={`group p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      habit.completed 
                        ? 'bg-green-500/20 border-green-500/50' 
                        : 'bg-white/5 border-white/10 hover:border-purple-500/50'
                    }`}
                    onClick={() => toggleHabit(habit.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        habit.completed ? 'bg-green-500/30' : 'bg-purple-500/20'
                      }`}>
                        {habit.completed ? (
                          <Check className="w-6 h-6 text-green-400" />
                        ) : (
                          <span>{habit.icon}</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`font-bold ${habit.completed ? 'text-green-300 line-through' : 'text-white'}`}>
                          {habit.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-orange-400 text-sm">
                            <Flame className="w-4 h-4" />
                            <span className="font-bold">{habit.streak}</span>
                            <span className="text-orange-300">jours</span>
                          </div>
                          <div className="flex items-center gap-1 text-cyan-400 text-sm">
                            <Zap className="w-4 h-4" />
                            <span className="font-bold">+{habit.xp} XP</span>
                          </div>
                        </div>
                      </div>

                      {!habit.completed && (
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-medium">
                          Valider
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-purple-200">Progression du jour</span>
                  <span className="text-white font-bold">{completedToday} / {habits.length}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Boss Battle */}
            <div className="bg-gradient-to-br from-red-500/20 to-rose-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Swords className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-bold text-white">Boss Actif</h2>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{activeBoss.emoji}</div>
                <h3 className="text-xl font-bold text-white">{activeBoss.name}</h3>
                <p className="text-red-300 text-sm">Niveau {activeBoss.level}</p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-red-200">
                  <span>Points de vie</span>
                  <span>{activeBoss.health} / {activeBoss.maxHealth}</span>
                </div>
                <div className="h-4 bg-black/30 rounded-full overflow-hidden border border-red-500/30">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-500"
                    style={{ width: `${(activeBoss.health / activeBoss.maxHealth) * 100}%` }}
                  />
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-xl text-white font-bold transition-all transform hover:scale-105">
                Attaquer le Boss
              </button>
            </div>

            {/* Statistiques rapides */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold text-white">Stats Rapides</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Série en cours</span>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-400" />
                    <span className="text-white font-bold text-lg">15 jours</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Cette semaine</span>
                  <span className="text-green-400 font-bold">92%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total XP gagné</span>
                  <span className="text-cyan-400 font-bold">12,450</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Boss vaincus</span>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-bold">7</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal Ajout Habitude */}
      {showAddHabit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Nouvelle Habitude</h2>
              <button 
                onClick={() => setShowAddHabit(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <input 
                type="text"
                placeholder="Nom de l'habitude"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500">
                <option>Catégorie</option>
                <option>🏃 Santé</option>
                <option>📚 Apprentissage</option>
                <option>💼 Productivité</option>
                <option>🎨 Créativité</option>
              </select>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowAddHabit(false)}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors"
                >
                  Annuler
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-bold transition-all">
                  Créer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;