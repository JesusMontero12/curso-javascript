//importamos objeto que tenemos como base de datos
import { db_productos } from "./productos.js";
//importamos funcion de la burbuja de notificaciones de la bolsa
import { burbujaBag } from "./burujaNotificaciones.js";

//Mostramos los prodcutos mas vendidos
export function loMasVendido() {
  const aggProductos = document.getElementById("productos");

db_productos.forEach((producto) => {
  const masVendidos = producto.cntVendido >= 60;

  if (masVendidos) {
    const btnAdd = createAddButton();
    const sale = producto.sale ? createSaleElement() : '';
    const elementoDescuento = producto.desc > 0 ? `<span>-${producto.desc}%</span>` : '';
    const descuento = producto.precio.toFixed(3) - (producto.precio.toFixed(3) / 100) * producto.desc;
    const precioDesc = producto.desc > 0 ? `<p>${descuento.toFixed(3)}</p>` : `<p>${producto.precio.toFixed(3)}</p>`;
    const precio = producto.desc > 0 ? `<p>${producto.precio.toFixed(3)}</p>` : `<br>`;

    let div = createProductElement(producto, sale, precioDesc, precio, elementoDescuento, btnAdd);
    aggProductos.appendChild(div);

    btnAdd.addEventListener("click", function (evt) {
      evt.preventDefault();
      const idProduc = producto.id;
      const producBag = JSON.parse(localStorage.getItem("productos")) || [];
      const producAggdo = producBag.find((producto) => producto.id === idProduc);
      let cantidaAggBag = 1;

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

      if (producAggdo) {
        producAggdo.cantAgg += 1;
        cantidaAggBag += parseInt(Number(producAggdo.cantAgg));
        modal("¡Excelente!", "se sumó otra cantidad al producto.");
      } else {
        producBag.push({
          id: idProduc,
          nombre: producto.nombre,
          precio: producto.precio.toFixed(3),
          imagen: `.${producto.imagen}`,
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

function createAddButton() {
  const btnAdd = document.createElement("a");
  btnAdd.innerText = "Agregar";
  btnAdd.className = "btnAdd";
  return btnAdd;
}

function createSaleElement() {
  return `<span class="sale"><p>Sale</p><img src="./assets/icons/fire.png"></span>`;
}

function createProductElement(producto, sale, precioDesc, precio, elementoDescuento, btnAdd) {
  const div = document.createElement("a");
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

export function todoslosproductos() {
  const aggProductos = document.getElementById("productos");
 
  // Iterar sobre cada producto en db_productos
db_productos.forEach((producto) => {
  // Crear elementos HTML para el producto
  const sale = producto.sale ? createSaleElement() : '';
  const elementoDescuento = producto.desc > 0 ? `<span>-${producto.desc}%</span>` : '';
  const descuento = producto.precio.toFixed(3) - (producto.precio.toFixed(3) / 100) * producto.desc;
  const precioDesc = producto.desc > 0 ? `<p>${descuento.toFixed(3)}</p>` : `<p>${producto.precio.toFixed(3)}</p>`;
  const precio = producto.desc > 0 ? `<p>${producto.precio.toFixed(3)}</p>` : `<br>`;

  const div = createProductElement(producto, sale, precioDesc, precio, elementoDescuento);
  aggProductos.appendChild(div);

  // Elementos para el carrusel
  const btnAnterior = document.getElementById(`anterior_${producto.id}`);
  const btnSiguiente = document.getElementById(`siguiente_${producto.id}`);
  let i = 0;

  cambiarImagen(btnSiguiente, btnAnterior, producto.imagen, i, producto.id);
  
});
function cambiarImagen(btnSiguiente, btnAnterior, imagenes, i, productId) {
  btnSiguiente.addEventListener('click', (e) => {
    e.preventDefault();
      i = (i + 1) % imagenes.length;
      actualizarImagen(productId);
  });

  btnAnterior.addEventListener('click', (e) => {
    e.preventDefault();
      i = (i - 1 + imagenes.length) % imagenes.length;
      actualizarImagen(productId);
  });

  function actualizarImagen(productId) {
      const imagenCarrusel = document.getElementById(`imgProducto_${productId}`);
      imagenCarrusel.src = `../${imagenes[i]}`;
  }
}
  
function createSaleElement() {
  return `<span class="sale"><p>Sale</p><img src="../assets/icons/fire.png"></span>`;
}

function createProductElement(producto, sale, precioDesc, precio, elementoDescuento) {
  const div = document.createElement("a");
  div.href = "#";
  div.innerHTML = `
    ${sale}            
    <div class="cuerpo">
      <div class="btnsCambiar">
        <label id="anterior_${producto.id}" class="FlechaImgizquierda">&#8249;</label>
        <label id="siguiente_${producto.id}" class="FlechaImgDerecha">&#8250;</label>
      </div>
      <img class="imgProducto" id="imgProducto_${producto.id}" src=".${producto.imagen[0]}" alt="${producto.nombre}">
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
    </div>`;

  return div;
}
}

export function mostrarProductosBag() {
  const productosGuardados = localStorage.getItem("productos");
  const productos = JSON.parse(productosGuardados) || [];

  const listProductos = document.getElementById("productos");
  const detalle = document.getElementById("content_productos");

    if (productos.length == 0) {
      listProductos.innerHTML = `<p>No tienes ningun producto agregado a la bolsa.<p>`;
    } else {      
      productos.forEach((producto) => {
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
  
  
  function crearElementoSale() {
      return `<span class="sale"><p>Sale</p><img src="../assets/icons/fire.png"></span>`;
  }
  
  function crearElementoDescuento(descuento) {
      return descuento > 0 ? `<span>-${descuento}%</span>` : '';
  }
  
  function calcularPrecioDescuento(precio, descuento) {
      return descuento > 0 ? precio - (precio / 100 * descuento) : precio;
  }
  
  function calcularTotalProductoCantidad(cantAgg, precioDesc) {
      return `<p id="precioCantidad">$ ${Number(cantAgg * precioDesc).toFixed(3)}</p>`;
  }
  
  function crearElementoProductos(producto, sale, elementoDescuento, precioDesc, totalProdCant) {
      const div = document.createElement("div");
      div.className = "grid";
      div.innerHTML = `
          ${sale}
          <div class="cuerpo">
              <img src="${producto.imagen}" alt="${producto.nombre}">
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
  
  function EventoCambiarCantidad(detalle, container, precioDesc, id) {
      const increment = container.querySelector(".increment");
      const decrement = container.querySelector(".decrement");
  
      increment.addEventListener("click", () => subirCantidad(container, precioDesc, id));
      decrement.addEventListener("click", () => bajarCantidad(container, precioDesc, id));
  }
  
  function subirCantidad(container, precioDesc, id) {
      const input = container.querySelector('.cantidad-input');
      const precioCantidad = container.querySelector("#precioCantidad");
  
      input.stepUp();
      actualizarTotal(input, precioCantidad, precioDesc, id);
  }
  
  function bajarCantidad(container, precioDesc, id) {
      const input = container.querySelector('.cantidad-input');
      const precioCantidad = container.querySelector("#precioCantidad");
  
      input.stepDown();
      actualizarTotal(input, precioCantidad, precioDesc, id);
  }
  
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
        }).then((result) => {
          if (result.isConfirmed) {
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
          } else if (result.dismiss === Swal.DismissReason.cancel) {
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