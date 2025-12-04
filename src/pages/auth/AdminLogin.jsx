import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const { loginAdmin } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setError(null);
    try {
      await loginAdmin(values);
      navigate('/admin/dashboard');
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

        <h2 style={styles.title}>Admin Access</h2>

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
            Email
            <input 
              type="email" 
              style={styles.input}
              {...register('email', { required: true })} 
            />
          </label>
          
          <label style={styles.label}>
            Password
            <input 
              type="password" 
              style={styles.input}
              {...register('password', { required: true })} 
            />
          </label>
        </div>

        {error && <p style={styles.errorText}>{error}</p>}
        
        <button type="submit" style={styles.submitButton}>
          Sign in as Admin
        </button>

        {/* Security Note */}
        <div style={styles.securityNote}>
          <i className="fas fa-shield-alt" style={styles.securityIcon}></i>
          <span>Secure admin access only</span>
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
    background: 'rgba(191, 18, 77, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(191, 18, 77, 0.1)',
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
    border: '2px solid #BF124D',
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
    color: '#BF124D',
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
    marginBottom: '1.5rem',
    textAlign: 'center',
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
  backButtonHover: {
    background: '#f8f9fa',
    borderColor: '#BF124D',
    color: '#BF124D',
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
  },
  inputFocus: {
    borderColor: '#BF124D',
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(191, 18, 77, 0.1)',
    background: 'white',
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
    background: '#BF124D',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '1rem',
  },
  submitButtonHover: {
    background: '#8a0a36',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(191, 18, 77, 0.3)',
  },
  securityNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '0.8rem',
    color: '#6c757d',
    padding: '0.7rem',
    background: 'rgba(42, 157, 143, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(42, 157, 143, 0.2)',
  },
  securityIcon: {
    color: '#2A9D8F',
  },
};

// Add hover effects using JavaScript
const addHoverEffects = () => {
  const style = document.createElement('style');
  style.textContent = `
    button[type="button"]:hover {
      background: #f8f9fa !important;
      border-color: #BF124D !important;
      color: #BF124D !important;
    }
    button[type="submit"]:hover {
      background: #8a0a36 !important;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(191, 18, 77, 0.3) !important;
    }
    input:focus {
      border-color: #BF124D !important;
      outline: none !important;
      box-shadow: 0 0 0 3px rgba(191, 18, 77, 0.1) !important;
      background: white !important;
    }
  `;
  document.head.appendChild(style);
};

// Initialize hover effects when component mounts
if (typeof document !== 'undefined') {
  addHoverEffects();
}

export default AdminLogin;
