document.addEventListener('DOMContentLoaded', () => {
    
    // Sincronizar contador de carrito
    const updateCartBadge = () => {
        const cartCount = localStorage.getItem('cartItemsCount') || 0;
        document.getElementById('cart-count').innerText = cartCount;
    };
    updateCartBadge();

    // Efecto de transparencia en Navbar al hacer scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            nav.classList.add('shadow-sm');
            nav.style.opacity = "0.98";
        } else {
            nav.classList.remove('shadow-sm');
            nav.style.opacity = "1";
        }
    });

    // Desplazamiento suave para todos los enlaces internos 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

// Animación de aparición al hacer scroll para PROYECTOS
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Manejo del Formulario de CONTACTO
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulación de envío
        const successMessage = document.getElementById('successMessage');
        
        // Mostrar mensaje de éxito
        successMessage.classList.remove('d-none');
        contactForm.reset();
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.classList.add('d-none');
        }, 5000);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Añadimos una clase al body para activar las animaciones de forma segura
    document.body.classList.add('js-scroll');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Selecciona todas las secciones para animarlas
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Esta función lee el localStorage y actualiza el número en cualquier página
function actualizarContadorGlobal() {
    // Busca el carrito en la memoria del navegador
    const carritoData = localStorage.getItem('carrito_wood');
    const carritoActual = carritoData ? JSON.parse(carritoData) : [];
    
    // Busca el elemento del contador en el HTML
    const contador = document.getElementById('cart-count');
    
    // Si el contador existe en esta página, ponle el número
    if (contador) {
        contador.innerText = carritoActual.length;
    }
}

// Se ejecuta automáticamente en cuanto la página termina de cargar
document.addEventListener('DOMContentLoaded', actualizarContadorGlobal);


});

