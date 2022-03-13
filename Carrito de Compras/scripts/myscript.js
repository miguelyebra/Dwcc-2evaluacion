const productos=[
    {
        "precio": 500,
        "id": 1,
        "title": "Café",
        "thumbnailUrl": "https://picsum.photos/id/0/600"
    },
    {
        "precio": 300,
        "id": 2,
        "title": "Pizza",
        "thumbnailUrl": "https://picsum.photos/id/10/600"
    },
    {
        "precio": 100,
        "id": 3,
        "title": "Agua",
        "thumbnailUrl": "https://picsum.photos/id/20/600"
    },
    {
        "precio": 50,
        "id": 4,
        "title": "Sandía",
        "thumbnailUrl": "https://picsum.photos/id/30/600"
    },
    {
        "precio": 10,
        "id": 5,
        "title": "Mango",
        "thumbnailUrl": "https://picsum.photos/id/40/600"
    },
    {
        "precio": 150,
        "id": 6,
        "title": "Chela",
        "thumbnailUrl": "https://picsum.photos/id/50/600"
    }
]
//Variables
const listaProductos = document.querySelector("#lista-productos");
const listaCarrito = document.querySelector("#body-carrito");
const ftcarrito = document.querySelector("#footer-carrito");
const templateProducto = document.querySelector("#template-producto").content;
const templateProductoCarrito = document.querySelector("#template-producto-carrito").content;
const templteFooterCarrito= document.querySelector("#template-footer-carrito").content;

let carrito={};

function mostrarProductos(){
    const fragmento = document.createDocumentFragment();
    productos.forEach(producto=>{
        const img = templateProducto.querySelector("img");
        img.setAttribute("src",producto.thumbnailUrl);
        const h5 = templateProducto.querySelector("h5");
        h5.textContent=producto.title;
        const p = templateProducto.querySelector("p");
        p.textContent=producto.precio;
        const boton = templateProducto.querySelector(".btn-dark");
        boton.dataset.id = producto.id;

        const clone = templateProducto.cloneNode(true);
        fragmento.appendChild(clone);
    })
    listaProductos.appendChild(fragmento);
}
mostrarProductos()

listaProductos.addEventListener("click",e=>{
    e.preventDefault();
    añadirCarrito(e);
});

listaCarrito.addEventListener("click",e=>{
    e.preventDefault();
    acciones(e);
});

const añadirCarrito=e=>{
    console.log(e.target);
    if(e.target.classList.contains("btn-dark")){
        console.log(e.target.parentElement);
        setCarrito(e.target.parentElement);
    }
}


const setCarrito =objecto =>{
    console.log(objecto);
    const producto={
        id:objecto.querySelector(".btn-dark").dataset.id,
        title:objecto.querySelector("h5").textContent,
        precio:objecto.querySelector("p").textContent,
        cantidad:1
    }
    console.log(producto);

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad=carrito[producto.id].cantidad+1;
    }
    carrito[producto.id]={...producto};
    console.log(producto);
    pintarCarrito();
}


const pintarCarrito=()=>{
    
    listaCarrito.innerHTML="";
    console.log(carrito);
    const fragmento = document.createDocumentFragment();
    Object.values(carrito).forEach((producto,indice)=>{
        console.log(producto.id)
        templateProductoCarrito.querySelectorAll("td")[0].textContent=indice+1;
        templateProductoCarrito.querySelectorAll("td")[1].textContent=producto.title;
        templateProductoCarrito.querySelectorAll("td")[2].textContent=producto.cantidad;
        templateProductoCarrito.querySelector(".btn-info").dataset.id=producto.id;
        templateProductoCarrito.querySelector(".btn-danger").dataset.id=producto.id;
        templateProductoCarrito.querySelector("span").textContent=producto.cantidad*producto.precio+" €";

        const clone = templateProductoCarrito.cloneNode(true);
        fragmento.appendChild(clone);
    });
    listaCarrito.appendChild(fragmento);
    pintarFooter();

}

