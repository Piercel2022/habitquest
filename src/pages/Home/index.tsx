import { Sword, Target, Trophy, Zap, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-2">
            <Sword className="w-8 h-8 text-amber-400" />
            <span className="text-2xl font-bold text-white">HabitQuest</span>
          </div>
          <div className="flex gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-white hover:text-amber-400 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all">
                  Start Quest
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all"
              >
                Go to Dashboard
              </button>
            </SignedIn>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full text-amber-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Level up your life, one habit at a time
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Turn Your Daily Habits Into
              <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                Epic Quests
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Build lasting habits through gamification. Earn XP, unlock achievements, and level up your character as you complete daily challenges.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="group px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2">
                    Begin Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="group px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2"
                >
                  Continue Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </SignedIn>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-amber-400">10K+</div>
                <div className="text-sm text-slate-400">Active Questers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">1M+</div>
                <div className="text-sm text-slate-400">Quests Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">95%</div>
                <div className="text-sm text-slate-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Level Up Your Life</h2>
          <p className="text-xl text-slate-400">Powerful features designed to keep you motivated</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Target,
              title: "Daily Quests",
              description: "Transform habits into exciting daily missions with clear objectives and rewards"
            },
            {
              icon: Trophy,
              title: "Achievements",
              description: "Unlock badges and trophies as you hit milestones and maintain streaks"
            },
            {
              icon: TrendingUp,
              title: "XP & Levels",
              description: "Gain experience points and level up your character with every completed quest"
            },
            {
              icon: Star,
              title: "Streak Power",
              description: "Build momentum with streak tracking and bonus multipliers for consistency"
            }
          ].map((feature, index) => (
            <div key={index} className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-amber-400/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="relative z-10 mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Start Your Quest in 3 Steps</h2>
          <p className="text-xl text-slate-400">It's easy to get started</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              step: "01",
              title: "Create Your Character",
              description: "Choose your avatar and set up your profile to begin your journey"
            },
            {
              step: "02",
              title: "Set Your Quests",
              description: "Define the habits you want to build and turn them into daily quests"
            },
            {
              step: "03",
              title: "Complete & Level Up",
              description: "Check off quests, earn XP, and watch your character grow stronger"
            }
          ].map((step, index) => (
            <div key={index} className="relative">
              <div className="text-6xl font-bold text-amber-400/20 mb-4">{step.step}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
              {index < 2 && (
                <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-amber-400/30" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Social Proof */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <div className="bg-gradient-to-r from-amber-400/10 to-orange-500/10 border border-amber-400/20 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Join Thousands of Questers</h2>
            <p className="text-xl text-slate-400">Real people achieving real results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Chen",
                level: "Level 42",
                quote: "HabitQuest made building habits actually fun. I've maintained a 90-day streak!"
              },
              {
                name: "Sarah Miller",
                level: "Level 38",
                quote: "The gamification keeps me motivated. I look forward to completing my daily quests."
              },
              {
                name: "Jordan Lee",
                level: "Level 56",
                quote: "Finally, a habit tracker that doesn't feel like a chore. The XP system is genius!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-slate-900/50 rounded-xl border border-white/10">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-amber-400">{testimonial.level}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <div className="text-center bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-12 md:p-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Ready to Start Your Quest?
          </h2>
          <p className="text-xl text-slate-800 mb-8 max-w-2xl mx-auto">
            Join thousands of questers building better habits and leveling up their lives
          </p>
          <SignUpButton mode="modal">
            <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all hover:shadow-2xl flex items-center gap-2 mx-auto">
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </button>
          </SignUpButton>
          <p className="text-sm text-slate-700 mt-4">No credit card required • Start in 30 seconds</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sword className="w-6 h-6 text-amber-400" />
                <span className="text-xl font-bold text-white">HabitQuest</span>
              </div>
              <p className="text-slate-400 text-sm">
                Gamify your habits and transform your life one quest at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-slate-400 text-sm">
            © 2026 HabitQuest. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
