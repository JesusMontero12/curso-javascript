//importamos funcion de la burbuja de notificaciones de la bolsa
import { burbujaBag } from "./burujaNotificaciones.js";
const urlJSON = "../../data/data.json";

//Mostramos los prodcutos mas vendidos
export function loMasVendido() {
  const aggProductos = document.getElementById("productos");
  //solicitud para obtener json
  fetch(urlJSON)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((producto) => {
    //validamos si el producto tiene mas de 60 ventas concretadas
      const masVendidos = producto.cntVendido >= 60;

      if (masVendidos) {
        // Crear elementos HTML para el producto
        const btnAdd = crearBtnAgregar();
        const sale = producto.sale ? crearElementoSale() : '';
        const elementoDescuento = producto.desc > 0 ? `<span>-${producto.desc}%</span>` : '';
        const descuento = producto.precio.toFixed(3) - (producto.precio.toFixed(3) / 100) * producto.desc;
        const precioDesc = producto.desc > 0 ? `<p>${descuento.toFixed(3)}</p>` : `<p>${producto.precio.toFixed(3)}</p>`;
        const precio = producto.desc > 0 ? `<p>${producto.precio.toFixed(3)}</p>` : `<br>`;
  
        let div = crearElementoProducto(producto, sale, precioDesc, precio, elementoDescuento, btnAdd);
        aggProductos.appendChild(div);
        
        //evento click para agregar un productos al carrito
        btnAdd.addEventListener("click", function (evt) {
          evt.preventDefault();
          const idProduc = producto.id;
          const producBag = JSON.parse(localStorage.getItem("productos")) || [];
          const producAggdo = producBag.find((producto) => producto.id === idProduc);
          let cantidaAggBag = 1;
          
          //ventana modal para mostrar mensajes
          function modal(titulo, text) {
            Swal.fire({
              title: titulo,
              text: text,
              icon: "success",
            });
  
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: titulo,
              text: text,
              showConfirmButton: false,
              timer: 2000
            });
          }

          //validamos que el producto este en el carrito y agregue cantidad, si no agrega el producto
          if (producAggdo) {
            producAggdo.cantAgg += 1;
            cantidaAggBag += parseInt(Number(producAggdo.cantAgg));
            modal("¡Excelente!", "se sumó otra cantidad al producto.");
          } else {
            producBag.push({
              id: idProduc,
              nombre: producto.nombre,
              precio: producto.precio.toFixed(3),
              imagen: producto.imagen.map(imagen => `.${imagen}`),
              sale: producto.sale,
              descuento: producto.desc,
              stock: producto.stock,
              cantAgg: cantidaAggBag,
              descripcion: producto.descripcion,
            });
            modal("¡Excelente!", "El producto se agregó a la bolsa exitosamente.");
          }
          localStorage.setItem("productos", JSON.stringify(producBag));
          console.log(producBag);
          burbujaBag();
        });
      }
    });
  });

  //crear botón agregar 
  function crearBtnAgregar() {
    const btnAdd = document.createElement("a");
    btnAdd.innerText = "Agregar";
    btnAdd.className = "btnAdd";
    return btnAdd;
  }

  //crear elemento sale 
  function crearElementoSale() {
    return `<span class="sale"><p>Sale</p><img src="./assets/icons/fire.png"></span>`;
  }

  //crear productos de manera dinamica
  function crearElementoProducto(producto, sale, precioDesc, precio, elementoDescuento, btnAdd) {
    const div = document.createElement("a");
    div.href = `./pages/detalle_producto.html?producto=${producto.id}`;
    div.innerHTML = `
      ${sale}            
      <div class="cuerpo">
          <img src="${producto.imagen[0]}" alt="${producto.nombre}">
      </div>
      <div class="titulo">
          <h3>${producto.nombre}</h3>
      </div>
      <div class="precio_descuento">
          ${precioDesc}
          ${elementoDescuento}
      </div>
      <div class="precio">
          ${precio}
      </div>`;
    div.appendChild(btnAdd);

    return div;
  }
}

