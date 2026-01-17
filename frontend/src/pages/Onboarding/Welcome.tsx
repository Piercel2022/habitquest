import React, { useState, useCallback, useMemo } from 'react';
import {
  Sparkles,
  Trophy,
  Target,
  Zap,
  ArrowRight,
  Sword,
  Star,
  Flame
} from 'lucide-react';

interface WelcomeProps {
  onComplete: () => void;
}

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

const BADGE_STYLES: Record<string, string> = {
  yellow: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
  pink: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
};

const Welcome: React.FC<WelcomeProps> = ({ onComplete }) => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const handleStart = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const features: Feature[] = useMemo(
    () => [
      {
        icon: <Target className="w-6 h-6" />,
        title: 'Créez vos habitudes',
        description: 'Transformez vos objectifs en quêtes épiques',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: <Zap className="w-6 h-6" />,
        title: 'Montez en niveau',
        description: "Gagnez de l'XP et débloquez des récompenses",
        color: 'from-yellow-500 to-orange-500'
      },
      {
        icon: <Sword className="w-6 h-6" />,
        title: 'Battez des boss',
        description: 'Affrontez vos obstacles comme des boss de jeu vidéo',
        color: 'from-red-500 to-pink-500'
      }
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* CONTENU PRINCIPAL */}
      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* GAUCHE */}
        <div className="text-white space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="font-medium">La vie est un jeu, jouez-la !</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Transformez vos
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              habitudes en aventure
            </span>
          </h1>

          <p className="text-lg text-purple-200 max-w-xl">
            Gamifiez votre productivité avec des quêtes, de l’XP et des boss.
          </p>

          {/* FEATURES */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5 transition ${
                  hoveredFeature === index ? 'scale-105 bg-white/10' : ''
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-purple-200">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleStart}
            className="mt-4 w-full md:w-auto px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 hover:scale-105 transition"
          >
            <Sparkles className="w-5 h-5" />
            Commencer l’aventure
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* DROITE */}
        <div className="hidden md:flex justify-center">
          <div className="relative w-72 h-72 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center shadow-2xl">
            <Trophy className="w-24 h-24 text-white" />
            <div className="absolute -top-4 -right-4 px-3 py-1 bg-green-400 rounded-full text-xs font-bold flex gap-1">
              <Star className="w-3 h-3" /> Niveau 15
            </div>
          </div>
        </div>
      </div>

      {/* BADGES */}
      <div className="absolute bottom-6 flex gap-2">
        {[
          { label: 'First Blood', emoji: '🏆', color: 'yellow' },
          { label: 'Streak Master', emoji: '🔥', color: 'pink' },
          { label: 'Boss Slayer', emoji: '⚔️', color: 'purple' }
        ].map(badge => (
          <div
            key={badge.label}
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              BADGE_STYLES[badge.color]
            }`}
          >
            {badge.emoji} {badge.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
