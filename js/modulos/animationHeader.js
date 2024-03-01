export function mostrarNotificaciones() {
    const notificaciones = document.getElementById('notificaciones');
    const contenedorNotificaciones = document.getElementById('plegableNotificacion');

    notificaciones.addEventListener('mouseenter', () => {
        contenedorNotificaciones.style.display = "block";
        contenedorNotificaciones.innerHTML = `
            <ul>
                <li><p>Activa tu cupón de primera compra haciendo click <a href="">Aqui</a>.</p></li>
            </ul>
        `;
    });
    notificaciones.addEventListener('mouseout', () => {
        contenedorNotificaciones.style.display = "none";
    });
}