//Trae todos los elementos para la tienda
export function todoslosproductos() {
  const aggProductos = document.getElementById("productos");
  const parametro = new URLSearchParams(window.location.search);
  const categoria = parametro.get('categoria');
  let i = 0;

  if (categoria == null) {
    fetch(urlJSON)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((producto) => {
        // Crear elementos HTML para el producto
        const sale = producto.sale ? crearElementoSale() : '';
        const elementoDescuento = producto.desc > 0 ? `<span>-${producto.desc}%</span>` : '';
        const descuento = producto.precio.toFixed(3) - (producto.precio.toFixed(3) / 100) * producto.desc;
        const precioDesc = producto.desc > 0 ? `<p>${descuento.toFixed(3)}</p>` : `<p>${producto.precio.toFixed(3)}</p>`;
        const precio = producto.desc > 0 ? `<p>${producto.precio.toFixed(3)}</p>` : `<br>`;

        const div = crearElementoProductos(producto, sale, precioDesc, precio, elementoDescuento);
        aggProductos.appendChild(div);

        // Elementos para el carrusel
        const btnAnterior = document.getElementById(`anterior_${producto.id}`);
        const btnSiguiente = document.getElementById(`siguiente_${producto.id}`);
        

        cambiarImagen(btnSiguiente, btnAnterior, producto.imagen, i, producto.id);
      });
    });
  } else {
    const productoFiltradoHeader = (categoria) => {      
      //solicitud para obtener json
      fetch(urlJSON)
        .then(response => response.json())
        .then(data => {
          // filtrado de productos por categorias (menu de filtros del header)
          const productosFiltrados = data.filter(producto => 
            producto.categoria.toLowerCase().replace(/\s/g, '') === categoria.toLowerCase().replace(/\s/g, '')
          );
          //validacion de producto filtrado
          if (productosFiltrados.length > 0) {
            //recorremos todos los productos filtrados
            productosFiltrados.forEach((productoCat) => {
              //varialbles y funciones para agregar productos de manera dinamica
              const sale = productoCat.sale ? crearElementoSale() : '';
              const elementoDescuento = productoCat.desc > 0 ? `<span>-${productoCat.desc}%</span>` : '';
              const descuento = productoCat.precio.toFixed(3) - (productoCat.precio.toFixed(3) / 100) * productoCat.desc;
              const precioDesc = productoCat.desc > 0 ? `<p>${descuento.toFixed(3)}</p>` : `<p>${productoCat.precio.toFixed(3)}</p>`;
              const precio = productoCat.desc > 0 ? `<p>${productoCat.precio.toFixed(3)}</p>` : `<br>`;
    
              const div = crearElementoProductos(productoCat, sale, precioDesc, precio, elementoDescuento);
              aggProductos.appendChild(div);
              console.log(div);
    
              // Elementos para el carrusel
              const btnAnterior = document.getElementById(`anterior_${productoCat.id}`);
              const btnSiguiente = document.getElementById(`siguiente_${productoCat.id}`);
              console.log(btnAnterior);
              console.log(btnSiguiente);
              let i = 0;
    
              cambiarImagen(btnSiguiente, btnAnterior, productoCat.imagen, i, productoCat.id);
            });        
          } else {
            contenedorResult.innerHTML = '<p>No se encontraron productos para esta categoría</p>';
          }

        });
    };      
    productoFiltradoHeader(categoria);
  }  
  //funcion para cambiar img. evento click 
  function cambiarImagen(btnSiguiente, btnAnterior, imagenes, i, productId) {
    //botón para cambiar hacia la derecha (evento Click)
    btnSiguiente.addEventListener('click', (e) => {
      e.preventDefault();
        i = (i + 1) % imagenes.length;
        actualizarImagen(productId);
    });
    //botón para cambiar hacia la izquierda (evento Click)
    btnAnterior.addEventListener('click', (e) => {
      e.preventDefault();
        i = (i - 1 + imagenes.length) % imagenes.length;
        actualizarImagen(productId);
    });

    //funcion para mostrar la imagen actual
    function actualizarImagen(productId) {
        const imagenCarrusel = document.getElementById(`img_${productId}`);
        imagenCarrusel.src = `../${imagenes[i]}`;
    }
  }
  
  //crear elemento sale html
  function crearElementoSale() {
    return `<span class="sale"><p>Sale</p><img src="../assets/icons/fire.png"></span>`;
  }

  //crear cards de productos de manera dinamica
  function crearElementoProductos(producto, sale, precioDesc, precio, elementoDescuento) {
    const div = document.createElement("a");
    div.href = `./detalle_producto.html?producto=${producto.id}`;
    div.innerHTML = `
      ${sale}            
      <div class="cuerpo">
        <div class="btnsCambiar">
          <label id="anterior_${producto.id}" class="FlechaImgizquierda">&#8249;</label>
          <label id="siguiente_${producto.id}" class="FlechaImgDerecha">&#8250;</label>
        </div>
        <img class="imgProducto" id="img_${producto.id}" src=".${producto.imagen[0]}" alt="${producto.nombre}">
      </div>
      <div class="content_text">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
      </div>
      <div class="precio_descuento">
          ${precioDesc}
          ${elementoDescuento}
      </div>
      <div class="precio">
          ${precio}
      </div>
      
      `;

    return div;
  }
}
  
