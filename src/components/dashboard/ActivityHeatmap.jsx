import { getLastNDays } from '../../utils/dateUtils';
import { useQuestions } from '../../context/QuestionContext';

export const ActivityHeatmap = () => {
  const { questions } = useQuestions();
  const days = getLastNDays(28);

  const activityMap = questions.reduce((acc, q) => {
    if (q.practiceHistory) {
      q.practiceHistory.forEach(h => {
        const dateStr = new Date(h.date).toISOString().split('T')[0];
        acc[dateStr] = (acc[dateStr] || 0) + 1;
      });
    }
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {days.map(day => {
          const count = activityMap[day] || 0;
          let bgColor = 'bg-white/5 border border-white/5'; // Empty state
          if (count > 0) bgColor = 'bg-emerald-500/40 border-emerald-500/30';
          if (count > 2) bgColor = 'bg-emerald-500/70 border-emerald-500/50';
          if (count > 5) bgColor = 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] border-emerald-300';

          return (
            <div
              key={day}
              title={`${day}: ${count} questions practiced`}
              className={`w-5 h-5 rounded-[4px] cursor-help transition-all duration-300 hover:scale-110 ${bgColor}`}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-end text-xs text-gray-500 gap-2 mt-2 font-medium">
        <span>Less</span>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-[2px] bg-white/5 border border-white/5"></div>
          <div className="w-3 h-3 rounded-[2px] bg-emerald-500/40"></div>
          <div className="w-3 h-3 rounded-[2px] bg-emerald-500/70"></div>
          <div className="w-3 h-3 rounded-[2px] bg-emerald-400"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;