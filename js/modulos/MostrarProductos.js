//importamos objeto que tenemos como base de datos
import db_productos from './productos.js';
//importamos funcion de la burbuja de notificaciones de la bolsa
import burbujaBag from './burujaNotificaciones.js';

//Mostramos los prodcutos mas vendidos
function loMasVendido() {
    const aggProductos = document.getElementById("productos");
  
    db_productos.forEach((producto) => {
        //validamos si el producto tiene mas de 60 ventas entra entre los mas vendidos
        const masVendidos = producto.cntVendido >= 60 ? true : false;
      
        if(masVendidos){
          //crea elemento html para el boton del card de los productos
          const btnAdd = document.createElement("a");
          btnAdd.innerText = "Agregar";
          btnAdd.className = "btnAdd";
          //condicion si el producto esta en sale agrega elementos html
          const sale = producto.sale ? `<span class="sale"><p>Sale</p><img src="./assets/icons/fire.png"></span>` : ``;
          //condicionale si el descuento es mayor a 0 agrega elementos html
          const elementoDescuento = producto.desc > 0 ? `<span>-${producto.desc}%</span>` : ``;
          //formula para el descuento
          const descuento = producto.precio - (producto.precio / 100 * producto.desc);
          //condicionale si hay descuento muestra el precio con descuento
          const precioDesc = producto.desc > 0 ? `<p>${descuento}</p>` : `<p>${producto.precio}</p>`;
          //condicional si no hay descuentomuestra el precio original
          const precio = producto.desc > 0 ? `<p>${producto.precio}</p>` : `<br>`;
          
         
         


          let div = document.createElement("a");
          div.innerHTML = `
            ${sale}
            
            <div class="cuerpo">
                <img src="${producto.imagen}">
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
            </div>
            ${btnAdd}
          `;
          aggProductos.appendChild(div);
          div.appendChild(btnAdd);   
      
          btnAdd.addEventListener("click", function(evt) {
            evt.preventDefault();
            //-----Obtiene el id del producto
            const idProduc = producto.id;
            const producBag = JSON.parse(localStorage.getItem("productos")) || [];
            const producAggdo = producBag.find((producto) => producto.id === idProduc);
            let cantidaAggBag = 1;
      
            function modal(titulo, text){
              Swal.fire({
                title: titulo,
                text: text,
                icon: "success"
              });
            }
      
            if (producAggdo) {
              //-----Si el producto ya esta agregado se le sumara a la cantidad en la bolsa
              producAggdo.cantAgg += 1;   
              cantidaAggBag += parseInt(Number(producAggdo.cantAgg));    
              modal("¡Excelente!", "se sumo otro cantida al producto");
            } else {
              //-----Si el producto no esta agregado, se agregara al array
              producBag.push({
              id: idProduc,
              nombre: producto.nombre,
              precio: producto.precio,
              imagen: `.${producto.imagen}`,
              sale: producto.sale,
              descuento: producto.desc,
              stock: producto.stock,
              cantAgg: cantidaAggBag
              });
      
              modal("¡Excelente!", "El producto se agrego a la bolsa exitosamente");            
            }
            //-----Guardar en localStorage
            localStorage.setItem("productos", JSON.stringify(producBag));   
            burbujaBag();
          }); 
        }    
      });
  }
  
  export default loMasVendido;
  