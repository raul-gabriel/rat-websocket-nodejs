import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('isAuthenticated');
    navigate('/');
  };


  return (
    <div className="d-flex justify-content-end">
      <button type="button" className="btn btn-danger mt-2" onClick={logout}>Cerrar Sesión</button>
    </div>
  )
}

export default Navbar