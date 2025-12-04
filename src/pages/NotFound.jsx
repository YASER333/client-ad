import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="center-wrapper">
    <h2>Page not found</h2>
    <p>The resource you are looking for is unavailable.</p>
    <Link className="btn primary" to="/">
      Go home
    </Link>
  </div>
);

export default NotFound;


