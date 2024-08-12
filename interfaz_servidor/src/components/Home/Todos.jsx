import React, { useContext, useState, useRef } from 'react';
import { ContextHome } from "../../context/ContextHome"


function Todos() {

    const { ejecutarComando } = useContext(ContextHome)
    const [comandoEjecutar, setcomandoEjecutar] = useState('')
    const [comand, setcomand] = useState('')


    //funciones
    const EjecutarComando = (e, comando) => {
        e.preventDefault();
        if (comando != '') {
            ejecutarComando('TODOS', comando)
            setcomandoEjecutar(comando)
            setcomand('');
        } else {
            alert('comando invalido')
        }

    }



    return (
        <div>
            <textarea className="form-control" rows="5" placeholder=''
                value={comand}
                onChange={(e) => setcomand(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') { EjecutarComando(e, e.target.value); }
                }} >
            </textarea>
            <p className='text-danger' style={{ fontSize: '14px' }} >{comandoEjecutar}</p>
        </div>
    )
}

export default Todos