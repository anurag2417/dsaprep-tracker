import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const features = [
    {
      icon: "⚡",
      title: "Spaced Repetition",
      desc: "Track your confidence levels and know exactly which Data Structures to review and when."
    },
    {
      icon: "🎯",
      title: "Company Targeting",
      desc: "Tag questions by company (Google, Amazon, etc.) and conquer their specific interview patterns."
    },
    {
      icon: "📈",
      title: "Analytics & Streaks",
      desc: "Visualize your progress with activity heatmaps, radar charts, and daily practice streaks."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden selection:bg-blue-500/30">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Simplified Landing Navbar */}
      <nav className="relative z-10 px-8 py-6 flex justify-between items-center animate-fade-in">
        <span className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400 tracking-tighter">
          DSAPrep
        </span>
        <div className="flex gap-4">
          {currentUser ? (
            <Button onClick={() => navigate('/dashboard')} variant="secondary">Go to Dashboard</Button>
          ) : (
            <Button onClick={() => navigate('/login')} variant="secondary">Sign In</Button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 text-center pb-20">
        <div className="max-w-4xl space-y-8">
          
          <div className="animate-slide-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            The Ultimate Interview Workspace
          </div>

          <h1 className="animate-slide-up text-5xl md:text-7xl font-extrabold text-gray-100 tracking-tight" style={{ animationDelay: '0.1s' }}>
            Master Algorithms.<br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Land the Offer.</span>
          </h1>
          
          <p className="animate-slide-up text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Stop losing track of LeetCode problems in messy spreadsheets. Track your confidence, analyze your weak points, and build unstoppable interview momentum.
          </p>
          
          <div className="animate-slide-up pt-4" style={{ animationDelay: '0.3s' }}>
            <Button onClick={handleGetStarted} className="h-14 px-10 text-lg rounded-xl shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:scale-105 transition-transform duration-300">
              Get Started for Free
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-6xl w-full">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="animate-slide-up glass-panel p-8 rounded-2xl text-left hover:-translate-y-2 transition-transform duration-300"
              style={{ animationDelay: `${0.4 + (idx * 0.1)}s` }}
            >
              <div className="text-4xl mb-4 bg-white/5 w-16 h-16 flex items-center justify-center rounded-xl border border-white/10 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default LandingPage;