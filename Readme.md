# Wood & Ensamble Designs - Documentación del Proyecto

Este repositorio contiene el desarrollo integral del sitio web para Wood & Ensamble Designs, empresa especializada en la fabricación de mobiliario a medida en Quito, Ecuador. El proyecto ha sido desarrollado de forma modular, priorizando el rendimiento, la escalabilidad y una experiencia de usuario optimizada para dispositivos móviles.

## Estructura del Proyecto

La arquitectura del sitio se organiza de la siguiente manera para separar la lógica de negocio de los estilos visuales:

### Archivos Raíz
* **index.html**: Página de aterrizaje principal con secciones de categorías, testimonios y servicios.
* **nosotros.html**: Sección corporativa con historia, misión, visión y valores.
* **productos.html**: Catálogo dinámico con sistema de filtrado y carrito de compras.
* **servicios.html**: Detalle técnico de los servicios especializados ofrecidos.
* **proyectos.html**: Portafolio de trabajos realizados con visualización detallada.
* **contacto.html**: Interfaz de comunicación y geolocalización.
* **politicas.html**: Documentación legal y preguntas frecuentes.
* **styles.css**: Hoja de estilos global y variables de diseño.
* **script.js**: Lógica general de navegación y efectos de interfaz.

### Directorios Especializados
* **css_producto_carrito/**: Contiene hojas de estilo específicas para la tienda (productos.css y carrito.css).
* **js_producto_carrito/**: Módulos de JavaScript para la gestión de datos:
    * **carrito.js**: Gestión del estado del carrito, persistencia en LocalStorage.
    * **producto.js**: Base de datos de productos (formato JSON), lógica de renderizado y filtros dinámicos.
* **Images / Images_catalogo**: Repositorios de recursos visuales del sitio.

## Tecnologías Utilizadas
* **HTML5 y CSS3**: Estructura semántica y diseño visual avanzado.
* **Bootstrap 5.3**: Framework para diseño responsivo y componentes de interfaz.
* **JavaScript (Vanilla)**: Manipulación del DOM, gestión de estado y validaciones lógicas.
* **FontAwesome 6.0**: Biblioteca de tipografía para elementos de navegación.
* **LocalStorage API**: Persistencia de datos del carrito de compras entre sesiones.

## Implementaciones Técnicas Destacadas

### Gestión de Estado
Se utiliza el objeto global `window.carrito` sincronizado con `localStorage` bajo la clave `carrito_wood`. Esto asegura que el usuario no pierda sus productos al recargar la página o navegar entre las diferentes secciones del sitio.

## Guía de Escalabilidad: Hacia un Entorno Full-Stack

Actualmente, el proyecto funciona como una aplicación Frontend de alto rendimiento. Para transformar esta plantilla en un sistema con base de datos real, se sugieren los siguientes pasos técnicos:

### 1. Integración de Base de Datos (Backend)
* **Tecnología sugerida**: Node.js con Express y MongoDB (NoSQL) o PostgreSQL (SQL).
* **Implementación**: Sustituir el array de objetos en `producto.js` por una llamada a una API REST (`fetch('api/productos')`). Esto permitiría gestionar el inventario desde un panel de administración sin tocar el código fuente.

## Instrucciones para Visualización Local
1. Clonar el repositorio.
2. Abrir el proyecto con la extensión **Live Server** en Visual Studio Code para asegurar que los módulos de JavaScript y las fuentes de FontAwesome carguen correctamente.

## Notas de Desarrollo
* **Seguridad**: El módulo de tarjeta de crédito es estrictamente educativo y de demostración; no procesa ni almacena información financiera real.
* **Compatibilidad**: Probado en navegadores basados en Chromium (Chrome, Edge) y Firefox.
* **Derechos**: Los activos visuales y la estructura de marca son propiedad exclusiva de Wood & Ensamble Designs.


# Wood & Ensamble - Proyecto de Métricas de Calidad

## Estado del Proyecto
![CI Wood & Ensamble](https://github.com/Daniellena/metricas/actions/workflows/ci.yml/badge.svg)

## Instalación y Ejecución
1. Clona el repositorio: `git clone https://github.com/Daniellena/metricas.git`
2. Navega a la carpeta del proyecto.
3. Abre `index.html` en cualquier navegador moderno.

## Enfoque de Calidad (ISO/IEC 25010)
Este proyecto utiliza un enfoque SQuaRE para medir:
- **Seguridad:** Implementación de Captcha matemático.
- **Adecuación Funcional:** Sistema de carrito y facturación.



Nuevos detalles de Seguridad en Formulario

## Seguridad del Formulario (Anti-Spam)

Esta plantilla incluye un sistema de seguridad de doble capa desarrollado íntegramente en JavaScript, sin dependencias externas (ideal para proyectos ligeros y rápidos).

### 1. Captcha Matemático Dinámico
Cada vez que la página se carga, el script genera dos números aleatorios. El usuario debe resolver la suma para que el formulario sea procesado. Esto evita que bots básicos realicen envíos masivos.

### 2. Honeypot (Trampa de Miel)
Se incluye un campo de entrada oculto para los humanos. Los bots automatizados suelen llenar todos los campos de un formulario; si este campo oculto recibe cualquier tipo de dato, el script bloquea el envío automáticamente.

## Cómo usar este formulario

El formulario está configurado actualmente como una **maqueta funcional**. Para recibir correos reales, puedes integrar servicios gratuitos como [Formspree](https://formspree.io/) o [EmailJS](https://www.emailjs.com/).


**Estado del Proyecto:** Completado - Fase de proyecto