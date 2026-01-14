# Wood & Ensamble Designs - Documentación Integral del Proyecto

Este repositorio contiene el desarrollo del ecosistema web para Wood & Ensamble Designs, especializada en mobiliario a medida en Quito, Ecuador. El proyecto ha evolucionado de una maqueta frontend a una aplicación web conectada a la nube (Serverless) con un enfoque robusto en QualityOps y análisis estático de código.

## Estructura del Proyecto (version2)

La arquitectura se encuentra organizada en el directorio raíz y la subcarpeta version2, incluyendo módulos de autenticación y un panel administrativo avanzado:

### Archivos de Interfaz
* index.html: Landing page principal con secciones de categorías y servicios.
* productos.html: Catálogo interactivo con sistema de filtrado y carrito.
* carrito.html: Interfaz de checkout con formulario de entrega y registro.
* mis_pedidos.html: Panel de consulta para que el cliente rastree su historial de compras.
* admin_dashboard.html: Panel privado para la gestión administrativa de pedidos.
* login.html / registro.html: Interfaz de acceso y creación de cuentas de usuario.
* contacto.html: Sección de comunicación y geolocalización.
* politicas.html: Documentación legal y términos de servicio.

### Lógica de Negocio y Estilos (version2/js y version2/css)
* auth.js: Gestión de sesiones de usuario (Login/Registro) y persistencia.
* carrito.js: Lógica del carrito, cálculo de totales y sincronización de pedidos.
* pedidos.js: Controlador del historial de pedidos del cliente.
* admin.js: Motor del Panel Administrativo (Métricas, Cambio de Estados, WhatsApp).
* producto.js: Base de datos de inventario y renderizado dinámico.

## Tecnologías e Integraciones
* Frontend: HTML5, CSS3, JavaScript (Vanilla) y Bootstrap 5.3.
* Backend (Serverless): Google Apps Script (GAS) actuando como API REST.
* Base de Datos: Google Sheets para el almacenamiento persistente de pedidos.
* CI/CD: GitHub Actions para la automatización de pruebas de calidad.
* Análisis Estático: SonarCloud para la medición de deuda técnica y mantenibilidad.

## Implementaciones Técnicas y Calidad (QualityOps)

### 1. Análisis de Calidad Continuo
Se ha implementado un Pipeline de integración continua que evalúa el código en cada actualización:
* Mantenibilidad: Medición de Code Smells y Deuda Técnica mediante SonarCloud.
* Fiabilidad: Detección automática de Bugs en scripts de integración.
* Complejidad Cognitiva: Monitoreo de la lógica de JavaScript para asegurar un código limpio.

### 2. Sistema de Gestión de Pedidos (Cloud-Sync)
Sincronización asíncrona con Google Sheets que permite:
* Generación de IDs únicos de orden (PED-XXXXXX).
* Registro de datos logísticos completos.
* Control de estados en tiempo real (Pendiente, Enviado, Entregado, Cancelado).

### 3. Seguridad y Protección de Datos
* Doble capa de validación en formularios.
* Captcha Matemático Dinámico: Generación de desafíos aleatorios para mitigar bots.
* Sistema Honeypot: Campo señuelo para la detección de envíos automatizados no deseados.

## Enfoque de Calidad ISO/IEC 25010
El proyecto se rige por métricas específicas de la norma internacional:
* Adecuación Funcional: Verificada mediante 11 casos de prueba cubriendo el flujo completo de venta.
* Eficiencia de Desempeño: Evaluada con Google Lighthouse (Meta >= 80).
* Seguridad: Validación de integridad de datos en procesos de Login y Checkout.

## Instrucciones para Ejecución y Análisis
1. Clonar el repositorio: git clone https://github.com/Daniellena/metricas.git
2. Abrir el proyecto con Live Server en VS Code.
3. Para ver las métricas de calidad, acceder al panel de SonarCloud vinculado a este repositorio.

## Estado de Integración Continua
El flujo de trabajo automatizado se encuentra configurado en .github/workflows/build.yml, asegurando que cualquier cambio en la carpeta version2 sea analizado antes de su despliegue.

Estado del Proyecto: Completado - Fase de Pruebas y Aseguramiento de Calidad.
