# RAT-WebSocket-NodeJS

Este proyecto es una herramienta de acceso remoto (RAT) desarrollada en Node.js y JavaScript, utilizando WebSocket a través de Socket.IO para la comunicación entre el cliente y el servidor. La interfaz de usuario está construida con React para proporcionar una interacción amigable y eficiente.

## ⚠️ Advertencia

**Este proyecto es con fines educativos. No me hago responsable del mal uso que se le pueda dar. El uso indebido de esta herramienta podría violar las leyes de privacidad y seguridad. Úselo con responsabilidad.**

## Estructura del Proyecto

El proyecto está organizado en tres carpetas principales:

### 1. `interfaz_servidor`

Esta carpeta contiene la interfaz de usuario desarrollada en React. La interfaz permite interactuar con las víctimas infectadas y realizar diversas acciones de control remoto.

#### Funcionalidades:
- **Listado de infectados**: Visualiza todos los dispositivos infectados conectados al servidor.
- **Ejecutar comandos**: Permite ejecutar comandos directamente desde la interfaz en los dispositivos infectados.
- **Enviar archivos**: Posibilidad de subir archivos al dispositivo infectado.
- **Extraer archivos**: Descarga archivos desde el dispositivo infectado.
- **Capturar pantalla**: Captura la pantalla del dispositivo infectado en tiempo real.
- **Enviar comandos masivos**: Envía comandos a todos los dispositivos infectados simultáneamente.

### 2. `servidor`

Este directorio contiene el servidor WebSocket construido con Node.js utilizando Socket.IO. El servidor actúa como intermediario entre la interfaz de usuario y los clientes infectados.

#### Funcionalidades:
- **Recepción de eventos**: Recibe eventos desde la interfaz de usuario y los reenvía al cliente correspondiente.
- **Comunicación bidireccional**: Recibe información de los clientes y la envía a la interfaz para mostrarla al usuario.

### 3. `cliente`

El cliente, desarrollado en Node.js, se convierte en un ejecutable `.exe` utilizando `pkg`. Este cliente se instala en los dispositivos objetivos y se conecta al servidor para recibir y ejecutar comandos.

#### Funcionalidades:
- **Conexión automática**: Se conecta automáticamente al servidor WebSocket.
- **Ejecutar comandos**: Ejecuta los comandos recibidos desde el servidor.
- **Transferencia de archivos**: Envía y recibe archivos según las instrucciones del servidor.
- **Captura de pantalla**: Captura la pantalla del dispositivo y la envía al servidor.

## Uso

Para ejecutar este proyecto, debes tener Node.js instalado. Sigue estos pasos:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/rat-websocket-nodejs.git

