import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import configuracion from '../app/configuracion';
import Cookies from 'js-cookie';

function Login() {

  const [usuario, setusuario] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setmensaje] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(configuracion.urlServidor + 'api/iniciarSesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await response.json();
      console.log(data)

      if (data.mensaje === 1) {
        console.log("Inicio de sesión exitoso");
        Cookies.set('isAuthenticated', 'true', { secure: true, sameSite: 'Strict' }); // Sin expiración
        navigate('/dashboard/home');

      } else {
        setmensaje('datos incorectos');
      }


    } catch (error) {
      console.error('Error al conectar con la API', error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="usuario" className="form-label">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  id="usuario"
                  value={usuario}
                  onChange={(e) => setusuario(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
          </div>

          {
            mensaje && (
              <div className="alert alert-danger mt-5" role="alert">
                {mensaje}
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Login