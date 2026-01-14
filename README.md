# Wood & Ensamble Designs - Documentación del Proyecto

Este repositorio contiene el desarrollo integral del ecosistema web para **Wood & Ensamble Designs**, especializada en mobiliario a medida en Quito, Ecuador. El proyecto ha evolucionado de una maqueta frontend a una aplicación web conectada a la nube (Serverless) para la gestión de ventas en tiempo real.

## Estructura Actual del Proyecto

La arquitectura se ha reorganizado para incluir módulos de autenticación y un panel administrativo avanzado:

### Archivos Raíz
* **index.html**: Landing page principal con secciones de categorías y servicios.
* **productos.html**: Catálogo interactivo con sistema de filtrado y carrito.
* **carrito.html**: Interfaz de checkout con formulario de entrega y pasarela de registro.
* **mis_pedidos.html**: Panel de consulta para que el cliente rastree su historial de compras.
* **admin_dashboard.html**: Panel privado para la gestión administrativa de pedidos.
* **login.html / registro.html**: Interfaz de acceso y creación de cuentas de usuario.
* **contacto.html**: Sección de comunicación y geolocalización.
* **politicas.html**: Documentación legal y términos de servicio.

### Directorios de Lógica y Estilos
* **css_producto_carrito/**:
    * `productos.css`: Estilos para el catálogo dinámico.
    * `carrito.css`: Diseño optimizado para el proceso de pago y tablas de historial.
* **js_producto_login/**:
    * `auth.js`: Gestión de sesiones de usuario (Login/Registro) y persistencia.
    * `carrito.js`: Lógica del carrito, cálculo de totales y sincronización de pedidos.
    * `pedidos.js`: Controlador del historial de pedidos del cliente (Consultar/Eliminar).
    * `admin.js`: Motor del Panel Administrativo (Métricas, Cambio de Estados, WhatsApp).
    * `producto.js`: Base de datos de inventario y renderizado dinámico.

## Tecnologías e Integraciones
* **Frontend**: HTML5, CSS3, JavaScript (Vanilla) y Bootstrap 5.3.
* **Backend (Serverless)**: Google Apps Script (GAS) actuando como API REST.
* **Base de Datos**: Google Sheets para el almacenamiento persistente de pedidos y métricas.
* **Comunicación**: Integración directa con la API de WhatsApp para notificaciones automáticas.
* **Seguridad**: Sistema Honeypot y Captcha matemático en formularios de contacto.

## Implementaciones Técnicas Destacadas

### 1. Sistema de Gestión de Pedidos (Cloud-Sync)
El sistema ya no es estático. Ahora, cada compra realizada genera un registro automático en una hoja de cálculo de Google mediante solicitudes `POST` asíncronas, permitiendo:
* Generación de IDs únicos de orden (`PED-XXXXXX`).
* Registro de datos logísticos completos (Nombre, Ciudad, Dirección, Teléfono).

### 2. Panel Administrativo (Dashboard)
Interfaz exclusiva para la empresa que permite:
* **Métricas en Tiempo Real**: Visualización de ventas totales y conteo de pedidos pendientes.
* **Control de Estados**: Actualización dinámica de pedidos (Pendiente, Enviado, Entregado, Cancelado).
* **Acción Rápida**: Botones de contacto directo por WhatsApp con mensajes pre-configurados según el estado del pedido.
* **Limpieza de Base de Datos**: Capacidad de eliminar registros directamente desde la interfaz.

### 3. Historial del Cliente
Los usuarios registrados cuentan con una sección de "Mis Pedidos" donde pueden:
* Consultar el estado de sus compras.
* Eliminar registros de pedidos siempre que estos se encuentren en estado "Pendiente" o "Cancelado".
* Botón de consulta directa para asistencia personalizada.

## Instrucciones para Visualización Local
1. Clonar el repositorio.
2. Abrir con **Live Server** en VS Code (Puerto 5500).
3. **Importante**: El sistema requiere conexión a internet para interactuar con la API de Google Sheets y cargar las fuentes de FontAwesome.

## Notas de Desarrollo
* **Seguridad**: La validación de campos se realiza tanto en el lado del cliente como en la estructura del JSON enviado al servidor.
* **Persistencia**: Se utiliza `LocalStorage` para mantener el carrito activo incluso si el usuario cierra el navegador.
* **Mantenimiento**: Se eliminó el motor de facturación PDF para priorizar la agilidad del sistema y la gestión directa vía WhatsApp/Sheets.

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
