import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing">
      {/* Background Image with Overlay */}
      <div className="landing-background">
       <img src="/rvs.jpg" className="background-image" />
        <div className="background-overlay"></div>
      </div>
      
      <div className="landing-content">
        {/* Logo Section */}
        <div className="landing-logo">
          <div className="logo-container">
            <img src="/logo.jpg" className="logo-image" />
          </div>
          <div className="logo-text">
            <p className="eyebrow">RVS College</p>
            <div className="college-info">
              <span className="established">Estd 1983</span>
              <span className="tagline">Building Intellectual Capital</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="landing-main">
          <h1>Placement Training Attendance </h1>
          <p className="landing-description">
            Track 30-day training Attendance
          </p>
          
          <div className="landing-actions">
            <Link className="btn primary" to="/login/admin">
              <i className="fas fa-user-shield"></i>
              Admin Login
            </Link>
            <Link className="btn secondary" to="/login/student">
              <i className="fas fa-user-graduate"></i>
              Student Login
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        {/* <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Real-time Analytics</h3>
            <p>Monitor attendance trends and participation rates with live dashboards</p>
          </div> */}
          
          {/* <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-user-check"></i>
            </div>
            <h3>Easy Tracking</h3>
            <p>Simple and efficient attendance marking system for 30-day training programs</p>
          </div> */}
          
          {/* <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Secure Access</h3>
            <p>Role-based login system ensuring data privacy and security</p>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default LandingPage;

