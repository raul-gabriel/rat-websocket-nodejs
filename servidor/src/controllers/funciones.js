const chalk = require('chalk');

class debugConsola {
    async error(titulo, contenido = null) {
        console.log(chalk.bgRed.white('error: ' + titulo));
        if (typeof contenido === 'object' && contenido !== null) {
            console.log(chalk.gray(this.formatObject(contenido)));
        }
    }

    async success(titulo, contenido = null) {
        console.log(chalk.bgGreen.white('exito: ' + titulo));
        if (typeof contenido === 'object' && contenido !== null) {
            console.log(chalk.gray(this.formatObject(contenido)));
        }
    }

    async alerta(titulo, contenido = null) {
        console.log(chalk.bgYellow.white('alerta: ' + titulo));
        if (typeof contenido === 'object' && contenido !== null) {
            console.log(chalk.gray(this.formatObject(contenido)));
        }
    }

    async enviado(titulo, contenido = null) {
        console.log('')
        console.log(chalk.bgBlue.white('instruccion enviado: ' + titulo));

        if (typeof contenido === 'object' && contenido !== null) {
            console.log(chalk.gray(this.formatObject(contenido)));
        } else {
            console.log(chalk.gray(contenido));
        }
    }

    async recuperado(titulo, contenido = null) {
        console.log('')
        console.log(chalk.bgGreen.white('instruccion recuperado: ' + titulo));

        if (typeof contenido === 'object' && contenido !== null) {
            console.log(chalk.gray(this.formatObject(contenido)));
        } else {
            console.log(chalk.gray(contenido));
        }
    }

    formatObject(obj) {
        let formatted = '';
        for (const [key, value] of Object.entries(obj)) {
            formatted += `${key}: ${value}\n`;
        }
        return formatted;
    }
}

module.exports = debugConsola;
