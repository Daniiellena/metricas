document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FUNCIÓN PARA ACTUALIZAR CONTADOR DEL CARRITO
    // Lee 'carrito_wood' (usado en tu tienda) para que el número sea real
    const actualizarContadorGlobal = () => {
        const carritoData = localStorage.getItem('carrito_wood');
        const carritoActual = carritoData ? JSON.parse(carritoData) : [];
        const contador = document.getElementById('cart-count');
        
        if (contador) {
            contador.innerText = carritoActual.length;
        }
    };
    
    // Ejecutar al cargar la página
    actualizarContadorGlobal();

    // 2. EFECTO DE NAVBAR AL HACER SCROLL
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

    // 3. LÓGICA DEL CAPTCHA MATEMÁTICO
    // Generamos números aleatorios cada vez que carga la página
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const totalCorrecto = num1 + num2;

    const n1Element = document.getElementById('n1');
    const n2Element = document.getElementById('n2');
    if (n1Element && n2Element) {
        n1Element.innerText = num1;
        n2Element.innerText = num2;
    }

    // 4. MANEJO DEL FORMULARIO DE CONTACTO (Validación de Seguridad)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación 1: Honeypot (Trampa oculta para bots)
            const honey = document.getElementById('honeypot').value;
            if (honey !== "") return; // Si el bot lo llenó, no hace nada

            // Validación 2: Captcha Matemático
            const respuestaUsuario = parseInt(document.getElementById('captcha_answer').value);
            if (respuestaUsuario !== totalCorrecto) {
                alert("El resultado de la suma es incorrecto. Por favor, intenta de nuevo.");
                return;
            }
            
            // Si pasa todo: Mostrar éxito y resetear
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.remove('d-none');
            contactForm.reset();
            
            // Ocultar mensaje de éxito tras 5 segundos
            setTimeout(() => {
                successMessage.classList.add('d-none');
            }, 5000);
        });
    }

    // 5. ANIMACIONES DE APARICIÓN (Intersection Observer)
    const observerOptions = { threshold: 0.1 };
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
});

