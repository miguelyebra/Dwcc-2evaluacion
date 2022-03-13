
//Cojemos los datos del formulario
const formulario=document.querySelector("#libro-form")

const titulo=document.querySelector("#titulo")
const autor=document.querySelector("#autor")
const isbn=document.querySelector("#isbn")

const tbody=document.querySelector("#lista-libros")
//Cogemos el template y le ponemos content para que coja todo lo de dentro cogeindo el tr y lo de dentro
const templateLibros = document.querySelector("#template-libro").content;
console.log(templateLibros)

//Cremaos el array para luego añadir todos los libros
let libros=[];




//Funcion para añadir los libros

function añadirLibros(){
    const libro={
        titulo:titulo.value,
        autor:autor.value,
        isbn:isbn.value,
        id:new Date().getTime()
    }
    //Añadimos los libros a la array
    libros.push(libro);
    renderLibros();
}

function renderLibros(){
    tbody.innerHTML="";
    //Creamos un fragmento donde meteremos todo 
    const fragmento = document.createDocumentFragment();
    libros.forEach(libro=>{
        //Conamos el template
        const book = templateLibros.cloneNode(true);
        //cojemos los tds
        const tds = book.querySelectorAll("td");
        //y los añadimos
        tds[0].textContent=libro.titulo;
        tds[1].textContent=libro.autor;
        tds[2].textContent=libro.isbn;
        //Cogemos el a
        const a = tds[3].querySelector("a");
        //Aladimmos el data-id al a
        a.dataset.id=libro.id;

        fragmento.appendChild(book);
    })
    tbody.appendChild(fragmento);
}   

//Evento para eliminar un libro 
tbody.addEventListener("click",e=>{
    e.preventDefault();
    if(e.target.dataset.id){
        //Cojemos el index del libro
        let eliminar = libros.findIndex(el=>el.id==e.target.dataset.id);
        //Lo eliminamos dela array
        libros.splice(eliminar,1);
    }
    renderLibros()
});


formulario.addEventListener("submit",eSubmit=>{
    eSubmit.preventDefault();
    if (libros.length) {
        //Comprobamos si ya se metio un isbn
        if (libros.find(libro=>libro.isbn==isbn.value))
            alert("El libro ya esta registrado")
        else
            añadirLibros()
    } else 
        añadirLibros()
        //Reseteamos el formulario para añadir mas comodamente los datos
    formulario.reset();
})