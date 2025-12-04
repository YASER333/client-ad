const EmptyState = ({ title = 'No data', description = 'Nothing to display yet.' }) => (
  <div className="empty-state">
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

export default EmptyState;


