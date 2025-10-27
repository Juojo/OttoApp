// src/components/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('url', formData);

      if (response.data.success) {
        alert('¡Cuenta creada exitosamente!');
        navigate('/login');
      } else {
        setError(response.data.message || 'Error al crear la cuenta');
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
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo">OG</div>
        <h1>OttoGourmet</h1>
        <p>Crea tu cuenta para recibir las mejores ofertas en alimento felino.</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Nombre completo</label>
          <input
            type="text"
            name="fullName"
            placeholder="Ej. María Gómez"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="correo@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear cuenta'}
          </button>
        </form>

        <div className="links">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;