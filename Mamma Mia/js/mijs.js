//variables
let total=0;
let nif = document.getElementById("nif");
let nombre = document.getElementById("nombre");
let telefono = document.getElementById("tfno");
let calle = document.getElementById("calle");
let localidad = document.getElementById("localidad");

let formulario = document.querySelector("form");

let enviar = document.getElementById("enviar");

//function para validar el nif
function checkNif(){
    let patron = /^[0-9]{8}-[A-Z]{1}$/;
    return patron.test(nif.value);
}

//function para validar el nombre
function checkNombre(){
    let patron = /^[A-Za-z]{2,20}$/;
    return patron.test(nombre.value);
}

// funcion para validar el telefono
function checkTlf(){
    let patron= /^[0-9]{9}$/;
    return patron.test(telefono.value);
}

//funccion para validar la calle
function checkCalle(){
    let patron = /^[A-Za-z]+$/;
    return patron.test(calle.value);
}


enviar.addEventListener("click",e=>{
    e.preventDefault();
    if(total>0){
        if(checkNif() && checkNombre() && checkTlf() && checkCalle()){
            //Si todo va bien
            alert("Datos enviados");
            formulario.reset();
        }else{
            //Si alguno va mal se enfoca en el que va mal 
            if(!checkNif()){
                nif.focus();
            }else if(!checkNombre()){
                nombre.focus();
            }else if(!checkTlf()){
                telefono.focus();
            }else if(!checkCalle()){
                calle.focus();
            }
        }
    }else{
        alert("No has pedido ninguna pizza")
        formulario.reset();
        setDate(); //Aparece en el formulario la fecha minima
    }
});


//funcioon para poner la fecha minima 
function setDate(){
    let hoy = new Date();
    anho = hoy.getFullYear();
    mes = (hoy.getMonth()+1<10)?'0'+(hoy.getMonth()+1):hoy.getMonth()+1;
    dia = hoy.getDate();

    fecha.min = `${anho}-${mes}-${dia}`;
    fecha.value = `${anho}-${mes}-${dia}`;
}

//funccion para las pizzas
function pizzas(){
    //Declaramos las variables para que vayan
    let quesos =parseInt(document.getElementById("quesos").value);
    let hawai = parseInt(document.getElementById("hawaii").value);
    let barbacoa = parseInt(document.getElementById("barbacoa").value); 
    total=parseInt(5*quesos+7*hawai+5*barbacoa);
    if(quesos+hawai+barbacoa>3){
        total=(0.9*total).toFixed(2);
    }
}

//funcion para los ingredientes extras
function extras(){
    if(total>0){
        //si se escogio alguna pizza se puede esoger los ingredientes extra
        for(let i=1;i<6;i++){
            if(document.getElementById(`extra${i}`).checked){
                //por cada ingrediente se le suma 1 al total
                total=parseFloat(total)+1;
            }
        }
        document.getElementById("cantidad").innerHTML=total;
    }else{
        //si no esogmos al menos una pizza no se puede escoger ningun ingrediente extra
        for(let i =1;i<6;i++){
            document.getElementById(`extra${i}`).checked=false;
        }
       
    }
}

//funccion para la localidad
function localidades(){
    if(total!=0){
        switch (parseInt(localidad.options[localidad.selectedIndex].value)) {
            case 0: break;
            //si el pedido es fuere se le suma un coste
            case 1: total = parseInt(total)+1;
                    break;
            case 2: total=parseInt(total)+1;
                    break;
            case 3: total=parseInt(total)+2
        }
    }else{
        localidad.selectedIndex=0;
    }
}

//funccion para la fechaEntrega
//Seleccionamos la fecha de entrega antes
function fechaEntrega(){
    console.log(fecha.value);
    let fechaEntrega = new Date(fecha.value).getTime();
    let hoy = new Date().getTime();
    let dias = (fechaEntrega-hoy)/(1000*60*60*24);
    console.log(dias)
    if(dias>7){
        //Si la fecha seleccionada es mayor a una semana se hace le descuento del 20%
        total=0.8*parseFloat(total);
    }
}

//funccion recogida
function recogida(){
    if(total==0){
        document.getElementsByName("recogida")[0].checked=true;
        document.getElementsByName("recogida")[1].checked=false;
    }else{
        //si es a domicilio llamamos a la funcion localidad
        if(document.getElementsByName("recogida")[1].checked){
            localidades();
        }
    }
}

//funcion calcular

function calcular(e){
    pizzas()
    extras()
    fechaEntrega()
    recogida()
    if(total==0){
        document.getElementById("cantidad").innerHTML="0.00";
    }else{
        document.getElementById("cantidad").innerHTML=total.toFixed(2);
    }
}

document.getElementById("quesos").addEventListener("change",calcular);
document.getElementById("hawaii").addEventListener("change",calcular);
document.getElementById("barbacoa").addEventListener("change",calcular);


for(let i=1;i<6;i++){
    document.getElementById(`extra${i}`).addEventListener("click",calcular);
}

document.getElementsByName("recogida")[0].addEventListener("click",calcular);
document.getElementsByName("recogida")[1].addEventListener("click",calcular);

document.getElementById("localidad").addEventListener("change",calcular);



document.addEventListener("DOMContentLoaded",e=>{
    setDate();
    calcular();
})