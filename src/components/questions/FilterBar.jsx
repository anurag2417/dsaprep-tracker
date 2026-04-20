import { useQuestions } from '../../context/QuestionContext';
import { TOPICS } from '../../constants/topics';
import { DIFFICULTIES } from '../../constants/difficulty';

export const FilterBar = () => {
  const { filters, setFilters } = useQuestions();

  return (
    <div className="glass-panel p-4 rounded-2xl flex flex-wrap gap-4 items-center mb-6">
      <div className="flex-1 min-w-60">
        <input
          type="text"
          placeholder="Search questions or companies..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="w-full sm:text-sm px-4 py-2"
        />
      </div>
      <select
        value={filters.topic}
        onChange={(e) => setFilters({ topic: e.target.value })}
        className="sm:text-sm py-2"
      >
        <option value="All" className="bg-gray-900 text-white">All Topics</option>
        {TOPICS.map(topic => <option key={topic} value={topic} className="bg-gray-900 text-white">{topic}</option>)}
      </select>
      <select
        value={filters.difficulty}
        onChange={(e) => setFilters({ difficulty: e.target.value })}
        className="sm:text-sm py-2"
      >
        <option value="All" className="bg-gray-900 text-white">All Difficulties</option>
        {DIFFICULTIES.map(d => <option key={d.value} value={d.value} className="bg-gray-900 text-white">{d.label}</option>)}
      </select>
      <select
        value={filters.status}
        onChange={(e) => setFilters({ status: e.target.value })}
        className="sm:text-sm py-2"
      >
        <option value="All" className="bg-gray-900 text-white">All Statuses</option>
        <option value="not-started" className="bg-gray-900 text-white">Not Started</option>
        <option value="attempted" className="bg-gray-900 text-white">Attempted</option>
        <option value="confident" className="bg-gray-900 text-white">Confident</option>
      </select>
    </div>
  );
};

export default FilterBar;