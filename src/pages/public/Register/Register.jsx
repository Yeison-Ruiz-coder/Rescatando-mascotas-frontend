import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../../components/common/Button/Button';
import Input from '../../../components/common/Input/Input';
import './Register.css';

const Register = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { register, getDashboardPath } = useAuth();
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    password_confirmation: '',
    telefono: ''
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

    if (formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: t('passwords_not_match') });
      setLoading(false);
      return;
    }

    const result = await register(formData);
    
    if (result.success) {
      navigate(getDashboardPath());
    } else {
      setErrors({ general: result.message });
    }
    
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <img src="/img/logo-oscuro.png" alt="Logo" className="register-logo" />
          <h1 className="register-title">{t('register.title')}</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="register-form">
          <Input
            label={t('name')}
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
            required
          />
          
          <Input
            label={t('lastname')}
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            error={errors.apellidos}
          />
          
          <Input
            label={t('email')}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          
          <Input
            label={t('phone')}
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            error={errors.telefono}
          />
          
          <Input
            label={t('password')}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          
          <Input
            label={t('confirm_password')}
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            error={errors.password_confirmation}
            required
          />
          
          {errors.general && (
            <div className="error-general">{errors.general}</div>
          )}
          
          <Button 
            type="submit" 
            variant="primary" 
            disabled={loading}
            className="register-button"
          >
            {loading ? 'Cargando...' : t('buttons.submit')}
          </Button>
        </form>
        
        <p className="login-link">
          {t('yes_account')}{' '}
          <Link to="/login">{t('login_now')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;