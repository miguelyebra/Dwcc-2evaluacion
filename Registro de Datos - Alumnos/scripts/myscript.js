const datos=[];

const nif = document.querySelector("#nif");
const nombre = document.querySelector("#nombre");
const direccion = document.getElementById("direccion");
const fecha = document.getElementById("fnac");
const select = document.getElementById("estudios");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const otra = document.getElementById("otra");
console.log(otra);
let sexo;


const formulario = document.querySelector("form");
 // da 0 si es homnbre o 1 si es mujer
const templeFila = document.getElementById("template-fila").content;
const tbody = document.getElementById("tbody");
let tfooter = document.getElementById("tfooter");


if(radio==0){
    sexo="hombre";
}else{
    sexo="mujer";
}
console.log(sexo);

function añadirDatos(){
    const dato={
        nif:nif.value,
        nombre:nombre.value,
        sexo:sexo.value,
        direccion:direccion.value,
        fecha:fecha.value,
        select:select.value,
        telefono:telefono.value,
        email:email.value,
        aficiones:otra.value,
        id:new Date().getTime()
    }
    datos.push(dato);
    renderDatos();

}

function renderDatos(){
    tbody.innerHTML="";
    const fragmento = document.createDocumentFragment();
    datos.forEach(dato=>{
        templeFila.querySelectorAll("td")[0].textContent=dato.nif;
        templeFila.querySelectorAll("td")[1].textContent=dato.nombre;
        templeFila.querySelectorAll("td")[2].textContent=dato.sexo;
        templeFila.querySelectorAll("td")[3].textContent=dato.direccion;
        templeFila.querySelectorAll("td")[4].textContent=dato.fecha;
        templeFila.querySelectorAll("td")[6].textContent=dato.telefono;
        templeFila.querySelectorAll("td")[7].textContent=dato.email;
        templeFila.querySelectorAll("td")[8].textContent=dato.aficiones;
        templeFila.querySelector("a").dataset.id=dato.id;
        const clone = templeFila.cloneNode(true);
        fragmento.appendChild(clone);
    })
    tbody.appendChild(fragmento);
    datos.forEach((dato,indice)=>{
         tfooter.innerHTML=indice+1;
    })
    
}




formulario.addEventListener("submit",e=>{
    e.preventDefault();
    if(datos.length){
        añadirDatos();
        
        formulario.reset();
    }else{
        añadirDatos();
        formulario.reset();
    }
})


tbody.addEventListener("click",e=>{
    console.log(e.target);
    if(e.target.dataset.id){
        let eliminar = datos.findIndex(el=>el.id==e.target.dataset.id);
        datos.splice(eliminar,1);
    }
    
    renderDatos();
})