//trae todos los productos guardados en el localStorage para el carrito
export function mostrarProductosBag() {
  const productosGuardados = localStorage.getItem("productos");
  const productos = JSON.parse(productosGuardados) || [];
  const listProductos = document.getElementById("productos");
  const detalle = document.getElementById("content_productos");

  //validamos si hay algun producto en el localStorage
  if (productos.length == 0) {
    listProductos.innerHTML = `<p>No tienes ningun producto agregado a la bolsa.<p>`;
  } else {      
    //recorremos todos los productos del localStorage
    productos.forEach((producto) => {
      //variables y funciones para mostrar los productos de manera dinamica
      const sale = producto.sale ? crearElementoSale() : '';
      const elementoDescuento = crearElementoDescuento(producto.descuento);
      const precioDesc = calcularPrecioDescuento(producto.precio, producto.descuento);
      const totalProdCant = calcularTotalProductoCantidad(producto.cantAgg, precioDesc);
      const div = crearElementoProductos(producto, sale, elementoDescuento, precioDesc, totalProdCant);
      listProductos.appendChild(div);        

      EventoCambiarCantidad(detalle, div, precioDesc, producto.id);
      eliminarProductoBag(div, producto.id, producto.imagen);        
    });

    const total = crearDetalleTotal(productos.length);
    detalle.appendChild(total);
    subTotal(productos);
  }    
  
  //crear elemento sale html
  function crearElementoSale() {
      return `<span class="sale"><p>Sale</p><img src="../assets/icons/fire.png"></span>`;
  }
  
  //crea elemento descuento
  function crearElementoDescuento(descuento) {
      return descuento > 0 ? `<span>-${descuento}%</span>` : '';
  }
  
  //funcion calcula el descuento si el producto lo tiene
  function calcularPrecioDescuento(precio, descuento) {
      return descuento > 0 ? precio - (precio / 100 * descuento) : precio;
  }
  
  //crear calcula el tota
  function calcularTotalProductoCantidad(cantAgg, precioDesc) {
      return `<p id="precioCantidad">$ ${Number(cantAgg * precioDesc).toFixed(3)}</p>`;
  }

  //crear cards de productos de manera dinamica
  function crearElementoProductos(producto, sale, elementoDescuento, precioDesc, totalProdCant) {
      const div = document.createElement("div");
      div.className = "grid";
      div.innerHTML = `
          ${sale}
          <div class="cuerpo">
            <img src="${producto.imagen[0]}" alt="${producto.nombre}">
          </div>
          <div class="content_info">
              <div class="titulo">
                  <h3>${producto.nombre} ${elementoDescuento}</h3>
                  <p>${producto.descripcion}</p>
              </div>
              <div class="precio_descuento">
                  ${totalProdCant}
                  ${producto.descuento > 0 ? `<p>$ ${producto.precio}</p>` : `<br>`}
              </div>
              <div class="cantidad">
                  <button class="decrement">-</button>
                  <input type="number" class="cantidad-input" min="1" max="5" step="1" value="${producto.cantAgg}">
                  <button class="increment">+</button>
              </div>
          </div>
          <div class="actionProduct">
              <img src="../assets/icons/delete.png" class="btnEliminar" alt="Eliminar producto">
          </div>`;
          
      return div;
  }
  
  //funcion evento cambiar cantidad
  function EventoCambiarCantidad(detalle, container, precioDesc, id) {
      const increment = container.querySelector(".increment");
      const decrement = container.querySelector(".decrement");
  
      increment.addEventListener("click", () => subirCantidad(container, precioDesc, id));
      decrement.addEventListener("click", () => bajarCantidad(container, precioDesc, id));
  }

  //funcion operacion subir cantidad
  function subirCantidad(container, precioDesc, id) {
      const input = container.querySelector('.cantidad-input');
      const precioCantidad = container.querySelector("#precioCantidad");
  
      input.stepUp();
      actualizarTotal(input, precioCantidad, precioDesc, id);
  }

  //funcion operacion bajar cantidad
  function bajarCantidad(container, precioDesc, id) {
      const input = container.querySelector('.cantidad-input');
      const precioCantidad = container.querySelector("#precioCantidad");
  
      input.stepDown();
      actualizarTotal(input, precioCantidad, precioDesc, id);
  }
  
  //actualiza el total segun la cantidad seleccionada
  function actualizarTotal(input, precioCantidad, precioDesc, id) {
      precioCantidad.innerText = `$ ${Number(input.value * precioDesc).toFixed(3)}`;
      const productos = JSON.parse(localStorage.getItem('productos')) || [];
      const productoIdActualizarCantidad = productos.find(producto => producto.id === id);

      if (productoIdActualizarCantidad) {
        productoIdActualizarCantidad.cantAgg = input.value;
      }
      localStorage.setItem('productos', JSON.stringify(productos));
      subTotal(productos);
  }

  //funcion suma todos los precios de los productos 
  function subTotal(productos){
    let subTotal = Number(0);
    const elementoSubTotal = document.getElementById('subtotal');    
    const spanSubTotal = document.createElement('span');
    const numeroSpans = elementoSubTotal.getElementsByTagName('span');

    productos.forEach((producto) => {
      const precioDesc = calcularPrecioDescuento(producto.precio, producto.descuento);
      let preciosTodosProductos = Number((producto.cantAgg * precioDesc).toFixed(3));
      subTotal += preciosTodosProductos;
    });   
    for (let i = numeroSpans.length - 1; i >= 0; i--) {
      elementoSubTotal.removeChild(numeroSpans[i]);
    }
    spanSubTotal.innerText = `$ ${subTotal.toFixed(3)}`;
    elementoSubTotal.appendChild(spanSubTotal);  
    iva(subTotal);
  }

  //calcula el iva del totl de la compra
  function iva(subTotal) {
    let IvaPorcentaje = Number(0.19);
    let iva = IvaPorcentaje * subTotal;
    const elementoIva = document.getElementById('iva');    
    const spanIva = document.createElement('span');
    const numeroSpans = elementoIva.getElementsByTagName('span');
     
    for (let i = numeroSpans.length - 1; i >= 0; i--) {
      elementoIva.removeChild(numeroSpans[i]);
    }
    spanIva.innerText = `$ ${iva.toFixed(3)}`;
    elementoIva.appendChild(spanIva);  
    totalPagar(iva, subTotal);
  }

  //calcula el monto total a pagar
  function totalPagar(iva, subTotal) {
    const total = iva + subTotal;
    const elementoTotal = document.getElementById('total');    
    const spanTotal = document.createElement('span');
    const numeroSpans = elementoTotal.getElementsByTagName('span');

    for (let i = numeroSpans.length - 1; i >= 0; i--) {
      elementoTotal.removeChild(numeroSpans[i]);
    }
    spanTotal.innerText = `$ ${total.toFixed(3)}`;
    elementoTotal.appendChild(spanTotal);  
  }
  
  //funcion agrega elemento de manera diamica para el total de productos
  function crearDetalleTotal(CantidadProductos) {
      const total = document.createElement("div");
      total.className = "total";
      total.innerHTML = `    
          <div class="headerDetalle">
            <h4>Detalle de la compra</h4>
            <label>Tienes ${CantidadProductos} productos agregados a la bolsa</label>
          </diV>
          <div class="detalle">
            <h5 id="subtotal">Sub-total: </h5>
            <h6 id="iva">IVA (19%): </h6>
            <p id="total">Total: <span></span></p>
            <button id="abrirModal">Ir a pagar</button>
          </div>
      `;
      return total;
  } 

  //elimina los productos segun el id
  function eliminarProductoBag(btn, id, imagen){
    const btnEliminar = btn.querySelector('.btnEliminar');   
    btnEliminar.addEventListener("click", () => {
      function modal(titulo, text, imageUrl) {
        Swal.fire({
          title: titulo,
          text: text,
          imageUrl: imageUrl,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Custom image",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true
        }).then((resultado) => {
          if (resultado.isConfirmed) {
            const productosGuardados = localStorage.getItem("productos");
            const productos = JSON.parse(productosGuardados) || [];
            const productoEliminar = productos.filter((producto)=> producto.id !== id);
            localStorage.setItem("productos", JSON.stringify(productoEliminar));
            
            Swal.fire({
              title: "Eliminado!",
              text: "Tu producto ha sido eliminado de la bolsa.",
              icon: "success"
            }).then((btnClick) => {
              if (btnClick.isConfirmed) {
                location.reload();
              }
            });            
          } else if (resultado.dismiss === Swal.DismissReason.cancel) {
            swal.fire({
              title: "Cancelado",
              text: "Tu producto seguirá en la bolsa",
              icon: "error"
            });
          }
        });
      }      
      modal("¿Está seguro?", "¡Se eliminará el producto de la bolsa de compras!", imagen);
    });
  }
}