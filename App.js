const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById('template-footer').content
const fragment = document.createDocumentFragment()
let carrito = {} 

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        crearCarrito()
    }
})
cards.addEventListener('click', e => {
    agregarCarrito(e)
})

items.addEventListener('click', e =>{
    btnAccion(e)
})

const fetchData = async () =>{
    try {
        const res = await fetch('http://localhost:3001/productos')
        const data = await res.json()
        crearCard(data)
    } catch (error) {
        console.log(error)
    }
}

const crearCard =(data)=>{
    data.forEach(prod => {
        templateCard.querySelector('h5').textContent = prod.nombre
        templateCard.querySelector('p').textContent = prod.precio
        templateCard.querySelector('button').dataset.id = prod.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const agregarCarrito =(e)=>{
 if(e.target.classList.contains('btn-dark')){
    enviatCarrito(e.target.parentElement)
 }
 e.stopPropagation()
}

const enviatCarrito = objeto =>{
    const producto = {
        id: objeto.querySelector('button').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    crearCarrito()
}

const crearCarrito =()=>{
    items.innerHTML = ''
    Object.values(carrito).forEach(prod => {
        templateCarrito.querySelector('th').textContent = prod.id
        templateCarrito.querySelectorAll('td')[0].textContent = prod.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = prod.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = prod.id
        templateCarrito.querySelector('.btn-danger').dataset.id = prod.id
        templateCarrito.querySelector('span').textContent = prod.precio * prod.cantidad

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    crearFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const crearFooter =()=>{
    footer.innerHTML = ''

    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
            <th scope="row" colspan="5">Carrito Vacio - agrega productos!!</th>
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acum, { cantidad })=> acum + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acum, {cantidad, precio}) => acum + precio * cantidad, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        crearCarrito()
    })
    console.log(nPrecio)
}

const btnAccion =(e)=>{
    if(e.target.classList.contains('btn-info')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1 
        carrito[e.target.dataset.id] = {...producto}

        crearCarrito()
    }
    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad - 1 

        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }

        crearCarrito()
    }

    e.stopPropagation()
}