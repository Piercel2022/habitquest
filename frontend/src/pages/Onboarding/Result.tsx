import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Compass, 
  Users, 
  Zap, 
  ArrowRight,
  Sparkles,
  Award,
  TrendingUp
} from 'lucide-react';

// Types pour les profils de joueur
type PlayerProfile = 'achiever' | 'explorer' | 'socializer' | 'killer';

interface ProfileData {
  type: PlayerProfile;
  title: string;
  description: string;
  icon: typeof Trophy;
  color: string;
  gradient: string;
  traits: string[];
  strengths: string[];
  recommendations: string[];
  avatar: string;
}

// Configuration des profils
const PROFILES: Record<PlayerProfile, ProfileData> = {
  achiever: {
    type: 'achiever',
    title: 'L\'Accomplisseur',
    description: 'Vous êtes motivé par les objectifs et les accomplissements. Vous aimez cocher des cases, gravir des niveaux et collectionner des récompenses.',
    icon: Trophy,
    color: 'text-yellow-500',
    gradient: 'from-yellow-500 to-orange-500',
    traits: [
      'Orienté objectifs',
      'Aime les défis mesurables',
      'Collectionneur de badges'
    ],
    strengths: [
      'Excellente discipline',
      'Progression constante',
      'Focus sur les résultats'
    ],
    recommendations: [
      'Définissez des objectifs clairs et mesurables',
      'Utilisez le système de niveaux pour suivre vos progrès',
      'Participez aux défis hebdomadaires pour gagner des badges'
    ],
    avatar: '/avatars/achiever-1.svg'
  },
  explorer: {
    type: 'explorer',
    title: 'L\'Explorateur',
    description: 'Vous êtes curieux et aimez découvrir de nouvelles choses. Vous préférez la variété et l\'expérimentation à la routine.',
    icon: Compass,
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
    traits: [
      'Curieux et créatif',
      'Aime la variété',
      'Expérimente constamment'
    ],
    strengths: [
      'Adaptabilité',
      'Innovation',
      'Ouverture d\'esprit'
    ],
    recommendations: [
      'Essayez différents types d\'habitudes',
      'Explorez les quêtes spéciales',
      'Découvrez de nouveaux défis chaque semaine'
    ],
    avatar: '/avatars/explorer-1.svg'
  },
  socializer: {
    type: 'socializer',
    title: 'Le Socialisateur',
    description: 'Vous êtes motivé par les interactions sociales et le sentiment d\'appartenance. Vous aimez partager vos succès et encourager les autres.',
    icon: Users,
    color: 'text-pink-500',
    gradient: 'from-pink-500 to-rose-500',
    traits: [
      'Motivé par la communauté',
      'Aime partager',
      'Encourage les autres'
    ],
    strengths: [
      'Esprit d\'équipe',
      'Communication',
      'Empathie'
    ],
    recommendations: [
      'Rejoignez des défis en équipe',
      'Partagez vos accomplissements',
      'Encouragez d\'autres membres de la communauté'
    ],
    avatar: '/avatars/socializer-1.svg'
  },
  killer: {
    type: 'killer',
    title: 'Le Compétiteur',
    description: 'Vous êtes motivé par la compétition et le désir de surpasser les autres. Vous aimez les classements et les défis directs.',
    icon: Zap,
    color: 'text-red-500',
    gradient: 'from-red-500 to-purple-500',
    traits: [
      'Esprit compétitif',
      'Aime les défis',
      'Veut être le meilleur'
    ],
    strengths: [
      'Détermination',
      'Performance sous pression',
      'Leadership'
    ],
    recommendations: [
      'Participez aux classements hebdomadaires',
      'Affrontez les boss battles',
      'Défiez-vous contre d\'autres joueurs'
    ],
    avatar: '/avatars/killer-1.svg'
  }
};

const Result = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData>(PROFILES.achiever);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Simuler la récupération du profil
    const savedProfile = (localStorage.getItem('quizProfile') as PlayerProfile) || 'achiever';
    setProfile(PROFILES[savedProfile]);
    
    // Animation de chargement
    setTimeout(() => {
      setIsLoading(false);
      setShowConfetti(true);
      
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1000);
  }, []);

  const handleContinue = () => {
    localStorage.setItem('playerProfile', profile.type);
    localStorage.setItem('onboardingCompleted', 'true');
    alert('Profil sauvegardé ! Direction le dashboard...');
  };

  const handleRetakeQuiz = () => {
    alert('Retour au quiz...');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Analyse de votre profil...</p>
        </motion.div>
      </div>
    );
  }

  const Icon = profile.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"
              initial={{
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 500,
                y: -20,
                opacity: 1,
                scale: Math.random() * 1 + 0.5
              }}
              animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 20 : 800,
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 500,
                opacity: 0,
                rotate: Math.random() * 360
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
      
      <div className="container mx-auto px-4 py-12 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${profile.gradient} flex items-center justify-center shadow-2xl`}
            >
              <Icon className="w-12 h-12 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Votre profil : {profile.title}
                </h1>
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                {profile.description}
              </p>
            </motion.div>
          </div>

          {/* Profile Details */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Traits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className={`w-6 h-6 ${profile.color}`} />
                <h3 className="text-xl font-semibold text-white">Traits</h3>
              </div>
              <ul className="space-y-2">
                {profile.traits.map((trait, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-2 text-slate-300"
                  >
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full ${profile.color} bg-current flex-shrink-0`} />
                    <span>{trait}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className={`w-6 h-6 ${profile.color}`} />
                <h3 className="text-xl font-semibold text-white">Forces</h3>
              </div>
              <ul className="space-y-2">
                {profile.strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-2 text-slate-300"
                  >
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full ${profile.color} bg-current flex-shrink-0`} />
                    <span>{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className={`w-6 h-6 ${profile.color}`} />
                <h3 className="text-xl font-semibold text-white">Votre départ</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Niveau</span>
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '0%' }}
                      className={`h-full bg-gradient-to-r ${profile.gradient}`}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Pièces</span>
                  <span className="text-yellow-400 font-bold">100 🪙</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Badges</span>
                  <span className="text-purple-400 font-bold">0</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Sparkles className={`w-6 h-6 ${profile.color}`} />
              Recommandations pour vous
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {profile.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${profile.gradient} flex items-center justify-center mb-3`}>
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <p className="text-slate-300 text-sm">{rec}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleRetakeQuiz}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20 hover:border-white/40"
            >
              Refaire le quiz
            </button>
            <button
              onClick={handleContinue}
              className={`px-8 py-4 bg-gradient-to-r ${profile.gradient} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 justify-center group`}
            >
              Commencer l'aventure
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center text-slate-400 text-sm mt-8"
          >
            Vous pourrez toujours modifier votre profil dans les paramètres
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Result;