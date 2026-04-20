import { useStreak } from '../../hooks/useStreak';
import { useQuestions } from '../../context/QuestionContext';

export const StreakCard = () => {
  const { questions } = useQuestions();
  const { currentStreak, todayCount } = useStreak(questions);

  return (
    <div className="glass-panel bg-gradient-to-r from-orange-500/10 to-red-500/5 p-6 rounded-2xl border-orange-500/20 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-orange-400">Current Streak</h3>
        <p className="text-sm text-orange-200/60 font-medium mt-1">You've practiced {todayCount} question(s) today</p>
      </div>
      <div className="flex items-center space-x-3 bg-black/20 border border-white/10 px-4 py-2.5 rounded-xl shadow-inner">
        <span className="text-3xl drop-shadow-md">🔥</span>
        <span className="text-3xl font-black text-orange-500">{currentStreak} <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">days</span></span>
      </div>
    </div>
  );
};

export default StreakCard;