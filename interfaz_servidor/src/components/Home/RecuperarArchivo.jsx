import React, { useContext, useState } from 'react';
import { ContextHome } from "../../context/ContextHome"

function RecuperarArchivo() {

    const { idVictima, recuperarArchivo, respuestaArchivoRecuperado, errorRecuperarArchivo } = useContext(ContextHome)
    const [rutaArchivo, setrutaArchivo] = useState('')

    const RecuperarArchivoCliente = (e) => {
        e.preventDefault();
        recuperarArchivo(idVictima, rutaArchivo)
        setrutaArchivo('')
    }

    return (
        <div>
            {
                errorRecuperarArchivo && (
                    <div className="alert alert-danger" role="alert">
                        {errorRecuperarArchivo}
                    </div>
                )
            }

            <div className="row">
                <div className="col-10">
                    <input
                        type="text"
                        value={rutaArchivo}
                        placeholder='Ruta del archivo + nombre'
                        className="form-control"
                        onChange={(e) => setrutaArchivo(e.target.value)}
                    />
                </div>
                <div className="col-2"> <button className='btn btn-danger' onClick={(e) => RecuperarArchivoCliente(e)}>Extraer</button></div>
            </div>
        </div>
    )
}

export default RecuperarArchivo