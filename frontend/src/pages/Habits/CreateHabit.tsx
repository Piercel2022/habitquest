import React, { useState } from 'react';
import { ArrowLeft, Target, Calendar, Trophy, Zap, Star, Info } from 'lucide-react';

// Types
interface HabitFormData {
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  frequency: 'daily' | 'weekly' | 'custom';
  customDays?: number[];
  icon: string;
  color: string;
  reminderTime?: string;
  xpReward: number;
}

const CreateHabit: React.FC = () => {
  const [formData, setFormData] = useState<HabitFormData>({
    title: '',
    description: '',
    category: 'health',
    difficulty: 'medium',
    frequency: 'daily',
    customDays: [],
    icon: '💪',
    color: '#8B5CF6',
    reminderTime: '',
    xpReward: 20
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Catégories prédéfinies
  const categories = [
    { id: 'health', name: 'Santé', icon: '💪', color: '#10B981' },
    { id: 'productivity', name: 'Productivité', icon: '🎯', color: '#3B82F6' },
    { id: 'learning', name: 'Apprentissage', icon: '📚', color: '#8B5CF6' },
    { id: 'mindfulness', name: 'Bien-être', icon: '🧘', color: '#EC4899' },
    { id: 'social', name: 'Social', icon: '👥', color: '#F59E0B' },
    { id: 'creative', name: 'Créativité', icon: '🎨', color: '#EF4444' }
  ];

  // Difficultés avec récompenses XP
  const difficulties = [
    { 
      id: 'easy', 
      name: 'Facile', 
      description: 'Une petite habitude simple',
      xp: 10,
      icon: '⭐',
      color: '#10B981'
    },
    { 
      id: 'medium', 
      name: 'Moyen', 
      description: 'Un défi motivant',
      xp: 20,
      icon: '⭐⭐',
      color: '#3B82F6'
    },
    { 
      id: 'hard', 
      name: 'Difficile', 
      description: 'Un vrai challenge',
      xp: 40,
      icon: '⭐⭐⭐',
      color: '#8B5CF6'
    },
    { 
      id: 'legendary', 
      name: 'Légendaire', 
      description: 'Pour les vrais héros',
      xp: 100,
      icon: '👑',
      color: '#F59E0B'
    }
  ];

  // Icônes disponibles
  const icons = [
    '💪', '🏃', '📚', '🎯', '🧘', '💻', '🎨', '🎵',
    '🍎', '💧', '😴', '🧠', '📝', '🎮', '🌟', '⚡',
    '🔥', '💎', '🏆', '🎪', '🌈', '☀️', '🌙', '✨'
  ];

  // Jours de la semaine
  const weekDays = [
    { id: 1, name: 'L', full: 'Lundi' },
    { id: 2, name: 'M', full: 'Mardi' },
    { id: 3, name: 'M', full: 'Mercredi' },
    { id: 4, name: 'J', full: 'Jeudi' },
    { id: 5, name: 'V', full: 'Vendredi' },
    { id: 6, name: 'S', full: 'Samedi' },
    { id: 0, name: 'D', full: 'Dimanche' }
  ];

  const colors = [
    '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', 
    '#EF4444', '#EC4899', '#6366F1', '#14B8A6'
  ];

  // Validation du formulaire
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) {
        newErrors.title = 'Le titre est requis';
      }
      if (formData.title.length > 50) {
        newErrors.title = 'Le titre ne doit pas dépasser 50 caractères';
      }
    }

    if (step === 3 && formData.frequency === 'custom') {
      if (!formData.customDays || formData.customDays.length === 0) {
        newErrors.customDays = 'Sélectionnez au moins un jour';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleDay = (dayId: number) => {
    const days = formData.customDays || [];
    if (days.includes(dayId)) {
      setFormData({
        ...formData,
        customDays: days.filter(d => d !== dayId)
      });
    } else {
      setFormData({
        ...formData,
        customDays: [...days, dayId]
      });
    }
  };

  const handleSubmit = () => {
    if (validateStep(4)) {
      alert('Habitude créée avec succès ! (Démo)');
      console.log('Création habitude:', formData);
    }
  };

  const handleDifficultyChange = (difficulty: string) => {
    const selected = difficulties.find(d => d.id === difficulty);
    setFormData({
      ...formData,
      difficulty: difficulty as any,
      xpReward: selected?.xp || 20
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Créer une habitude
              </h1>
            </div>
            <div className="w-20"></div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  step <= currentStep
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Étape {currentStep} sur 4
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Step 1: Informations de base */}
          {currentStep === 1 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Quelle habitude souhaitez-vous créer ?
                </h2>
                <p className="text-gray-600">
                  Donnez un nom et une description à votre nouvelle quête
                </p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Titre de l'habitude *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Faire du sport 30 minutes"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.title
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-purple-500 focus:ring-purple-200'
                    }`}
                    maxLength={50}
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">
                    {formData.title.length}/50 caractères
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description (optionnel)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Pourquoi cette habitude est importante pour vous..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all resize-none"
                    maxLength={200}
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    {formData.description.length}/200 caractères
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Icône
                    </label>
                    <div className="grid grid-cols-8 gap-2">
                      {icons.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon })}
                          className={`aspect-square rounded-lg flex items-center justify-center text-2xl transition-all ${
                            formData.icon === icon
                              ? 'bg-purple-100 ring-2 ring-purple-600 scale-110'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Couleur
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setFormData({ ...formData, color })}
                          className={`aspect-square rounded-lg transition-all ${
                            formData.color === color
                              ? 'ring-2 ring-offset-2 ring-gray-900 scale-110'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Catégorie et difficulté */}
          {currentStep === 2 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Trophy className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Catégorie et difficulté
                </h2>
                <p className="text-gray-600">
                  Classez votre habitude et définissez son niveau de challenge
                </p>
              </div>

              <div className="space-y-8 max-w-3xl mx-auto">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Catégorie
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                          formData.category === cat.id
                            ? 'border-gray-900 bg-gray-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{cat.icon}</div>
                        <div className="text-sm font-semibold text-gray-900">
                          {cat.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Niveau de difficulté
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {difficulties.map((diff) => (
                      <button
                        key={diff.id}
                        type="button"
                        onClick={() => handleDifficultyChange(diff.id)}
                        className={`p-5 rounded-xl border-2 transition-all hover:scale-105 text-left ${
                          formData.difficulty === diff.id
                            ? 'border-gray-900 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{
                          backgroundColor: formData.difficulty === diff.id 
                            ? `${diff.color}10` 
                            : 'white'
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-2xl mb-1">{diff.icon}</div>
                            <div className="text-lg font-bold text-gray-900">
                              {diff.name}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-sm font-semibold">
                            <Zap className="w-4 h-4" />
                            {diff.xp} XP
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {diff.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Fréquence */}
          {currentStep === 3 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Fréquence de l'habitude
                </h2>
                <p className="text-gray-600">
                  À quelle fréquence souhaitez-vous pratiquer cette habitude ?
                </p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, frequency: 'daily' })}
                    className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                      formData.frequency === 'daily'
                        ? 'border-purple-600 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 mb-1">
                          Tous les jours
                        </div>
                        <p className="text-sm text-gray-600">
                          Idéal pour construire une routine solide
                        </p>
                      </div>
                      <div className="text-2xl">📅</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, frequency: 'weekly' })}
                    className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                      formData.frequency === 'weekly'
                        ? 'border-purple-600 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 mb-1">
                          Toutes les semaines
                        </div>
                        <p className="text-sm text-gray-600">
                          Pour les objectifs hebdomadaires
                        </p>
                      </div>
                      <div className="text-2xl">📊</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, frequency: 'custom' })}
                    className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                      formData.frequency === 'custom'
                        ? 'border-purple-600 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 mb-1">
                          Jours personnalisés
                        </div>
                        <p className="text-sm text-gray-600">
                          Choisissez les jours spécifiques
                        </p>
                      </div>
                      <div className="text-2xl">🎯</div>
                    </div>
                  </button>
                </div>

                {formData.frequency === 'custom' && (
                  <div className="mt-6 p-5 bg-gray-50 rounded-xl">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Sélectionnez les jours
                    </label>
                    <div className="flex gap-2 justify-center">
                      {weekDays.map((day) => (
                        <button
                          key={day.id}
                          type="button"
                          onClick={() => toggleDay(day.id)}
                          className={`w-12 h-12 rounded-full font-semibold transition-all ${
                            formData.customDays?.includes(day.id)
                              ? 'bg-purple-600 text-white shadow-lg scale-110'
                              : 'bg-white text-gray-600 hover:bg-gray-100'
                          }`}
                          title={day.full}
                        >
                          {day.name}
                        </button>
                      ))}
                    </div>
                    {errors.customDays && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {errors.customDays}
                      </p>
                    )}
                  </div>
                )}

                <div className="p-5 bg-blue-50 rounded-xl">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <Info className="w-4 h-4 text-blue-600" />
                    Rappel quotidien (optionnel)
                  </label>
                  <input
                    type="time"
                    value={formData.reminderTime}
                    onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Recevez une notification pour ne pas oublier votre habitude
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Récapitulatif */}
          {currentStep === 4 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Récapitulatif
                </h2>
                <p className="text-gray-600">
                  Vérifiez les détails avant de créer votre habitude
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-4">
                <div 
                  className="p-6 rounded-2xl shadow-lg"
                  style={{ backgroundColor: `${formData.color}15` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-md"
                        style={{ backgroundColor: formData.color }}
                      >
                        {formData.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {formData.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {categories.find(c => c.id === formData.category)?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg font-semibold">
                      <Zap className="w-4 h-4" />
                      {formData.xpReward} XP
                    </div>
                  </div>

                  {formData.description && (
                    <p className="text-gray-700 mb-4">
                      {formData.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700">
                      {difficulties.find(d => d.id === formData.difficulty)?.name}
                    </span>
                    <span className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700">
                      {formData.frequency === 'daily' && 'Quotidien'}
                      {formData.frequency === 'weekly' && 'Hebdomadaire'}
                      {formData.frequency === 'custom' && `${formData.customDays?.length} jours/semaine`}
                    </span>
                    {formData.reminderTime && (
                      <span className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700">
                        Rappel à {formData.reminderTime}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Prêt à commencer votre aventure ?
                      </h4>
                      <p className="text-sm text-gray-600">
                        Chaque jour complété vous rapprochera de vos objectifs. 
                        Vous gagnerez {formData.xpReward} XP à chaque validation et 
                        débloquerez des récompenses spéciales avec vos séries !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer avec boutons */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-700 font-semibold hover:bg-gray-200 rounded-xl transition-colors"
              >
                Retour
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
                >
                  Suivant
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  Créer l'habitude
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHabit;