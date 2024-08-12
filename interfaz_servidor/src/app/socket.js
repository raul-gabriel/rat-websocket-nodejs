import io from 'socket.io-client';
import configuracion from './configuracion';

const socket = io(configuracion.urlServidor);
export default socket;