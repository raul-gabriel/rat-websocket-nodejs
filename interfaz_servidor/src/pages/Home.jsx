import { ContextHomeProvider } from "../context/ContextHome"
import Lista from "../components/Home/Lista"
import React, { useContext } from 'react';
import Modal from "../components/Home/Modal";
import Todos from "../components/Home/Todos";

function Home() {

  //recibir parametros
  

  return (
    <>
      <ContextHomeProvider>
      <Modal/>

        <div className="container mt-5">

          <ul className="nav nav-tabs" id="myTab" role="tablist">

            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="victimas-tab" data-bs-toggle="tab" data-bs-target="#victimas-tab-pane" type="button" role="tab" aria-controls="victimas-tab-pane" aria-selected="true">Lista de Victimas</button>
            </li>


            <li className="nav-item" role="presentation">
              <button className="nav-link" id="masivo-tab" data-bs-toggle="tab" data-bs-target="#masivo-tab-pane" type="button" role="tab" aria-controls="masivo-tab-pane" aria-selected="false">Comandos Masivos</button>
            </li>

          </ul>

          
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="victimas-tab-pane" role="tabpanel" aria-labelledby="victimas-tab" tabIndex="0">
              <Lista />
            </div>

            <div className="tab-pane fade" id="masivo-tab-pane" role="tabpanel" aria-labelledby="masivo-tab" tabIndex="0">

              <h1>enviar comando a todas las victimas</h1><br/>
              <Todos/>

            </div>

          </div>


        </div>
      </ContextHomeProvider>
    </>
  )
}

export default Home