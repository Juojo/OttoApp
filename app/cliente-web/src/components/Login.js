// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/loginUsuario`, formData);

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        alert('¡Inicio de sesión exitoso!');
      } else {
        setError(response.data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Error en el servidor');
      } else if (err.request) {
        setError('No se pudo conectar con el servidor');
      } else {
        setError('Error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        <img src="/ogLogo.jpg" alt="OttoGourmet" className="logo" />

        <h2>OttoGourmet</h2>
        <h1>Iniciar Sesión</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              👁️
            </span>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Iniciando...' : 'Entrar'}
          </button>
        </form>

        <div className="links">
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          <Link to="/signup">Crear una cuenta</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;