const pintarFooter=()=>{
    ftcarrito.innerHTML=""
    if(Object.keys(carrito).length==0){
        ftcarrito.innerHTML=` <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
    }else{
        const fragmento = document.createDocumentFragment();
        const sumaCantidad = Object.values(carrito).reduce((acc,{cantidad})=>acc+cantidad,0);
        const sumaTotal = Object.values(carrito).reduce((acc,{cantidad,precio})=>acc+cantidad*precio,0);

        templteFooterCarrito.querySelectorAll("td")[0].textContent=sumaCantidad;
        templteFooterCarrito.querySelectorAll("td")[2].textContent=sumaTotal+" €";

        const clone = templteFooterCarrito.cloneNode(true);
        fragmento.appendChild(clone);
        ftcarrito.appendChild(fragmento);

        const btnVaciar =  document.getElementById("vaciar-carrito");
        btnVaciar.addEventListener("click",e=>{
            e.preventDefault();
            carrito={}
            pintarCarrito();
        })
    }
    

}

const acciones=e=>{
    console.log(e.target);
    if(e.target.classList.contains("btn-info")){
        const producto = carrito[e.target.dataset.id];
        console.log(producto);
        producto.cantidad++

        carrito[e.target.dataset.id]= {...producto};
        pintarCarrito()
    }

    if(e.target.classList.contains("btn-danger")){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad--;
        if(producto.cantidad==0){
            delete carrito[e.target.dataset.id];
        }
        pintarCarrito();
    }
}


/*
const listaProductos = document.querySelector("#lista-productos");
const listaCarrito = document.querySelector("#body-carrito"); //items
const totalCarrito = document.querySelector("#footer-carrito");
const tFooterCarrito=document.querySelector("#template-footer-carrito").content;
const templeCarrito = document.querySelector("#template-producto-carrito").content

function mostrarProductos(){
    const fragmento = document.createDocumentFragment();
    let tproducto= document.querySelector("#template-producto").content;
    productos.forEach(producto=>{
        const productoCard = tproducto.cloneNode(true);
        const img = productoCard.querySelector("img");
        img.setAttribute("src",producto.thumbnailUrl);
        const h5 = productoCard.querySelector("h5");
        h5.textContent=producto.title;
        const p = productoCard.querySelector("p");
        p.innerHTML = producto.precio;
        const boton = productoCard.querySelector(".btn-dark");
        boton.dataset.id=producto.id; //Añadimos un data-id a cada boton
        fragmento.appendChild(productoCard);
    });
    listaProductos.appendChild(fragmento);
}

mostrarProductos();

//Creamos el objeto vacio
let carrito ={};


listaProductos.addEventListener("click",e=>{
    e.preventDefault();
    añadirCarrito(e);
});

listaCarrito.addEventListener("click",e=>{
    e.preventDefault();
    btnAccion(e);
});

const añadirCarrito=e=>{
    console.log(e.target); // si pinchamos en el h5 nos muestra el h5 y asi co todos
    console.log(e.target.classList.contains('btn-dark')); // esto devuelve un true si le damos al boton comprar y false a las otras etiquetas
    if(e.target.classList.contains('btn-dark')){
        e.target.parentElement; //devuelve el card-body
        console.log( e.target.parentElement)// los muestra todo el card-body (h5,p y el boton);
        setcarrito(e.target.parentElement);//mandamos todo a setCarrito
    }
}

//Capturamos los elementos
const setcarrito = objeto=>{
    console.log(objeto);//todo el card-body
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id ,//viene del boton que es el data-id
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad:1 //parte de uno
    }

    //para si volvemos a comprar el mismo producto que solo aumente la cantidad
    //si el producto ya existe entonces tenemos que aumentar la cantdad
    //hasOwnProperty() devuelve un booleano indicando si el objeto tiene la propiedad especificada.
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad=carrito[producto.id].cantidad+1; //Accedemos a la cantidad y le sumamos 1
    }
    
    carrito[producto.id]={...producto}//copiamos el prroducto y se añade
    
    console.log(producto)//nos muetra el producto completo de cada compra
    pintarCarrito();
}

//pinatmos los productos
const pintarCarrito=()=>{
    listaCarrito.innerHTML="";
    console.log(carrito);
    const fragmento = document.createDocumentFragment();
    Object.values(carrito).forEach((producto,indice)=>{
        console.log(producto.id)
        templeCarrito.querySelectorAll('td')[0].textContent=indice+1;
        templeCarrito.querySelectorAll('td')[1].textContent=producto.title;
        templeCarrito.querySelectorAll('td')[2].textContent=producto.cantidad;
        templeCarrito.querySelector('.btn-info').dataset.id=producto.id;
        templeCarrito.querySelector('.btn-danger').dataset.id=producto.id;
        console.log(producto.cantidad);
        console.log(producto.precio);
        templeCarrito.querySelector('span').textContent=producto.cantidad*producto.precio+" €";
        const clone = templeCarrito.cloneNode(true);
        fragmento.appendChild(clone);
    });
    listaCarrito.appendChild(fragmento);

    pintarFooter()
}

//pintamos el footer
const pintarFooter=()=>{
    totalCarrito.innerHTML="";
    //si esta vacio
    if(Object.keys(carrito).length==0){
        totalCarrito.innerHTML=`<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`;
    }else{
        const fragmento = document.createDocumentFragment();
        //vamos a acumular la cantidad para despues sumarla
        //ponemos un ,0 para que devuelva un numero
        const sumaCantidad = Object.values(carrito).reduce((acc,{cantidad})=> acc+cantidad,0);
        console.log(sumaCantidad);
        const nprecio = Object.values(carrito).reduce((acc,{cantidad, precio})=>acc+cantidad*precio,0);
        console.log(nprecio);
        tFooterCarrito.querySelectorAll('td')[0].textContent=sumaCantidad;
        tFooterCarrito.querySelector('span').textContent=nprecio;

        const clone = tFooterCarrito.cloneNode(true);
        fragmento.appendChild(clone);
        totalCarrito.appendChild(fragmento);

        const btnVaciar = document.getElementById("vaciar-carrito");
        btnVaciar.addEventListener("click",e=>{
            e.preventDefault()
            carrito={};
            pintarCarrito();
        })

    }
}

//Boton del ms y menos 
const btnAccion=e=>{
    console.log(e.target);
    //aCCedemos a nuestra coleccion de objetos
    //Accion de aumentar
    if(e.target.classList.contains("btn-info")){
        //pillamos el objeto
        console.log(carrito[e.target.dataset.id]);
        //Accedemos al objeto seleccionado
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++
        //Hacemos una copia y lo añadimos 
        carrito[e.target.dataset.id]= {...producto};

        pintarCarrito()
    }

    if(e.target.classList.contains("btn-danger")){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad--
        //Eliminamos el objeto con este indice cuando la cantidad es 0 
        if(producto.cantidad==0){
            delete carrito[e.target.dataset.id]; //lo eliminamos
        } 
       pintarCarrito()
    }
    //Par que actulize
   
}
*/










/*
listaProductos.addEventListener("click",e=>{
    e.preventDefault();
    console.log("a");
    if(e.target.classList.contains("btn-dark")){
        let comprobar = Object.keys(carrito).find(p=>p==e.target.dataset.id);
        if(comprobar){
            carrito[comprobar].cantidad++;
        }else{
            comprobado={
                id:e.target.dataset.id,
                cantidad:1 //parte de uno
            }
            carrito[comprobado.id]*comprobado;
        }
    }
});

function mostrarCarrito(){
    listaProductos.innerHTML="";
    const templateProductoCarrito= document.querySelector("#template-producto-carrito").content;
    const fragmento = document.createDocumentFragment();
    Object.keys(carrito).forEach((id,indice)=>{
        let productoCarrito=templateProductoCarrito.cloneNode(true);
        const tds = productoCarrito.querySelector("td");
        tds[0].textContent=indice+1;
        tds[1].textContent=productos[id].title;
        tds[2].textContent=carrito[id].cantidad;
        tds[3].textContent=carrito[id].cantidad*productos[id].precio+" €";
        fragmento.appendChild(productoCarrito);
    });
    listaCarrito.appendChild(fragmento);
}

*/
/*
let productosCarrito={}

const fragmento=document.createDocumentFragment()
const tproducto=document.querySelector("#template-producto").content
//Añadimmos los productos al html
productos.forEach(el=>{
    //Clonamos el template 
    producto=tproducto.cloneNode(true)
    //Y rellenamos 
    const img = producto.querySelector("img");
    img.setAttribute("src",el.thumbnailUrl);
    const h5 = producto.querySelector("h5");
    h5.textContent=el.title;
    const p = producto.querySelector("p");
    p.innerHTML= el.precio+" €";
    
    /* Tambien se puede hacer así
    img=producto.querySelector("img")
    nombre=producto.querySelector(".card-title")
    precio=producto.querySelector(".card-text")
    comprar=producto.querySelector("a")
    comprar.dataset.id=el.id
    img.src=el.thumbnailUrl
    nombre.textContent=el.title
    precio.innerHTML=`${el.precio} &euro;`;*/
/*
    fragmento.appendChild(producto)
})

listaProductos.appendChild(fragmento)

*/