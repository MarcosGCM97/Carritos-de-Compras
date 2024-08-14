const carrito = document.getElementById('carrito');//1
const template = document.getElementById('template');
const fragment = document.createDocumentFragment();
const btnesBotones = document.querySelectorAll('.card .btn');

/*Probando://2
console.log(carrito);
console.log(template);
console.log(fragment);
console.log(btnesBotones);*/

//3creo funciones
const carritoObjeto = {};//creo las funciones-a

const agregarAlCarrito = (e) => {
    /* console.log(e.target);//pruebo que lo marque en consola
     console.log(e.target.dataset);//pruebo que lo marque accediendo a la clase data set cada identificador que le hemos dado*/
    console.log(e.target.dataset.fruta);//pruebo que lo marque accediendo a la clase dataset (para acceder)identificando cada uno con la palabra de acuerdo al elemento a seleccionar//4
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1
    }//creo el objeto//5 aquí se incrementa

    if (carritoObjeto.hasOwnProperty(producto.titulo)) {
        producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1;
    }//16 valido si existe el producto entonces incremento
    //llevar esa info al carrito
    carritoObjeto[producto.titulo] = producto;//6
    //console.log(carritoObjeto);//7 compruebo todo va al carritoObjeto -a

    seleccionCarrito();//9 envio el que selecciono funcion d
}; //funcion - b

//funcion d://8
const seleccionCarrito = () => {

    carrito.textContent = "";//16 inicializa var obj

    //console.log('seleccionar carrito', producto);//tengo que pasar por parámetro si quiero que lo muestre x consola en la funcion flecha de seleccionCarrito//8
    //10carrito objeto lo transformo en un  array para recorrer:
    Object.values(carritoObjeto).forEach((item) => {
        const clone = template.content.firstElementChild.cloneNode(true);//11
        clone.querySelector('.lead').textContent = item.titulo//12
        clone.querySelector('.badge').textContent = item.cantidad//13

        fragment.appendChild(clone)//14 para evitar el reflow
    })
    carrito.appendChild(fragment);//15 agrego al carrito la información que se va cargando
}

