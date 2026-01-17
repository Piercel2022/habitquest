import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Welcome from './Welcome';
import Quiz from './Quiz';
import Result from './Result';
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { PlayerProfile } from '../../types/user.types';

type OnboardingStep = 'welcome' | 'quiz' | 'result';

interface OnboardingProgress {
  step: OnboardingStep;
  completed: boolean;
  profile?: PlayerProfile;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [progress, setProgress] = useLocalStorage<OnboardingProgress>(
    'onboarding_progress',
    { step: 'welcome', completed: false }
  );

  const [currentStep, setCurrentStep] = useState<OnboardingStep>(progress.step);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | undefined>(
    progress.profile
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Vérifier si l'onboarding est déjà complété
  useEffect(() => {
    if (user?.onboardingCompleted || progress.completed) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, progress.completed, navigate]);

  // Sauvegarder la progression
  useEffect(() => {
    setProgress({
      step: currentStep,
      completed: false,
      profile: playerProfile
    });
  }, [currentStep, playerProfile, setProgress]);

  const handleWelcomeComplete = () => {
    transitionToStep('quiz');
  };

  const handleQuizComplete = (answers: Record<string, string>, profile: PlayerProfile) => {
    setQuizAnswers(answers);
    setPlayerProfile(profile);
    transitionToStep('result');
  };

  const handleOnboardingComplete = async () => {
    try {
      // Sauvegarder le profil utilisateur
      if (playerProfile) {
        await updateProfile({
          playerType: playerProfile.type,
          avatar: playerProfile.avatar,
          onboardingCompleted: true
        });
      }

      // Marquer l'onboarding comme complété
      setProgress({
        step: 'result',
        completed: true,
        profile: playerProfile
      });

      // Rediriger vers le dashboard avec animation
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 500);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const handleSkip = () => {
    if (window.confirm('Êtes-vous sûr de vouloir passer l\'introduction ? Vous pourrez toujours la refaire plus tard.')) {
      navigate('/dashboard', { replace: true });
    }
  };

  const transitionToStep = (step: OnboardingStep) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsTransitioning(false);
    }, 300);
  };

  const goBack = () => {
    if (currentStep === 'quiz') {
      transitionToStep('welcome');
    } else if (currentStep === 'result') {
      transitionToStep('quiz');
    }
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'welcome':
        return 0;
      case 'quiz':
        return 50;
      case 'result':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-white/10 backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400"
            initial={{ width: '0%' }}
            animate={{ width: `${getStepProgress()}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Skip Button */}
      {currentStep !== 'result' && (
        <motion.button
          className="fixed top-6 right-6 z-50 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
          onClick={handleSkip}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Passer →
        </motion.button>
      )}

      {/* Back Button */}
      {currentStep !== 'welcome' && (
        <motion.button
          className="fixed top-6 left-6 z-50 p-2 text-white/70 hover:text-white transition-colors"
          onClick={goBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl"
            >
              {currentStep === 'welcome' && (
                <Welcome onComplete={handleWelcomeComplete} />
              )}
              
              {currentStep === 'quiz' && (
                <Quiz onComplete={handleQuizComplete} />
              )}
              
              {currentStep === 'result' && playerProfile && (
                <Result
                  profile={playerProfile}
                  onComplete={handleOnboardingComplete}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="fixed bottom-6 left-0 right-0 z-10 text-center">
        <div className="flex justify-center items-center gap-2">
          {['welcome', 'quiz', 'result'].map((step, index) => (
            <motion.div
              key={step}
              className={`h-2 rounded-full transition-all ${
                currentStep === step
                  ? 'w-8 bg-white'
                  : index < ['welcome', 'quiz', 'result'].indexOf(currentStep)
                  ? 'w-2 bg-white/50'
                  : 'w-2 bg-white/20'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;