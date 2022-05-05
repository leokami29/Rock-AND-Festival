document.addEventListener('DOMContentLoaded', function () {
    iniciarapp();
});

function iniciarapp() {
    navegacionfija();
    creargaleria();
    scrollnav();
}

function navegacionfija () {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre__festival');
    const  body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        if ( sobreFestival.getBoundingClientRect().bottom < 0) {
            barra.classList.add('fijo');
            body.classList.add('body__scroll')
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body__scroll');
        }
    });
    
}


function scrollnav() {
    const enlaces = document.querySelectorAll('.navegacion__principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();

            const seccionscroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionscroll);
            seccion.scrollIntoView({behavior: 'smooth'});
        });
    });
}


function creargaleria() {
    const galeria = document.querySelector('.galeria__imagenes')

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture')
        imagen.innerHTML = `<source srcset="build/img/thumb/${i}.avif" type="image/avif">
       <source srcset="build/img/thumb/${i}.webp" type="image/webp">
       <img loading="lazy" src="build/img/thumb/${i}.jpg" alt="imagen galeria ">`;

        imagen.onclick = function () {
            mostrarimagen(i);
        }


        galeria.appendChild(imagen);
    }
}

function mostrarimagen(id) {
    const imagen = document.createElement('picture')
    imagen.innerHTML =
        `<source srcset="build/img/grande/${id}.avif" type="image/avif">
       <source srcset="build/img/grande/${id}.webp" type="image/webp">
       <img loading="lazy" src="build/img/grande/${id}.jpg" alt="imagen galeria ">`;

    //Crear el Overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar__body');

        overlay.remove();
    }

    //Boton para cerrar el modal
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn__cerrar');

    cerrarModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar__body');

        overlay.remove();
    };
    overlay.appendChild(cerrarModal);

    //Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar__body');
}