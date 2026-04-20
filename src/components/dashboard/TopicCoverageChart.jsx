import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { getCoverageByTopic } from '../../utils/statsUtils';
import { TOPICS } from '../../constants/topics';
import { useQuestions } from '../../context/QuestionContext';

export const TopicCoverageChart = () => {
  const { questions } = useQuestions();
  const data = getCoverageByTopic(questions, TOPICS).filter(d => d.total > 0);

  if (data.length === 0) return <div className="text-gray-500 text-sm flex h-full items-center justify-center">No topic data available yet.</div>;

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          {/* Changed grid and text colors for dark mode */}
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="topic" tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
          <Radar name="Confidence %" dataKey="percent" stroke="#60a5fa" strokeWidth={2} fill="#3b82f6" fillOpacity={0.4} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} 
            itemStyle={{ color: '#60a5fa' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicCoverageChart;