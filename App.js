document.addEventListener('DOMContentLoaded', function () {
    const carrito = [];
    const guitarrasLista = document.getElementById('guitarras-lista');
    const carritoLista = document.getElementById('carrito-lista');
    const carritoTotal = document.getElementById('carrito-total');
    const carritoBtn = document.getElementById('carrito-btn');
    const carritoDiv = document.getElementById('carrito');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito-btn');
    const cantidadCarritoSpan = document.getElementById('cantidad-carrito');
  
    function mostrarGuitarras(guitarras) {
      guitarrasLista.innerHTML = "";
      guitarras.forEach(guitarra => {
        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Agregar al Carrito';
        botonAgregar.addEventListener('click', () => agregarAlCarrito(guitarra));
  
        const divGuitarra = document.createElement('div');
        divGuitarra.classList.add('guitarra');
  
        const imagenGuitarra = document.createElement('img');
        imagenGuitarra.src = guitarra.imagen;
        divGuitarra.appendChild(imagenGuitarra);
  
        divGuitarra.innerHTML += `<p>${guitarra.marca} ${guitarra.modelo} - $${guitarra.precio}</p>`;
        divGuitarra.appendChild(botonAgregar);
  
        guitarrasLista.appendChild(divGuitarra);
      });
    }
  

    function cargarGuitarrasDesdeJSON() {
      return fetch('guitarras.json')
        .then(response => response.json())
        .catch(error => console.error('Error al cargar datos desde JSON:', error));
    }
  
    function agregarAlCarrito(guitarra) {
      carrito.push(guitarra);
      actualizarCarrito();
    }
  
    function actualizarCarrito() {
      carritoLista.innerHTML = "";
      let total = 0;
      carrito.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.marca} ${item.modelo} - $${item.precio}`;
  
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(index));
  
        listItem.appendChild(botonEliminar);
        carritoLista.appendChild(listItem);
        total += item.precio;
      });
      carritoTotal.textContent = total;
      cantidadCarritoSpan.textContent = carrito.length;
      guardarEnLocalStorage();
    }
  
    function eliminarDelCarrito(index) {
      const productoEliminado = carrito.splice(index, 1)[0];
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: `Has eliminado ${productoEliminado.marca} ${productoEliminado.modelo} del carrito.`,
      });
      actualizarCarrito();
    }
  
    function guardarEnLocalStorage() {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    cargarGuitarrasDesdeJSON().then(guitarras => mostrarGuitarras(guitarras));
   
    carritoBtn.addEventListener('click', () => {
      carritoDiv.classList.toggle('oculto');
    });
  
    cerrarCarritoBtn.addEventListener('click', () => {
      carritoDiv.classList.add('oculto');
    });
  });
  