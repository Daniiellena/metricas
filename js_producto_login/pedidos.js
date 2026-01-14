// URL del backend (Google Apps Script) utilizada para consultar pedidos
const API_URL = "https://script.google.com/macros/s/AKfycbw7Btfi3DOjpLydESbTeRYGziTH1iuGaO1xKOJjVftPY4QgfOOgDsHshJ-oy6icWCZa/exec";

// Ejecuta la carga del historial cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', () => {
    cargarHistorialPedidos();
});

// Obtiene y muestra el historial de pedidos del usuario
async function cargarHistorialPedidos() {
    const spinner = document.getElementById('loading-spinner');
    const tableContainer = document.getElementById('table-container');
    const noPedidos = document.getElementById('no-pedidos');
    const tbody = document.getElementById('pedidos-body');

    const usuarioJson = localStorage.getItem('usuario');
    if (!usuarioJson) {
        spinner.classList.add('d-none');
        noPedidos.classList.remove('d-none');
        return;
    }

    const usuario = JSON.parse(usuarioJson);
    const emailCliente = usuario.email;

    try {
        const response = await fetch(`${API_URL}?action=getPedidos&email=${emailCliente}`);
        const data = await response.json();

        spinner.classList.add('d-none');

        if (data.status === "success" && data.pedidos.length > 0) {
            tableContainer.classList.remove('d-none');
            tbody.innerHTML = '';

            data.pedidos.forEach(p => {
                let badgeClass = "bg-warning text-dark";
                if (p.estado === "Enviado") badgeClass = "bg-info text-white";
                if (p.estado === "Entregado") badgeClass = "bg-success text-white";
                // Añadimos color para cancelados por si acaso
                if (p.estado === "Cancelado") badgeClass = "bg-danger text-white";
                
                const mensajeWA = encodeURIComponent(
                    `¡Hola Wood & Ensamble!  Necesito información sobre mi pedido:\n\n` +
                    ` *Orden:* #${p.id}\n` +
                    ` *Productos:* ${p.productos}\n` +
                    ` *Total:* ${p.total}\n` +
                    ` *Estado:* ${p.estado}`
                );

                const whatsappUrl = `https://wa.me/593999999999?text=${mensajeWA}`;

                // --- MODIFICACIÓN AQUÍ: Botón de eliminar condicionado ---
                const botonEliminar = (p.estado === "Pendiente" || p.estado === "Cancelado") 
                    ? `<button class="btn btn-sm btn-outline-danger border-0 ms-2" onclick="eliminarPedidoCliente('${p.id}', this)">
                        <i class="fas fa-trash"></i>
                       </button>` 
                    : '';

                tbody.innerHTML += `
                    <tr>
                        <td><span class="fw-bold">#${p.id}</span></td>
                        <td><small>${p.productos}</small></td>
                        <td class="fw-bold text-teal">${p.total}</td>
                        <td><span class="badge ${badgeClass}">${p.estado}</span></td>
                        <td class="text-end">
                            <div class="d-flex justify-content-end align-items-center">
                                <a href="${whatsappUrl}" target="_blank" class="btn btn-sm btn-success rounded-pill px-3">
                                    <i class="fab fa-whatsapp me-1"></i> Consultar
                                </a>
                                ${botonEliminar}
                            </div>
                        </td>
                    </tr>
                `;
            });
        } else {
            noPedidos.classList.remove('d-none');
        }
    } catch (error) {
        spinner.classList.add('d-none');
        alert("Error al obtener datos.");
    }
}

// --- NUEVA FUNCIÓN: Eliminar pedido desde la vista del cliente ---
async function eliminarPedidoCliente(id, boton) {
    if (!confirm(`¿Estás seguro de que deseas eliminar el registro del pedido #${id}?`)) return;

    boton.disabled = true;
    const iconoOriginal = boton.innerHTML;
    boton.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ action: "eliminarPedido", id: id })
        });
        const result = await res.json();

        if (result.status === "success") {
            const fila = boton.closest('tr');
            fila.style.transition = "0.3s";
            fila.style.opacity = "0";
            setTimeout(() => fila.remove(), 300);
        } else {
            alert("No se pudo eliminar el pedido.");
            boton.disabled = false;
            boton.innerHTML = iconoOriginal;
        }
    } catch (e) {
        alert("Error de conexión al eliminar.");
        boton.disabled = false;
        boton.innerHTML = iconoOriginal;
    }
}
