const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 } // Esto mantiene el orden de 3 bloques
    }
});

var swiperClients = new Swiper(".clients-swiper", {
    /* En celular se ven 2 grandes */
    slidesPerView: 2, 
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    breakpoints: {
        /* En tablets */
        768: { 
            slidesPerView: 3,
            spaceBetween: 25 
        },
        /* En PC - Con 5 se verán mucho más grandes que con 6 */
        1024: { 
            slidesPerView: 5, 
            spaceBetween: 30 /* Distancia de dos dedos */
        },
    },
});

// Base de datos de imágenes por cliente
const albumData = {
    'Plaza Vea': ['img/Makrojpg'],
    'Tiendas Mass': ['img/mass1.jpg', 'img/mass2.jpg'],
    'Tambo': ['img/tambo1.jpg', 'img/tambo2.jpg'],
    'Tottus': ['img/tottus1.jpg', 'img/tottus2.jpg'],
    'Makro': ['img/makro1.jpg', 'img/Makro2.jpg', 'img/Makro3.jpg'],
    'Promart': ['img/promart1.jpg'],
    'Precio Uno': ['img/uno1.jpg']
};

function openAlbum(client) {
    const modal = document.getElementById("albumModal");
    const container = document.getElementById("photoContainer");
    const title = document.getElementById("modalTitle");

    title.innerText = " Servicios en " + client;
    container.innerHTML = ""; // Limpiar fotos anteriores

    // Si existen fotos para ese cliente, las agregamos
    if (albumData[client]) {
        albumData[client].forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            container.appendChild(img);
        });
    }

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Desactiva el scroll de la página de fondo
}

function closeModal() {
    document.getElementById("albumModal").style.display = "none";
    document.body.style.overflow = "auto"; // Reactiva el scroll
}

// Cerrar si hacen clic fuera del cuadro blanco
window.onclick = function(event) {
    if (event.target == document.getElementById("albumModal")) {
        closeModal();
    }
}

let currentAlbum = []; // Guarda las fotos del cliente abierto
let currentIndex = 0;  // Guarda qué foto estás viendo

// Esta es tu función original mejorada
function openAlbum(client) {
    const modal = document.getElementById("albumModal");
    const container = document.getElementById("photoContainer");
    const title = document.getElementById("modalTitle");

    title.innerText = "SERVICIOS EN " + client.toUpperCase();
    container.innerHTML = "";
    
    currentAlbum = albumData[client] || []; // Guardamos el álbum actual

    currentAlbum.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        // Al hacer clic en la foto pequeña, abre el visor grande
        img.onclick = () => openLightbox(index); 
        container.appendChild(img);
    });

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// NUEVA: Abre la foto en grande
function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    lightboxImg.src = currentAlbum[currentIndex];
    lightbox.style.display = "flex";
}

// NUEVA: Cierra el visor grande
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// NUEVA: Cambia la imagen (atrás/adelante)
function changeImage(step) {
    currentIndex += step;

    // Si llega al final, vuelve al principio
    if (currentIndex >= currentAlbum.length) currentIndex = 0;
    // Si va hacia atrás desde la primera, va a la última
    if (currentIndex < 0) currentIndex = currentAlbum.length - 1;

    document.getElementById("lightboxImg").src = currentAlbum[currentIndex];
}

// Cerrar con la tecla Escape
document.onkeydown = function(e) {
    if (e.key === "Escape") closeLightbox();
    if (document.getElementById("lightbox").style.display === "flex") {
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "ArrowLeft") changeImage(-1);
    }
};

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    const formData = new FormData(form);
    const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        alert('¡Gracias! Tu mensaje ha sido enviado correctamente.');
        form.reset(); // Limpia el formulario
    } else {
        alert('Ups, hubo un problema al enviar tu mensaje.');
    }
});

window.addEventListener("scroll", function() {
    const header = document.querySelector("header"); // Verifica que tu etiqueta sea <header>
    
    if (window.scrollY > 50) {
        header.classList.add("encogido");
    } else {
        header.classList.remove("encogido");
    }
});