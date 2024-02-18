const productosGuardados = localStorage.getItem('productos');
const productos = JSON.parse(productosGuardados) || [];

const listProductos = document.getElementById("productos");



if (Array.isArray(productos)) {
     productos.forEach(producto => {
    //condicion si el producto esta en sale agrega elementos html
    const sale = producto.sale ? `<span class="sale"><p>Sale</p><img src="../assets/icons/fire.png"></span>` : ``;
    //condicionale si el descuento es mayor a 0 agrega elementos html
    const elementoDescuento = producto.descuento > 0 ? `<span>-${producto.descuento}%</span>` : ``;
    //formula para el descuento
    const descuento = producto.precio - (producto.precio / 100 * producto.descuento);
    //condicionale si hay descuento muestra el precio con descuento
    const precioDesc = producto.descuento > 0 ? `$ ${descuento}` : `$ ${producto.precio}`;
    //condicional si no hay descuentomuestra el precio original
    const precio = producto.descuento > 0 ? `<p>$ ${producto.precio}</p>` : `<br>`;



    let div = document.createElement("div");
    div.className = "grid";
    div.innerHTML = `
        ${sale}
        <div class="cuerpo">
          <img src="${producto.imagen}">
        </div>
        <div class="content_info">
            <div class="titulo">
                <h3>${producto.nombre} ${elementoDescuento}</h3>
            </div>
            <div class="precio_descuento">
                ${precioDesc}
                ${precio}
                
            </div>
            <div class="detalle">
                <input type="number" min="1" max="5" step="1" value="${producto.cantAgg}">
                <div class="total">
                    <h4>Subto tal: <b>${precioDesc}</b></h4>
                    <p>Iva(19%): <b></b></p>
                    <h5>Total: <b>$ 9.000</b></h5>
                </div>
            </div>
            
        </div>
        <div class="actionProduct">
                <img src="../assets/icons/delete.png" alt="">
            </div>
        
    `;
    listProductos.appendChild(div);
  });
}