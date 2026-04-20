import Button from './Button';

export const EmptyState = ({ title, description, action }) => (
  <div className="text-center py-12 px-4 border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
    <h3 className="mt-2 text-sm font-semibold text-gray-200">{title}</h3>
    <p className="mt-1 text-sm text-gray-400">{description}</p>
    {action && (
      <div className="mt-6">
        <Button onClick={action.onClick}>{action.label}</Button>
      </div>
    )}
  </div>
);

export default EmptyState;