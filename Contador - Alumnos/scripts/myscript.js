



let boton1 = document.getElementsByClassName("btn")[0]
let boton2 = document.getElementsByClassName("btn")[1]
let boton3 = document.getElementsByClassName("btn")[2]
let valor = document.getElementById("valor");
let inicio=0;

boton1.addEventListener("click",decrementar,false);

function decrementar(){
    valor.innerHTML=parseInt(--inicio);
}

boton2.addEventListener("click",resetear,false);

function resetear(){
    inicio =0;
    valor.innerHTML=inicio;
}

boton3.addEventListener("click",incrementar,false);

function incrementar(){
    valor.innerHTML=parseInt(++inicio);

}



