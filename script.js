let resultado = document.getElementById('res');
let tecla;
let operaciones=[];

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
        resultado.innerHTML=resultado.innerHTML.substring(0,resultado.innerHTML.length-1);
    } else {
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
    let numerosCad = resultado.innerHTML.split(/[\+\-\*\/]/);
    if (numerosCad.some(str => !esNumeroValido(str))) {
        resultado.innerHTML = 'Error: entrada no válida(rev. los numeros)';
    } else {
        if (numerosCad.some(str => str.includes('.'))) {
            numerosCad = numerosCad.map(str => parseFloat(str));
        } else {
            numerosCad= numerosCad.map(str => parseInt(str, 10));
        }
        resultado.innerHTML=calcRes(numerosCad,operaciones);
    }
    operaciones=[];
}
//controlar el teclado
let tecladoPres = function(e) {
    console.log(e);
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
function calcRes(numerosCad, operaciones) {
    if(numerosCad.length>=1) {
        //let resAux;
        let resAux = numerosCad[0];
        for(let i=1; i<numerosCad.length; i++) {
            if(numerosCad[i]==0&&operaciones[i-1]==="/") return 'Error: No es posible dividir entre cero';
            else if(ordenOp(operaciones[i-1], operaciones[i])){
                numerosCad[i]=calcRes(numerosCad.slice(i), operaciones.slice(i));
                numerosCad=numerosCad.slice(0,i+1);
            }
            switch (operaciones[i-1]){    
                case "+": 
                    resAux += numerosCad[i];
                    break;
                case "-": 
                    resAux -= numerosCad[i];
                    break;
                case "*": 
                    resAux *= numerosCad[i];
                    break;
                case "/": 
                    resAux /= numerosCad[i];
                    break;
                default:
                    return resAux = "Error: operacion no válida"; 
            }
        }
        return resAux;
    }   
}
//verificamos si la operacion 1 tiene un nvl de orden menor que la 2
function ordenOp(op1, op2) {
    let opCad =[op1, op2];
    let ordenOperacion = [];
    for(let i = 0; opCad.length>i;i++){
        if(opCad[i]==="*")      ordenOperacion.push(3);
        else if(opCad[i]==="/") ordenOperacion.push(2);
        else                    ordenOperacion.push(1);
    }
    if(ordenOperacion[0]<ordenOperacion[1]) return true;
    else                                    return false;
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
        if (e.target && e.target.classList.contains('tecla--resultado')) resEnPantalla();
    }
});
document.onkeyup = tecladoPres;
