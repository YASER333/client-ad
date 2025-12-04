const StatCard = ({ title, value, subtitle, accent = 'primary' }) => (
  <div className={`stat-card stat-card--${accent}`}>
    <p className="stat-card__title">{title}</p>
    <h3 className="stat-card__value">{value}</h3>
    {subtitle && <span className="stat-card__subtitle">{subtitle}</span>}
  </div>
);

export default StatCard;


