// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await axios.post('url', {
        email
      });

      if (response.data.success) {
        setSuccess(true);
        // Opcional: redirigir después de 3 segundos
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(response.data.message || 'No se pudo enviar el enlace');
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
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>OttoGourmet</h2>
        <h1>¿Olvidaste tu contraseña?</h1>

        {!success ? (
          <>
            <p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar enlace'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <p>✅ ¡Listo! Hemos enviado un enlace a tu correo.</p>
            <p>Redirigiendo al login...</p>
          </div>
        )}

        <div className="links">
          <Link to="/login">← Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;