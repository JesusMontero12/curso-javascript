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

export function animacionTallas() {
    const u = document.getElementById('u');
    const tallaU = document.getElementById('TallaU');
    const s = document.getElementById('s');
    const tallaS = document.getElementById('TallaS');
    const m = document.getElementById('m');
    const tallaM = document.getElementById('TallaM');
    const l = document.getElementById('l');
    const tallaL = document.getElementById('TallaL');
    const xl = document.getElementById('xl');
    const tallaXL = document.getElementById('TallaXL');
    const xxl = document.getElementById('xxl');
    const tallaXXL = document.getElementById('TallaXXL');

    u.addEventListener('click', () => {
        tallaU.classList.toggle("labelTalla");
    });

    s.addEventListener('click', () => {
        tallaS.classList.toggle("labelTalla");
    });

    m.addEventListener('click', () => {
        tallaM.classList.toggle("labelTalla");
    });

    l.addEventListener('click', () => {
        tallaL.classList.toggle("labelTalla");
    });

    xl.addEventListener('click', () => {
        tallaXL.classList.toggle("labelTalla");
    });

    xxl.addEventListener('click', () => {
        tallaXXL.classList.toggle("labelTalla");
    });
   
}