import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const StudentLogin = () => {
  const { register, handleSubmit } = useForm();
  const { loginStudent } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setError(null);
    try {
      await loginStudent(values);
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <div style={styles.logoContainer}>
            <img src="/logo.jpg" alt="RVS College Logo" style={styles.logoImage} />
          </div>
          <div style={styles.logoText}>
            <p style={styles.eyebrow}>RVS College</p>
            <div style={styles.collegeInfo}>
              <span style={styles.established}>Estd 1983</span>
              <span style={styles.tagline}>Building Intellectual Capital</span>
            </div>
          </div>
        </div>

        <h2 style={styles.title}>Student Login</h2>
        <p style={styles.subtitle}>Use your roll number as both username and password</p>

        {/* BACK BUTTON */}
        <button
          type="button"
          style={styles.backButton}
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Roll Number
            <input 
              type="text" 
              style={styles.input}
              placeholder="Enter your roll number"
              {...register('rollNumber', { required: true })} 
            />
          </label>
          
          <label style={styles.label}>
            Password  
            <input 
              type="password" 
              style={styles.input}
              placeholder="Enter password if required"
              {...register('password', { required: true })} 
            />
          </label>
        </div>

        {error && <p style={styles.errorText}>{error}</p>}
        
        <button type="submit" style={styles.submitButton}>
          <i className="fas fa-sign-in-alt" style={styles.buttonIcon}></i>
          Continue to Dashboard
        </button>

        {/* Student Help Section */}
        <div style={styles.helpSection}>
          <div style={styles.helpItem}>
            <i className="fas fa-info-circle" style={styles.helpIcon}></i>
            <span style={styles.helpText}>Use your college roll number</span>
          </div>
          <div style={styles.helpItem}>
            <i className="fas fa-graduation-cap" style={styles.helpIcon}></i>
            <span style={styles.helpText}>Access your training dashboard</span>
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    padding: '2rem',
  },
  form: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
    border: '1px solid #e9ecef',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1rem',
    background: 'rgba(42, 157, 143, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(42, 157, 143, 0.1)',
  },
  logoContainer: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'white',
    padding: '0.3rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #2A9D8F',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  logoText: {
    textAlign: 'left',
  },
  eyebrow: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#2A9D8F',
    margin: '0 0 0.3rem 0',
  },
  collegeInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.1rem',
  },
  established: {
    fontSize: '0.8rem',
    color: '#264653',
    fontWeight: '600',
  },
  tagline: {
    fontSize: '0.7rem',
    color: '#6c757d',
    fontStyle: 'italic',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#264653',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: '1.5rem',
    lineHeight: '1.4',
  },
  backButton: {
    width: '100%',
    padding: '0.7rem',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    background: 'transparent',
    color: '#6c757d',
    cursor: 'pointer',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    marginBottom: '1.5rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#264653',
  },
  input: {
    padding: '0.8rem 1rem',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: '#f8f9fa',
    color: '#264653',
  },
  inputPlaceholder: {
    color: '#adb5bd',
  },
  errorText: {
    color: '#E76F51',
    fontSize: '0.9rem',
    textAlign: 'center',
    margin: '1rem 0',
    padding: '0.7rem',
    background: 'rgba(231, 111, 81, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(231, 111, 81, 0.2)',
  },
  submitButton: {
    width: '100%',
    padding: '0.9rem',
    background: '#2A9D8F',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  buttonIcon: {
    fontSize: '0.9rem',
  },
  helpSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7rem',
  },
  helpItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    padding: '0.7rem',
    background: 'rgba(233, 196, 106, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(233, 196, 106, 0.2)',
  },
  helpIcon: {
    color: '#E9C46A',
    fontSize: '0.9rem',
    width: '16px',
  },
  helpText: {
    fontSize: '0.8rem',
    color: '#264653',
    fontWeight: '500',
  },
};

// Add hover effects using JavaScript
const addHoverEffects = () => {
  const style = document.createElement('style');
  style.textContent = `
    button[type="button"]:hover {
      background: #f8f9fa !important;
      border-color: #2A9D8F !important;
      color: #2A9D8F !important;
    }
    button[type="submit"]:hover {
      background: #218277 !important;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(42, 157, 143, 0.3) !important;
    }
    input:focus {
      border-color: #2A9D8F !important;
      outline: none !important;
      box-shadow: 0 0 0 3px rgba(42, 157, 143, 0.1) !important;
      background: white !important;
    }
    input::placeholder {
      color: #adb5bd !important;
    }
  `;
  document.head.appendChild(style);
};

// Initialize hover effects when component mounts
if (typeof document !== 'undefined') {
  addHoverEffects();
}

export default StudentLogin;
