import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../../components/common/Button/Button';
import Input from '../../../components/common/Input/Input';
import './Login.css';

const Login = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { login, getDashboardPath } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const result = await login(formData);
    
    if (result.success) {
      // Redirigir usando la función del contexto
      navigate(getDashboardPath());
    } else {
      setErrors({ general: result.message });
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/img/logo-oscuro.png" alt="Logo" className="login-logo" />
          <h1 className="login-title">{t('login.title')}</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label={t('email')}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            placeholder="usuario@test.com"
          />
          
          <Input
            label={t('password')}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            placeholder="••••••••"
          />
          
          {errors.general && (
            <div className="error-general">{errors.general}</div>
          )}
          
          <Button 
            type="submit" 
            variant="primary" 
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Cargando...' : t('buttons.submit')}
          </Button>
        </form>
        
        <p className="register-link">
          {t('no_account')}{' '}
          <Link to="/register">{t('register_now')}</Link>
        </p>

        <div className="login-footer">
          <Link to="/forgot-password">{t('forgot_password')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;