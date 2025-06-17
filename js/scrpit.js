let pantalla = document.getElementByID('pantalla');
let operacionActual = '';
let operadorAnteior = null;
let esperandoOperando = false;

function actualizaePantalla() {
    pantalla.textoContent = operacionActual || '0';
}

function limpiar() {
    operacionActual = '';
    operadorAnteior = null;
    esperandoOperando = false;
    actualizarPantalla();
}

function borrar() {
    if (operacionActual.length > 0) {
        operacionActual = operacionActual.slice(0, -1);
        actualizaePantalla();
    }
}

function agregarNumero(numero) {
    if (esperandoOperando) {
        operacionActual = false;
    } else {
        operacionActuaal = operacionActual === '0' ? numero : operacionActual + numero;
    }
    actualizaePantalla();
}

function agregarPunto() {
    if (esperandoOperando) {
        operacionActual = '0.';
        esperandoOperando = false;
    } else if (operacionActual.indexOf('.')=== -1) {
        operacionActual += '.';
    }
    actualizaePantalla()
}

function agregarOperador(operador) {
    if (operacionActual === '') return;

    if(operadorAnteior !== null && !esperandoOperando) {
        calcular();
    }

    operadorAnteior = operador;
    operacionActual += ' ' + operador +' ';
    esperandoOperando = false;
    actualizarPantalla();
}

function calcular() {
    if (operadorAnteior === null  || esperandoOperando) return;

    try{
        // Reemplazar x por * para la evaluacion
        let expresion = operacionActual.replace(/x/g, '*');

        //Evaluar la expresion de forma segura
        let resultado = Function('"use strict"; return (' + expresion + ')')();

        // Redondear eel resultado para evitar problemas de precision de punto flotante
        resultado = Math.round ((resultado + Number.EPSILON)*100000000) / 100000000;

        operacionActual = resultado.toString();
        operadorAnterior = null; 
        esperandoOperando = true;
        actualizarPantalla();
    } catch (error) {
        operacionActual = 'Error';
        operacionAnterior = null;
        esperandoOperando = true;
        actualizarPantalla();
    }
}

//Soporte par teclado 
document.addEventListener('keydown', function(event) {
    const key = event.key; 
    if (key >= '0' && key <= '9') {
        agregarNumero(key);
    } else if (key === '.') {
        agregarPunto();
    } else if (key === '+' || key === '-') {
        agregarOperador(key);
    } else if (key === '*') {
        agregarOperador('*');
    }else if (key === '/') {
        event.preventDefault();
        agregarOperador('/');
    } else if (key == 'Enter' || key === '=') {
        calcular();
    } else if (key === 'Escape') {
        limpiar();
        } else if (key === 'Backspace') {
        borrar();
    }
        
});

// Inicializar
actualizarPantalla();
