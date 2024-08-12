import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dasboard from "./Dasboard";
import Login from './pages/Login';
import NotFount from './pages/NotFount'
import Home from './pages/Home';

//<Route path="home" element={< Home />} />
function Rutas() {
    return <>
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard/*" element={<Dasboard />}>
                    <Route path="home" element={<Home/>} />

                </Route>
                <Route path="*" element={<NotFount />} />
            </Routes>
        </BrowserRouter>
    </>
}

export default Rutas;