export function mostrarNotificaciones() {
    const notificaciones = document.getElementById('notificaciones');
    const contenedorNotificaciones = document.getElementById('plegableNotificacion');

    notificaciones.addEventListener('mouseenter', () => {
        contenedorNotificaciones.style.display = "block";
        contenedorNotificaciones.innerHTML = `
            <p>Notificaciones</p>
            <ul>
                <li>
                    <p>Activa tu cupón de primera compra haciendo click <a href="">Aqui</a>.</p>
                    <span>hace 3 min.</span>
                </li>
                <li>
                    <p>Bienvenido a vector, en los proximos minutos recibiras un cupón de primera compra.</p>
                    <span>hace 10 min.</span>
                </li>
            </ul>
        `;
    });
    
    notificaciones.addEventListener('mouseleave', () => {
        contenedorNotificaciones.style.display = "none";
    });

    contenedorNotificaciones.addEventListener('mouseenter', () => {
        contenedorNotificaciones.style.display = "block";
    });

    contenedorNotificaciones.addEventListener('mouseleave', () => {
        contenedorNotificaciones.style.display = "none";
    });
}