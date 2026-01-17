import { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Target, Users, Sword } from 'lucide-react';

// Types de profils joueurs (Bartle Taxonomy)
type PlayerProfile = 'achiever' | 'explorer' | 'socializer' | 'killer';

interface QuizProps {
  onComplete: (
    answers: Record<string, string>,
    profile: PlayerProfile
  ) => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  answers: {
    text: string;
    profile: PlayerProfile;
    icon: React.ReactNode;
  }[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qu'est-ce qui te motive le plus dans un jeu ?",
    answers: [
      { 
        text: "Accomplir tous les objectifs et débloquer tous les succès", 
        profile: 'achiever',
        icon: <Target className="w-5 h-5" />
      },
      { 
        text: "Découvrir tous les secrets et mécaniques cachées", 
        profile: 'explorer',
        icon: <Sparkles className="w-5 h-5" />
      },
      { 
        text: "Collaborer et partager avec d'autres joueurs", 
        profile: 'socializer',
        icon: <Users className="w-5 h-5" />
      },
      { 
        text: "Relever des défis difficiles et battre mes records", 
        profile: 'killer',
        icon: <Sword className="w-5 h-5" />
      }
    ]
  },
  {
    id: 2,
    question: "Comment préfères-tu aborder tes objectifs ?",
    answers: [
      { 
        text: "Je fais des listes détaillées et je coche chaque étape", 
        profile: 'achiever',
        icon: <Target className="w-5 h-5" />
      },
      { 
        text: "J'aime expérimenter et trouver ma propre méthode", 
        profile: 'explorer',
        icon: <Sparkles className="w-5 h-5" />
      },
      { 
        text: "Je préfère travailler en groupe et partager mes progrès", 
        profile: 'socializer',
        icon: <Users className="w-5 h-5" />
      },
      { 
        text: "Je me fixe des défis ambitieux et je pousse mes limites", 
        profile: 'killer',
        icon: <Sword className="w-5 h-5" />
      }
    ]
  },
  {
    id: 3,
    question: "Quelle récompense te fait le plus plaisir ?",
    answers: [
      { 
        text: "Des points d'expérience et monter de niveau", 
        profile: 'achiever',
        icon: <Target className="w-5 h-5" />
      },
      { 
        text: "Débloquer de nouvelles fonctionnalités à explorer", 
        profile: 'explorer',
        icon: <Sparkles className="w-5 h-5" />
      },
      { 
        text: "Des badges à partager et des classements sociaux", 
        profile: 'socializer',
        icon: <Users className="w-5 h-5" />
      },
      { 
        text: "Des boss battles et des défis hardcore", 
        profile: 'killer',
        icon: <Sword className="w-5 h-5" />
      }
    ]
  },
  {
    id: 4,
    question: "Quand tu échoues, que fais-tu ?",
    answers: [
      { 
        text: "J'analyse mes erreurs et je recommence méthodiquement", 
        profile: 'achiever',
        icon: <Target className="w-5 h-5" />
      },
      { 
        text: "J'essaie une approche complètement différente", 
        profile: 'explorer',
        icon: <Sparkles className="w-5 h-5" />
      },
      { 
        text: "Je demande conseil à d'autres pour progresser", 
        profile: 'socializer',
        icon: <Users className="w-5 h-5" />
      },
      { 
        text: "Je me remotive et je reviens encore plus fort", 
        profile: 'killer',
        icon: <Sword className="w-5 h-5" />
      }
    ]
  },
  {
    id: 5,
    question: "Quel aspect de la progression t'attire le plus ?",
    answers: [
      { 
        text: "Voir mes statistiques augmenter régulièrement", 
        profile: 'achiever',
        icon: <Target className="w-5 h-5" />
      },
      { 
        text: "Découvrir de nouvelles habitudes à essayer", 
        profile: 'explorer',
        icon: <Sparkles className="w-5 h-5" />
      },
      { 
        text: "Motiver et être motivé par une communauté", 
        profile: 'socializer',
        icon: <Users className="w-5 h-5" />
      },
      { 
        text: "Battre mes propres records et me surpasser", 
        profile: 'killer',
        icon: <Sword className="w-5 h-5" />
      }
    ]
  }
];

