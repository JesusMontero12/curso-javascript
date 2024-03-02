export function VentanaModal() {
    const cerrar = document.getElementById('cerrar');
    const modal = document.getElementById('modal');
    const btnAbrir = document.getElementById('abrirModal');
    const checkAggNota = document.getElementById('checknota');
    const textarea = document.getElementById('textNota');

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