//Agrega burbuja con el numero de productos agregado a la bolsa
function burbujaBag() {
     //-----Verifica si el producto ya está en localStorage
    const productoBolsa = JSON.parse(localStorage.getItem("productos")) || [];
    let burbujaBag = document.getElementById("content-burbuja");
    let burbuja = document.createElement("div");
  
    if (productoBolsa.length >= 1) {
      burbuja.className = "burbuja";
      burbuja.innerHTML = `<p>${productoBolsa.length}</p>`;
      burbujaBag.appendChild(burbuja);
    }
  }
  
  export default burbujaBag;