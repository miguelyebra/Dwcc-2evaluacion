// Datos del Personal
const personales = [
  {
    id: 1,
    nombre: "Ana Lopez",
    trabajo: "Desarrolladora Web",
    foto:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    text:
      "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    id: 2,
    nombre: "Rosa Martinez",
    trabajo: "Desarrolladora Web",
    foto:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
    text:
      "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
  },
  {
    id: 3,
    nombre: "Pedro Rodriguez",
    trabajo: "Becario",
    foto:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    text:
      "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
  },
  {
    id: 4,
    nombre: "Julian Leiros",
    trabajo: "El Jefe",
    foto:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
    text:
      "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ",
  },
];


const empleado = document.querySelector(".empleado");
const btn_container = document.querySelector(".button-container");

empleado.addEventListener("click",e=>{
  e.preventDefault();
  const next_btn = btn_container.querySelector(".fa-chevron-right");
  const prev_btn = btn_container.querySelector(".fa-chevron-left");
  
  if(e.target == next_btn){
    console.log("a")
    const fragmento = document.createDocumentFragment();
    personales.forEach(personal=>{
      let templateEmpleo = empleado.cloneNode(true);
      templateEmpleo.querySelector("img").setAttribute("src",personal.foto);
      templateEmpleo.querySelector("h4").textContent=personal.nombre;
      templateEmpleo.querySelectorAll("p")[0].textContent=personal.trabajo;
      templateEmpleo.querySelectorAll("p")[1].textContent=personal.text;
      templateEmpleo.querySelector(".next-btn").dataset.id=personal.id;
      templateEmpleo.querySelector(".prev-btn").dataset.id=personal.id;
      fragmento.appendChild(templateEmpleo);
    })
    empleado.appendChild(fragmento);
  }else if(e.target == prev_btn){
    console.log("prev");
    const fragmento = document.createDocumentFragment();
    personales.forEach(personal=>{
      let templateEmpleo = empleado.cloneNode(true);
      templateEmpleo.querySelector("img").setAttribute("src",personal.foto);
      templateEmpleo.querySelector("h4").textContent=personal.nombre;
      templateEmpleo.querySelectorAll("p")[0].textContent=personal.trabajo;
      templateEmpleo.querySelectorAll("p")[1].textContent=personal.text;
      templateEmpleo.querySelector(".next-btn").dataset.id=personal.id;
      templateEmpleo.querySelector(".prev-btn").dataset.id=personal.id;
      fragmento.appendChild(templateEmpleo);
    })
    empleado.appendChild(fragmento);
  }
});
