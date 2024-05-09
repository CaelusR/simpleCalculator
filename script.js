let resultado = document.getElementById('res');
let tecla;
let operaciones=[];
const esNum = /^[0-9]*$/;

//por medio de la delegacion de eventos, todos los botones tendran evento click
let delegEvent = document.querySelector('.calculadora__teclado');
//Mostrar en pantalla un numero presionado por un botón.
function numEnPantalla(evento) {
    tecla = evento.target.innerHTML;
    resultado.innerHTML+=tecla;
}
function opEnPantalla(evento) {
    tecla = evento.target.innerHTML;
    operaciones.push(tecla);
    resultado.innerHTML+=tecla;
}
function scrnDisplay(evento) {
    if(evento.target.innerHTML==="DEL"){
        let caracter = resultado.innerHTML[resultado.innerHTML.length-1];
        if(operaciones.includes(caracter)){
            operaciones.pop();
        }
        resultado=resultado.sub;
    }
    else {
        operaciones=[];
        resultado.innerHTML="";
    }
}
//Teclado
function numEnPantallaTec(keyPressed) {
     resultado.innerHTML+=keyPressed; 
}
function opEnPantallaTec(evento) {
    tecla = evento.key;
    operaciones.push(tecla);
    resultado.innerHTML+=tecla;
}

//mostrar resultado
function resEnPantalla() {
    resultado.innerHTML=calcRes();
    operaciones=[];
}
//controlar el teclado
let tecladoPres = function(e) {
    if((e.key >= 0 && e.key <= 9) || e.key == "."){
        numEnPantallaTec(e.key);
      }
    //segun el codigo de la tecla, ejecutamos una función
    switch(e.keyCode){
        case 187:  // + o *
            opEnPantallaTec(e);
            break;
        case 191:   //dividir(/)
            opEnPantallaTec(e);
            break;
        case 189:   //resta (-)
            opEnPantallaTec(e);
            break;
        case 13:
            resEnPantalla();
            break;

        default:
            break;
    }
}
//Verif si son numeros decimales/flotantes válidos 
function esNumeroValido(numero) {
    const regex = /^\d*\.?\d+$/;
    return regex.test(numero);
}
function calcRes() {
    let numerosCad = resultado.innerHTML.split(/[\+\-\*\/]/);
    if (numerosCad.some(str => !esNumeroValido(str))) {
        return 'Error: entrada no válida(rev. los numeros)';
    }
    // return numeros.length;
    else if (numerosCad.length>1) {
        let numeros;
        let resAux;
        if (numerosCad.some(str => str.includes('.'))) {
            numeros = numerosCad.map(str => parseFloat(str));
        } else {
            numeros = numerosCad.map(str => parseInt(str, 10));
        }
        let contadorOp = 0;
        resAux = numeros[0];
        for(let i=1; i<numeros.length; i++) {
            if(numeros[i]==0) return 'Error: No es posible dividir entre cero'
            switch (operaciones[contadorOp]){    
                case "+": 
                    resAux += numeros[i];
                    break;
                case "-": 
                    resAux -= numeros[i];
                    break;
                case "*": 
                    resAux *= numeros[i];
                    break;
                case "/": 
                    resAux /= numeros[i];
                    break;
                default:
                    return resAux = "Error: operacion no válida"; 
            }
            contadorOp++;
        }
        return resAux;
    }   
}

delegEvent.addEventListener('click', (e)=> {
    if(e.target && (e.target).classList.contains('tecla--numero') ||
       e.target && e.target.classList.contains('tecla--punto')) {
        numEnPantalla(e);
    }
    else if(e.target && e.target.classList.contains('tecla--operacion')){
        opEnPantalla(e);
        
    } else if(e.target && e.target.classList.contains('tecla--modScrn')) {
        scrnDisplay(e);
    } else {
        resEnPantalla();
    }
});
document.onkeyup = tecladoPres;
