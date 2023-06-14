document.addEventListener('DOMContentLoaded', function () {
    iniciarapp();
});

// Función para inicializar la aplicación
function iniciarapp() {
    navegacionfija();
    creargaleria();
    scrollnav();
}

// Función para aplicar navegación fija
function navegacionfija() {
    const barra = document.querySelector('.header'); // Seleccionar la barra de navegación
    const sobreFestival = document.querySelector('.sobre__festival'); // Seleccionar la sección sobre el festival
    const body = document.querySelector('body'); // Seleccionar el body

    window.addEventListener('scroll', function () {
        // Verificar si la sección sobreFestival ha pasado por encima del borde superior de la ventana
        if (sobreFestival.getBoundingClientRect().bottom < 0) {
            barra.classList.add('fijo'); // Agregar la clase 'fijo' a la barra de navegación
            body.classList.add('body__scroll'); // Agregar la clase 'body__scroll' al body
        } else {
            barra.classList.remove('fijo'); // Quitar la clase 'fijo' de la barra de navegación
            body.classList.remove('body__scroll'); // Quitar la clase 'body__scroll' del body
        }
    });
}

// Función para desplazamiento suave al hacer clic en los enlaces de navegación
function scrollnav() {
    const enlaces = document.querySelectorAll('.navegacion__principal a'); // Seleccionar todos los enlaces de navegación
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();

            const seccionscroll = e.target.attributes.href.value; // Obtener el atributo href del enlace
            const seccion = document.querySelector(seccionscroll); // Seleccionar la sección correspondiente
            seccion.scrollIntoView({ behavior: 'smooth' }); // Desplazar suavemente hacia la sección
        });
    });
}

// Función para crear la galería de imágenes
function creargaleria() {
    const galeria = document.querySelector('.galeria__imagenes'); // Seleccionar el contenedor de la galería

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture'); // Crear un elemento 'picture' para la imagen
        imagen.innerHTML = `<source srcset="build/img/thumb/${i}.avif" type="image/avif">
       <source srcset="build/img/thumb/${i}.webp" type="image/webp">
       <img loading="lazy" src="build/img/thumb/${i}.jpg" alt="imagen galeria ">`; // Agregar contenido HTML a la imagen

        imagen.onclick = function () {
            mostrarimagen(i); // Asignar el evento onclick para mostrar la imagen en grande al hacer clic
        }

        galeria.appendChild(imagen); // Agregar la imagen a la galería
    }
}

// Función para mostrar una imagen en grande
function mostrarimagen(id) {
    const imagen = document.createElement('picture'); // Crear un elemento 'picture' para la imagen en grande
    imagen.innerHTML =
        `<source srcset="build/img/grande/${id}.avif" type="image/avif">
       <source srcset="build/img/grande/${id}.webp" type="image/webp">
       <img loading="lazy" src="build/img/grande/${id}.jpg" alt="imagen galeria ">`; // Agregar contenido HTML a la imagen

    // Crear el Overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen); // Agregar la imagen al overlay
    overlay.classList.add('overlay'); // Agregar la clase 'overlay' al overlay
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar__body');

        overlay.remove(); // Remover el overlay al hacer clic
    }

    // Botón para cerrar el modal
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn__cerrar'); // Agregar la clase 'btn__cerrar' al botón

    cerrarModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar__body');

        overlay.remove(); // Remover el overlay al hacer clic en el botón de cerrar
    };
    overlay.appendChild(cerrarModal); // Agregar el botón de cerrar al overlay

    // Añadir el overlay al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar__body'); // Agregar la clase 'fijar__body' al body para evitar el scroll detrás del overlay
}
