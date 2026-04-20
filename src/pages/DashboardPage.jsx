import StreakCard from '../components/dashboard/StreakCard';
import TopicCoverageChart from '../components/dashboard/TopicCoverageChart';
import ActivityHeatmap from '../components/dashboard/ActivityHeatmap';
import { useQuestions } from '../context/QuestionContext';
import { getWeakTopics } from '../utils/statsUtils';
import { isToday } from '../utils/dateUtils';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { questions } = useQuestions();
  const weakTopics = getWeakTopics(questions);

  const recentActivity = questions
    .filter(q => q.practiceHistory && q.practiceHistory.length > 0)
    .flatMap(q => q.practiceHistory.map(h => ({ ...q, practiceDate: h.date, time: h.timeSpent })))
    .sort((a, b) => new Date(b.practiceDate) - new Date(a.practiceDate))
    .slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-100">Overview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StreakCard />
          <div className="glass-panel p-6 rounded-2xl h-96 flex flex-col">
            <h3 className="text-lg font-bold text-gray-100 mb-2">Topic Confidence</h3>
            <div className="flex-1 min-h-0"><TopicCoverageChart /></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-gray-100 mb-4">Activity Map (28 Days)</h3>
            <ActivityHeatmap />
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center"><span className="mr-2 text-red-400">⚠️</span> Weak Topics</h3>
            {weakTopics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {weakTopics.map(topic => (
                  <span key={topic} className="text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-md">{topic}</span>
                ))}
              </div>
            ) : <p className="text-sm text-gray-400">Great job! No weak topics identified yet.</p>}
          </div>
        </div>
      </div>
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-gray-100 mb-4">Recent Practice Sessions</h3>
        {recentActivity.length > 0 ? (
          <div className="divide-y divide-white/10">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                <Link to={`/questions/${activity.id}`} className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">{activity.title}</Link>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 font-mono">{activity.time}s</span>
                  <span className="text-sm font-medium text-gray-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                    {isToday(activity.practiceDate) ? 'Today' : new Date(activity.practiceDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-gray-400">No recent activity recorded.</p>}
      </div>
    </div>
  );
};

export default DashboardPage;