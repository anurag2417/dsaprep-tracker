import { useQuestions } from '../context/QuestionContext';
import { useNavigate } from 'react-router-dom';

export const CompanyTrackerPage = () => {
  const { questions, setFilters } = useQuestions();
  const navigate = useNavigate();

  const companyData = questions.reduce((acc, q) => {
    if (!q.company) return acc;
    const comp = q.company.trim().toUpperCase();
    if (!acc[comp]) acc[comp] = { name: q.company, total: 0, confident: 0 };
    acc[comp].total++;
    if (q.status === 'confident') acc[comp].confident++;
    return acc;
  }, {});

  const companies = Object.values(companyData).sort((a, b) => b.total - a.total);

  const handleCompanyClick = (companyName) => {
    setFilters({ search: companyName });
    navigate('/questions');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-100">Target Companies</h1>
      {companies.length === 0 ? (
        <div className="glass-panel p-8 rounded-2xl text-center text-gray-400">
          No companies tagged in your question bank yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {companies.map(c => (
            <div
              key={c.name}
              onClick={() => handleCompanyClick(c.name)}
              className="glass-panel p-5 rounded-2xl cursor-pointer hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 group"
            >
              <h3 className="text-lg font-extrabold text-gray-100 group-hover:text-blue-400 transition-colors">{c.name}</h3>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-sm">
                <span className="font-medium text-gray-400">{c.total} {c.total === 1 ? 'Question' : 'Questions'}</span>
                <span className="font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md">{Math.round((c.confident / c.total) * 100)}% Mastered</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyTrackerPage;