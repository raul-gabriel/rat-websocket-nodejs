# RAT-WebSocket-NodeJS

Este proyecto es una herramienta de acceso remoto (RAT) desarrollada en Node.js y JavaScript, utilizando WebSocket a través de Socket.IO para la comunicación entre el cliente y el servidor. La interfaz de usuario está construida con React para proporcionar una interacción amigable y eficiente.

## ⚠️ Advertencia

**Este proyecto es con fines educativos. No me hago responsable del mal uso que se le pueda dar. El uso indebido de esta herramienta podría violar las leyes de privacidad y seguridad. Úselo con responsabilidad.**

## Estructura del Proyecto

# 🛠️ RAT-WebSocket-NodeJS

Este proyecto es una herramienta de acceso remoto (RAT) desarrollada en Node.js y JavaScript, utilizando WebSocket a través de Socket.IO para la comunicación entre el cliente y el servidor. La interfaz de usuario está construida con React para proporcionar una interacción amigable y eficiente.

## ⚠️ Advertencia

**Este proyecto es con fines educativos. No me hago responsable del mal uso que se le pueda dar. El uso indebido de esta herramienta podría violar las leyes de privacidad y seguridad. Úselo con responsabilidad.**

## 🗂️ Estructura del Proyecto

El proyecto está organizado en tres carpetas principales:

### 1. `interfaz_servidor`

Esta carpeta contiene la interfaz de usuario desarrollada en React. La interfaz permite interactuar con las víctimas infectadas y realizar diversas acciones de control remoto.

#### Funcionalidades:
- **📋 Listado de infectados**: Visualiza todos los dispositivos infectados conectados al servidor.
- **💻 Ejecutar comandos**: Permite ejecutar comandos directamente desde la interfaz en los dispositivos infectados.
- **📤 Enviar archivos**: Posibilidad de subir archivos al dispositivo infectado.
- **📥 Extraer archivos**: Descarga archivos desde el dispositivo infectado.
- **🖼️ Capturar pantalla**: Captura la pantalla del dispositivo infectado en tiempo real.
- **📡 Enviar comandos masivos**: Envía comandos a todos los dispositivos infectados simultáneamente.

### 2. `servidor`

Este directorio contiene el servidor WebSocket construido con Node.js utilizando Socket.IO. El servidor actúa como intermediario entre la interfaz de usuario y los clientes infectados.

#### Funcionalidades:
- **🔄 Recepción de eventos**: Recibe eventos desde la interfaz de usuario y los reenvía al cliente correspondiente.
- **🔁 Comunicación bidireccional**: Recibe información de los clientes y la envía a la interfaz para mostrarla al usuario.

### 3. `cliente`

El cliente, desarrollado en Node.js, se convierte en un ejecutable `.exe` utilizando `pkg`. Este cliente se instala en los dispositivos objetivos y se conecta al servidor para recibir y ejecutar comandos.

#### Funcionalidades:
- **🔗 Conexión automática**: Se conecta automáticamente al servidor WebSocket.
- **💻 Ejecutar comandos**: Ejecuta los comandos recibidos desde el servidor.
- **📤 Transferencia de archivos**: Envía y recibe archivos según las instrucciones del servidor.
- **🖼️ Captura de pantalla**: Captura la pantalla del dispositivo y la envía al servidor.






## 🚀 Despliegue del Proyecto

### INTERFAZ SERVIDOR

1. **Clonar el proyecto:**

   git clone https://github.com/tu-usuario/rat-websocket-nodejs.git

2. **Configurar la URL del servidor:**

   Edita el archivo `interfaz_servidor/src/app/configuracion.js` y configura la URL del servidor en el cual se va a desplegar.

3. **Instalar dependencias y compilar el proyecto React:**
   ```bash
   cd interfaz_servidor
   npm install
   npm run build
   ```
3. **interfaz y servdor:** copear la caperta `interfaz_servidor/dist` a la carpeta `servidor\public`
### SERVIDOR

1. **Instalar dependencias:**
```bash
   cd servidor
   npm install
```
2. **Configurar el archivo `.env`:**

   Crea o edita el archivo `.env` en el directorio del servidor con el siguiente contenido:
```bash
   PUERTO=42474
   TOKEN_API=
   USUARIO=
   PASSWORD=
```

3. **Desplegar en un hosting o servidor que admita Node.js.**

### CLIENTE

1. **Instalar dependencias:**
``` bash
   cd cliente
   npm install
```
2. **Instalar `pkg` para generar el ejecutable:**
```bash
   npm install -g pkg
```
3. **Generar el ejecutable:**
```bash
   pkg . -t node18-win-x64 --node-version 18 --output mi_proyecto.exe
```
   Si encuentras un error al generar el ejecutable, instala Node.js versión 18 utilizando `nvm`, reinstala `pkg`, y vuelve a ejecutar el comando.





   # RAT-WebSocket-NodeJS - Versión Mejorada

Este es un proyecto mejorado de **RAT-WebSocket-NodeJS**, una herramienta de acceso remoto (RAT) que originalmente estaba desarrollada en **Node.js** y **JavaScript**. En esta nueva versión, el **servidor** está implementado en **Node.js**, mientras que el **cliente** ahora está desarrollado en **Golang** y compilado a un archivo ejecutable, lo que mejora significativamente el rendimiento y la compatibilidad.

## Mejoras

- **Servidor en Node.js**: Continuamos utilizando Node.js para el servidor, pero con una implementación optimizada.
- **Cliente en Golang**: El cliente ahora está escrito en **Golang** y compilado, lo que lo hace más eficiente y difícil de detectar por soluciones de seguridad.
- **Despliegue en hosting compartido**: Gracias a las mejoras en la arquitectura, el servidor ahora puede desplegarse en servicios de **hosting compartido**.
Si deseas obtener más detalles sobre esta versión mejorada o acceder al código fuente, **no dudes en contactarme por privado**.

## Video demostrativo

Puedes ver el video demostrativo haciendo clic en el siguiente enlace:

[**Ver video demostrativo**](https://www.youtube.com/watch?v=LsA0BP-JBuY)

---


