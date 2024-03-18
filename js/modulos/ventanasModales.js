import { animacionTallas } from "./animaciones.js";
import { burbujaBag } from "./burujaNotificaciones.js";

export function VentanaModalPagos() {
    const cerrar = document.getElementById('cerrar');
    const modal = document.getElementById('modal');
    const btnAbrir = document.getElementById('abrirModal');
    const checkAggNota = document.getElementById('checknota');
    const textarea = document.getElementById('textNota');

    if (btnAbrir) {
        btnAbrir.addEventListener('click', () => {
            modal.style.display = "block";
        });
    
        cerrar.addEventListener('click', () => {
            modal.style.display = "none";
        });
    
        window.addEventListener('click', (e) => {
            if (e.target == modal) {            
                modal.style.display = "none";
            }
        });
    
        checkAggNota.addEventListener('click', () => {
            if (checkAggNota.checked) {
                textarea.style.display = "block";
            } else {
                textarea.style.display = "none";
            }
        });
    }
}

export function VentanaModalProductos(producto, sale) {
    const main = document.getElementById('main');
    const btnAdd = crearBtnAgregar();
    const elementoDescuento = producto.desc > 0 ? `<span>-${producto.desc}%</span>` : '';
    const precioDesc = calcularPrecioDescuento(producto.precio.toFixed(3), producto.desc.toFixed(3));    
    const precio = producto.desc > 0 ? `<p>$ ${producto.precio.toFixed(3)}</p>` : `<br>`;
    const div = crearElementoModalProducto(producto, sale, precioDesc, precio, elementoDescuento);
    let talla = "u";
    
    let i = 0;
    main.appendChild(div);
    EventoCambiarCantidad(div, precioDesc);

    const modal = document.getElementsByClassName("productoDetallado")[0];
    const cerrar = document.getElementById('cerrar');

    // Elementos para el carrusel
    const btnAnterior = document.getElementById(`anterior_${producto.id}`);
    const btnSiguiente = document.getElementById(`siguiente_${producto.id}`);
    console.log(`.${producto.imagen}`);
    cambiarImagen(btnSiguiente, btnAnterior, producto.imagen, i, producto.id);
    animacionTallas();

    const btnAction = document.getElementById('btnAction');
    btnAction.appendChild(btnAdd);

    const imagenesMin = document.querySelectorAll('.imgProductoMin');

    imagenesMin.forEach(imagen => {
        imagen.addEventListener('mousemove', (e) => {
            e.preventDefault();
            const imagenClickeada = e.target;
            const indiceImagen = Array.from(imagenClickeada.parentNode.parentNode.children).indexOf(imagenClickeada.parentNode); 
            const imagenGrande = document.getElementById(`img_${producto.id}`);
            imagenGrande.src = `${producto.imagen[indiceImagen]}`;
        });
    });
    

    if (modal) {
        modal.style.display = "block";
        
    } else {
        modal.style.display = "none";
    }
    const checkboxes = document.querySelectorAll('.talla input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });

            if (checkbox.checked) {
                talla = checkbox.value;
            } else {
                talla = "u"; 
            }
        });
    });

    btnAdd.addEventListener('click', () => {
        const idProduc = producto.id;
        const producBag = JSON.parse(localStorage.getItem("productos")) || [];
        const input = document.getElementById('cantidad-input');
        let cantidaAggBag = input.value;
        
        
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

        producBag.push({
            id: idProduc,
            nombre: producto.nombre,
            precio: producto.precio.toFixed(3),
            imagen: producto.imagen.map(imagen => `.${imagen}`),
            sale: producto.sale,
            talla: talla,
            descuento: producto.desc,
            stock: producto.stock,
            cantAgg: cantidaAggBag,
            descripcion: producto.descripcion,
        });
        modal("¡Excelente!", "El producto se agregó a la bolsa exitosamente.");
        
        localStorage.setItem("productos", JSON.stringify(producBag));
        burbujaBag();
        cerrarModal();
    });

    cerrar.addEventListener('click', () => {
       cerrarModal();
    });
    window.addEventListener('click', (e) => {
        if (e.target == modal) {            
            cerrarModal();
        }
    });


    function cerrarModal() {
        modal.style.display = "none";
        modal.remove();
        burbujaBag();
    }

     //crear botón agregar 
    function crearBtnAgregar() {
        const btnAdd = document.createElement("a");
        btnAdd.innerText = "Agregar";
        btnAdd.className = "btnAdd";
        
        return btnAdd;
    }

    function crearElementoModalProducto(producto, sale, precioDesc, precio, elementoDescuento){
        const div = document.createElement("div");
        div.className = "productoDetallado";
        div.innerHTML = ` 
            <div class="modalContent">
                <span class="cerrar" id="cerrar">&times;</span>          
                <div class="productoModal">
                    <div class="galeriaImg">                    
                        <ul>
                            <li><img class="imgProductoMin" data-producto-id="${producto.id}" src=".${producto.imagen[0]}" alt="${producto.nombre}"></li>
                            <li><img class="imgProductoMin" data-producto-id="${producto.id}" src=".${producto.imagen[1]}" alt="${producto.nombre}"></li>
                            <li><img class="imgProductoMin" data-producto-id="${producto.id}" src=".${producto.imagen[2]}" alt="${producto.nombre}"></li>
                        </ul>
                    </div>
                    ${sale}
                    <div class="cuerpo">
                        <div class="btnsCambiar">
                        <label id="anterior_${producto.id}" class="FlechaImgizquierda">&#8249;</label>
                        <label id="siguiente_${producto.id}" class="FlechaImgDerecha">&#8250;</label>
                        </div>
                        <img class="imgProducto" id="img_${producto.id}" src=".${producto.imagen[0]}" alt="${producto.nombre}">
                    </div>
                    <div class="content_info">
                        <div class="titulo">
                            <h3>${producto.nombre} ${elementoDescuento}</h3>
                            <p>${producto.descripcion}</p>
                            <ul>
                                <li><img src="../assets/icons/estrella.png" alt=""></li>
                                <li><img src="../assets/icons/estrella.png" alt=""></li>
                                <li><img src="../assets/icons/estrella.png" alt=""></li>
                                <li><img src="../assets/icons/estrella.png" alt=""></li>
                                <li><img src="../assets/icons/estrella-dark.png" alt=""></li>
                                <a href="#comentarios" for="comentarios">hay mas de 100 comentarios.</a>    
                            </ul>
                        </div>
                        <div class="precio_descuento">
                            <p id="precioCantidad">$ ${Number(precioDesc).toFixed(3)}</p>
                        </div>
                        <div class="precio">
                           ${precio}
                        </div>
                        <div class="cantidad">
                            <div class="btns-cantidad">
                                <button class="decrement">-</button>
                                <input type="number" class="cantidad-input" id="cantidad-input" min="1" max="5" step="1" value="1">
                                <button class="increment">+</button>
                            </div>
                            <p>limite de compra de este producto 5 unidades.</p> 
                        </div>   
                        <div class="tallas">
                            <div class="talla">
                                <input id="u" type="checkbox" value="u">
                                <label for="u" id="TallaU">U</label>
                                </div>
                                <div class="talla">
                                <input id="s" type="checkbox" value="s">
                                <label for="s" id="TallaS">S</label>
                                </div>
                                <div class="talla">
                                <input id="m" type="checkbox" value="m">
                                <label for="m" id="TallaM">M</label>
                                </div>
                                <div class="talla">
                                <input id="l" type="checkbox" value="l">
                                <label for="l" id="TallaL">L</label>
                                </div>
                                <div class="talla">
                                <input id="xl" type="checkbox" value="xl">
                                <label for="xl" id="TallaXL">XL</label>
                                </div>
                                <div class="talla">
                                <input id="xxl" type="checkbox" value="xxl">
                                <label for="xxl" id="TallaXXL">XXL</label>
                            </div>
                        </div>
                        <div class="btns">
                            <div class="btnAction" id="btnAction"></div>
                            <div class="btnFavorito">
                                <img src="../assets/icons/heart.png" alt="">
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        `;
        return div;      
    }

    function calcularPrecioDescuento(precio, descuento) {
        return descuento > 0 ? precio - (precio / 100 * descuento).toFixed(3) : Number(precio).toFixed(3);
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

    //funcion evento cambiar cantidad
    function EventoCambiarCantidad(container, precioDesc) {
        const increment = container.querySelector(".increment");
        const decrement = container.querySelector(".decrement");

        increment.addEventListener("click", () => subirCantidad(container, precioDesc));
        decrement.addEventListener("click", () => bajarCantidad(container, precioDesc));
    }

    //funcion operacion subir cantidad
    function subirCantidad(container, precioDesc) {
        const input = container.querySelector('.cantidad-input');
        const precioCantidad = container.querySelector("#precioCantidad");

        input.stepUp();
        actualizarTotal(input, precioCantidad, precioDesc);
    }

    //funcion operacion bajar cantidad
    function bajarCantidad(container, precioDesc) {
        const input = container.querySelector('.cantidad-input');
        const precioCantidad = container.querySelector("#precioCantidad");

        input.stepDown();
        actualizarTotal(input, precioCantidad, precioDesc);
    }

    //actualiza el total segun la cantidad seleccionada
    function actualizarTotal(input, precioCantidad, precioDesc) {
        precioCantidad.innerText = `$ ${Number(input.value * precioDesc).toFixed(3)}`;
    }
}