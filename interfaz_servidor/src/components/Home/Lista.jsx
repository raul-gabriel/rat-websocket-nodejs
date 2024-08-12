import React, { useContext,useState } from 'react';
import { ContextHome } from "../../context/ContextHome"

function Lista() {

    //recibir parametros
    const { lista_clientes,modalShow,abrirModal,cerrarModal,setIdVictima} = useContext(ContextHome)


    const accionVictima = (e, id) => {
        e.preventDefault();
        setIdVictima(id)
        abrirModal()
    };



    return (
        <>
            <div className="container mt-3">
                <h2>Lista de Clientes</h2>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>IP Local</th>
                            <th>IP Pública</th>
                            <th>Nombre</th>
                            <th>Sistema Operativo</th>
                            <th>Arquitectura</th>
                            <th>ACCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista_clientes && Object.entries(lista_clientes).map(([id, cliente]) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{cliente.ipLocal || 'N/A'}</td>
                                <td>{cliente.ipPublica || 'N/A'}</td>
                                <td>{cliente.nombre || 'N/A'}</td>
                                <td>{cliente.sistema_operativo || 'N/A'}</td>
                                <td>{cliente.arquitectura || 'N/A'}</td>
                                <td><button type="button" className="btn btn-primary" onClick={(e) => accionVictima(e, id)}>
                                    Ejecutar
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Lista