// URL del backend (Google Apps Script) que procesa login y registro
const API_URL = "https://script.google.com/macros/s/AKfycbw7Btfi3DOjpLydESbTeRYGziTH1iuGaO1xKOJjVftPY4QgfOOgDsHshJ-oy6icWCZa/exec";

// Manejo del formulario de inicio de sesión
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    // Evento que se ejecuta al enviar el formulario de login
    loginForm.addEventListener('submit', async (e) => {
        // Evita que la página se recargue
        e.preventDefault();

        // Obtiene los datos ingresados por el usuario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Envía los datos al servidor para validar credenciales
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({ action: "login", email, password })
            });

            // Convierte la respuesta a formato JSON
            const data = await response.json();

            // Verifica si el login fue exitoso
            if (data.status === "success") {
                // Guarda los datos del usuario en el navegador
                localStorage.setItem('usuario', JSON.stringify(data.user));

                // Muestra mensaje de bienvenida
                alert(`¡Bienvenido de nuevo, ${data.user.nombre}!`);
                
                // Redirige según el rol del usuario
                if (data.user.rol === "admin") {
                    window.location.href = "admin_dashboard.html";
                } else {
                    window.location.href = "index.html";
                }
            } else {
                // Muestra error devuelto por el servidor
                alert("Error: " + data.message);
            }
        } catch (error) {
            // Manejo de errores de conexión
            alert("Error al conectar con la base de datos.");
            console.error(error);
        }
    });
}

// Manejo del formulario de registro de usuarios
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    // Evento que se ejecuta al enviar el formulario de registro
    registerForm.addEventListener('submit', async (e) => {
        // Evita el comportamiento por defecto del formulario
        e.preventDefault();

        // Obtiene los datos ingresados en el formulario
        const nombre = document.getElementById('regNombre').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        try {
            // Envía los datos al servidor para crear un nuevo usuario
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({ 
                    action: "register", 
                    nombre, 
                    email, 
                    password 
                })
            });

            // Convierte la respuesta del servidor a JSON
            const data = await response.json();

            // Verifica si el registro fue exitoso
            if (data.status === "success") {
                // Notifica al usuario y redirige al login
                alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
                window.location.href = "login.html";
            } else {
                // Muestra mensaje de error
                alert("Error: " + data.message);
            }
        } catch (error) {
            // Manejo de errores durante el registro
            alert("Error al procesar el registro.");
            console.error(error);
        }
    });
}
