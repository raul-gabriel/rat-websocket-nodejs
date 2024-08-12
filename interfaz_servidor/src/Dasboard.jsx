import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cookies from 'js-cookie';
//redux manejador de estados

function Dasboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticatedCookie = Cookies.get('isAuthenticated');
        if (isAuthenticatedCookie) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            navigate('/');
        }
    }, [navigate]);



    return (
        <>
            <Navbar />
            <Outlet />

        </>
    )
}

export default Dasboard