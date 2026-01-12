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
    * **carrito.js**: Gestión del estado del carrito, persistencia en LocalStorage, validación de datos de envío y motor de facturación en PDF.
    * **producto.js**: Base de datos de productos (formato JSON), lógica de renderizado y filtros dinámicos.
* **Images / Images_catalogo**: Repositorios de recursos visuales del sitio.

## Tecnologías Utilizadas
* **HTML5 y CSS3**: Estructura semántica y diseño visual avanzado.
* **Bootstrap 5.3**: Framework para diseño responsivo y componentes de interfaz.
* **JavaScript (Vanilla)**: Manipulación del DOM, gestión de estado y validaciones lógicas.
* **jsPDF 2.5.1**: Librería para la generación y exportación de documentos PDF en el lado del cliente.
* **FontAwesome 6.0**: Biblioteca de tipografía para elementos de navegación.
* **LocalStorage API**: Persistencia de datos del carrito de compras entre sesiones.

## Implementaciones Técnicas Destacadas

### Sistema de E-commerce y Facturación
El sistema de compras ha sido diseñado para imitar el comportamiento de una tienda de alto nivel:

1. **Captura de Datos Logísticos**: A diferencia de carritos simples, este sistema integra un formulario de "Datos de Entrega" que valida Nombre, Teléfono, Ciudad y Dirección antes de permitir el pago.
2. **Simulación de Pasarela de Pago**: Implementa una función asíncrona que emula la comunicación con un servidor bancario mediante un spinner de carga y retardos programados, mejorando la percepción de seguridad del usuario.
3. **Motor de Facturación Automática**: Tras la confirmación del pago, el sistema activa la librería jsPDF para construir un documento digital que incluye:
    * Encabezado corporativo con colores institucionales.
    * Número de orden generado dinámicamente.
    * Bloque de información del cliente y destino de envío.
    * Tabla detallada de productos con cálculo de subtotales.
    * Total final y pie de página legal.

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
3. Asegurar conexión a internet para la carga de los CDNs de Bootstrap y jsPDF.

## Notas de Desarrollo
* **Seguridad**: El módulo de tarjeta de crédito es estrictamente educativo y de demostración; no procesa ni almacena información financiera real.
* **Compatibilidad**: Probado en navegadores basados en Chromium (Chrome, Edge) y Firefox.
* **Derechos**: Los activos visuales y la estructura de marca son propiedad exclusiva de Wood & Ensamble Designs.

---
**Estado del Proyecto:** Completado - Fase de Integración de Pagos, Gestión de Envíos y Generación de Facturación PDF Finalizada.