const profileDescriptions: Record<PlayerProfile, { title: string; description: string; color: string }> = {
  achiever: {
    title: "L'Accomplisseur",
    description: "Tu es motivé par les objectifs, les statistiques et la progression mesurable.",
    color: "from-amber-500 to-orange-500"
  },
  explorer: {
    title: "L'Explorateur",
    description: "Tu adores découvrir de nouvelles choses et expérimenter différentes approches.",
    color: "from-emerald-500 to-teal-500"
  },
  socializer: {
    title: "Le Social",
    description: "Tu trouves ta motivation dans les interactions et le partage avec les autres.",
    color: "from-blue-500 to-indigo-500"
  },
  killer: {
    title: "Le Compétiteur",
    description: "Tu es stimulé par les défis difficiles et le dépassement de soi.",
    color: "from-red-500 to-purple-500"
  }
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PlayerProfile[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [dominantProfile, setDominantProfile] = useState<PlayerProfile | null>(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const selectedProfile = questions[currentQuestion].answers[selectedAnswer].profile;
    const newAnswers = [...answers, selectedProfile];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      }, 300);
    } else {
      // Calculer le profil dominant
      const profileCounts = newAnswers.reduce((acc, profile) => {
        acc[profile] = (acc[profile] || 0) + 1;
        return acc;
      }, {} as Record<PlayerProfile, number>);

      const profile = Object.entries(profileCounts)
        .sort(([, a], [, b]) => b - a)[0][0] as PlayerProfile;

      setTimeout(() => {
        setDominantProfile(profile);
        setShowResult(true);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setDominantProfile(null);
  };

  if (showResult && dominantProfile) {
    const profileInfo = profileDescriptions[dominantProfile];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
            {/* Animation de succès */}
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ton profil est :
            </h2>
            
            <div className={`inline-block px-8 py-4 rounded-2xl bg-gradient-to-r ${profileInfo.color} text-white text-2xl font-bold mb-6`}>
              {profileInfo.title}
            </div>

            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              {profileInfo.description}
            </p>

            {/* Statistiques des réponses */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Répartition de tes réponses
              </h3>
              <div className="space-y-3">
                {Object.entries(
                  answers.reduce((acc, profile) => {
                    acc[profile] = (acc[profile] || 0) + 1;
                    return acc;
                  }, {} as Record<PlayerProfile, number>)
                ).map(([profile, count]) => {
                  const info = profileDescriptions[profile as PlayerProfile];
                  const percentage = (count / answers.length) * 100;
                  
                  return (
                    <div key={profile}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{info.title}</span>
                        <span className="text-gray-600">{count}/{answers.length}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${info.color} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 py-4 rounded-xl font-semibold text-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
              >
                Recommencer
              </button>
              <button
                onClick={() => alert('Navigation vers le dashboard (à implémenter)')}
                className="flex-1 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg transition-all"
              >
                Commencer l'aventure
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header avec progression */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 transition-colors ${
                currentQuestion === 0 
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Retour</span>
            </button>
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          
          {/* Barre de progression */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            {questions[currentQuestion].question}
          </h2>

          {/* Réponses */}
          <div className="space-y-4 mb-8">
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center gap-4 ${
                  selectedAnswer === index
                    ? 'border-indigo-500 bg-indigo-50 shadow-lg scale-[1.02]'
                    : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50'
                }`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  selectedAnswer === index
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {answer.icon}
                </div>
                <span className={`text-lg font-medium ${
                  selectedAnswer === index ? 'text-indigo-900' : 'text-gray-700'
                }`}>
                  {answer.text}
                </span>
              </button>
            ))}
          </div>

          {/* Bouton Suivant */}
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:scale-[1.02]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion < questions.length - 1 ? (
              <>
                Continuer
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Voir mon profil
                <Sparkles className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Indicateurs de réponses */}
        <div className="flex justify-center gap-2 mt-6">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index < currentQuestion
                  ? 'w-8 bg-gradient-to-r from-indigo-500 to-purple-500'
                  : index === currentQuestion
                  ? 'w-12 bg-indigo-300'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}