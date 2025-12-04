const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="loading-spinner">
    <span className="spinner" />
    <p>{message}</p>
  </div>
);

export default LoadingSpinner;


