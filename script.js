// Ejecuta el código cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    
    // Sincroniza el contador del carrito desde localStorage
    const updateCartBadge = () => {
        const cartCount = localStorage.getItem('cartItemsCount') || 0;
        document.getElementById('cart-count').innerText = cartCount;
    };
    updateCartBadge();

    // Cambia estilo del navbar al hacer scroll
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

    // Scroll suave para enlaces internos
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

});

// Animación de aparición de secciones al hacer scroll
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

// Observa todas las secciones
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Manejo del formulario de contacto
// Lógica del Captcha Matemático
let captchaResult;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaResult = num1 + num2;
    document.getElementById('captcha-question').innerText = `${num1} + ${num2} = ?`;
}

// Generar el primer captcha al cargar
document.addEventListener('DOMContentLoaded', generateCaptcha);

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userAnswer = parseInt(document.getElementById('captcha-answer').value);
        const email = document.getElementById('email').value;
        const captchaError = document.getElementById('captchaError');
        const successMessage = document.getElementById('successMessage');

        // 1. Validación de Correo Electrónico (Regex simple)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        // 2. Validación de Captcha
        if (userAnswer !== captchaResult) {
            captchaError.classList.remove('d-none');
            generateCaptcha(); // Refresca la suma si falla
            document.getElementById('captcha-answer').value = "";
            return;
        }

        // Si todo está bien:
        captchaError.classList.add('d-none');
        successMessage.classList.remove('d-none');
        
        // Resetear formulario y generar nuevo captcha para el siguiente envío
        contactForm.reset();
        generateCaptcha();

        setTimeout(() => {
            successMessage.classList.add('d-none');
        }, 5000);
    });
}

// Segundo DOMContentLoaded para animaciones seguras
document.addEventListener("DOMContentLoaded", function() {
    
    // Activa animaciones controladas por JS
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

    // Observa todas las secciones
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Actualiza el contador del carrito en cualquier página
function actualizarContadorGlobal() {
    
    // Obtiene carrito desde localStorage
    const carritoData = localStorage.getItem('carrito_wood');
    const carritoActual = carritoData ? JSON.parse(carritoData) : [];
    
    // Actualiza el badge si existe
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.innerText = carritoActual.length;
    }
}

// Gestión de sesión del usuario
const user = JSON.parse(localStorage.getItem('usuario'));
const authSection = document.getElementById('auth-section');

// Muestra información en consola
console.log("Usuario detectado:", user);

if (user && authSection) {
    authSection.innerHTML = `
        <div class="dropdown">
            <button class="btn btn-outline-light dropdown-toggle border-0" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-user-circle me-1"></i> Hola, ${user.nombre}
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userMenu">
                <li><h6 class="dropdown-header text-dark">Perfil: ${user.rol}</h6></li>
                ${user.rol === 'admin' 
                    ? '<li><a class="dropdown-item fw-bold text-primary" href="admin_dashboard.html"><i class="fas fa-tachometer-alt me-2"></i>Dashboard Admin</a></li>' 
                    : '<li><a class="dropdown-item" href="mis_pedidos.html"><i class="fas fa-shopping-bag me-2"></i>Mis Pedidos</a></li>'}
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="#" id="btnLogout"><i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión</a></li>
            </ul>
        </div>
    `;
    
    // Cierra sesión y recarga la página
    document.getElementById('btnLogout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('usuario');
        window.location.reload();
    });
}


