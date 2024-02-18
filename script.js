let resultado = document.getElementById('res');
let resAux;
let tecla;
let operaciones=[];
let botones = document.querySelectorAll('.teclado__tecla');
let delegEvent = document.querySelector('.calculadora__teclado');
function numEnPantalla(evento) {
    tecla = evento.target.innerHTML;
    resultado.innerHTML+=tecla;
}
function opEnPantalla(evento) {
    tecla = evento.target.innerHTML;
    operaciones.push(tecla);
    resultado.innerHTML+=tecla;
}
function resEnPantalla(evento) {
    resultado.innerHTML=calcRes();
}
function calcRes() {
    let numerosCad = resultado.innerHTML.split(/[\+\-\*\/]/);
    // return numeros.length;
    if (numerosCad.length>1) {
        let numeros;
        if (numerosCad.some(str => str.includes('.'))) {
            numeros = numerosCad.map(str => parseFloat(str));
        } else {
            numeros = numerosCad.map(str => parseInt(str, 10));
        }
        let contadorOp = 0;
        resAux = numeros[0];
        for(let i=1; i<numeros.length; i++) {
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
    if(e.target && (e.target).classList.contains('tecla--numero')) {
        numEnPantalla(e);
    }
    else if(e.target && e.target.classList.contains('tecla--operacion')){
        opEnPantalla(e);
    } else {
        resEnPantalla(e);
    }
});







// function pantalla(){
//     let scrn = document.querySelector(".calculadora__pantalla");
//     let res = scrn.innerText;
//     alert(res);
// }
