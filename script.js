// ==========================================
// 1. Configuración de Sliders (Servicios y Clientes)
// ==========================================

// Swiper de Servicios (Bloques Blancos de Estanterías)
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 25,
    loop: true,               // Mantiene el carrusel infinito (elimina el espacio vacío al final)
    loopedSlides: 4,          // Prepara las tarjetas para una transición infinita y fluida
    watchSlidesProgress: true, // Optimiza que mantengan su renderizado
    
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    
    // Controlamos de forma estricta cuántos bloques se ven para que NUNCA se encojan
    breakpoints: {
        768: { 
            slidesPerView: 2,
            spaceBetween: 25 
        },
        1024: { 
            slidesPerView: 3, // Clava exactamente 3 bloques grandes y simétricos en PC
            spaceBetween: 35  // Espaciado perfecto entre tarjetas
        } 
    }
});

// Swiper de Logotipos de Clientes
var swiperClients = new Swiper(".clients-swiper", {
    slidesPerView: 2, 
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    breakpoints: {
        768: { 
            slidesPerView: 3,
            spaceBetween: 25 
        },
        1024: { 
            slidesPerView: 5, 
            spaceBetween: 30 
        },
    },
});

// ==========================================
// 2. Base de datos de imágenes por cliente
// ==========================================
const albumData = {
    'Plaza Vea': ['img/Makro.jpg'], 
    'Tiendas Mass': ['img/mass1.jpg', 'img/mass2.jpg'],
    'Tambo': ['img/tambo1.jpg', 'img/tambo2.jpg'],
    'Tottus': ['img/tottus1.jpg', 'img/tottus2.jpg'],
    'Makro': ['img/Makro1.jpg', 'img/Makro2.jpg', 'img/Makro3.jpg'],
    'Promart': ['img/promart1.jpg'],
    'Precio Uno': ['img/uno1.jpg']
};

let currentAlbum = []; 
let currentIndex = 0;  

// ==========================================
// 3. Funciones del Álbum (Cuadro Blanco)
// ==========================================
function openAlbum(client) {
    const modal = document.getElementById("albumModal");
    const container = document.getElementById("photoContainer");
    const title = document.getElementById("modalTitle");

    title.innerText = "SERVICIOS EN " + client.toUpperCase();
    container.innerHTML = "";
    
    currentAlbum = albumData[client] || []; 

    currentAlbum.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = `Trabajo en ${client}`;
        img.onclick = () => openLightbox(index); 
        container.appendChild(img);
    });

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; 
}

function closeModal() {
    document.getElementById("albumModal").style.display = "none";
    document.body.style.overflow = "auto"; 
}

// ==========================================
// 4. Funciones del Lightbox (Visor Grande)
// ==========================================
function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    lightboxImg.src = currentAlbum[currentIndex];
    lightbox.style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeImage(step) {
    currentIndex += step;
    if (currentIndex >= currentAlbum.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentAlbum.length - 1;
    document.getElementById("lightboxImg").src = currentAlbum[currentIndex];
}

// ==========================================
// 5. Controles de Teclado y Clic Externo
// ==========================================
window.onclick = function(event) {
    const modal = document.getElementById("albumModal");
    const lightbox = document.getElementById("lightbox");
    if (event.target == modal) closeModal();
    if (event.target == lightbox) closeLightbox();
}

document.onkeydown = function(e) {
    if (e.key === "Escape") {
        closeLightbox();
        closeModal();
    }
    if (document.getElementById("lightbox").style.display === "flex") {
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "ArrowLeft") changeImage(-1);
    }
};

// ==========================================
// 6. Formulario de Contacto (AJAX - Formspree)
// ==========================================
const form = document.querySelector('form');
if(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = form.querySelector('.btn-submit');
        const originalText = button.innerText;
        
        // Cambiamos el texto del botón temporalmente para dar feedback visual
        button.innerText = 'Enviando...';
        button.style.opacity = '0.7';
        button.disabled = true;

        const formData = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert('¡Gracias! Tu mensaje ha sido enviado correctamente.');
                form.reset();
            } else {
                alert('Hubo un problema con el servidor. Por favor, vuelve a intentarlo.');
            }
        } catch (error) {
            alert('Error de conexión. Verifica tu internet e inténtalo de nuevo.');
        } finally {
            // Restauramos el botón a su estado original pase lo que pase
            button.innerText = originalText;
            button.style.opacity = '1';
            button.disabled = false;
        }
    });
}

// ==========================================
// 7. Efecto Scroll Header
// ==========================================
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("encogido");
    } else {
        header.classList.remove("encogido");
    }
});