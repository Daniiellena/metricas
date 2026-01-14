// URL del backend que gestiona pedidos y estados (Google Apps Script)
const API_URL = "https://script.google.com/macros/s/AKfycbw7Btfi3DOjpLydESbTeRYGziTH1iuGaO1xKOJjVftPY4QgfOOgDsHshJ-oy6icWCZa/exec";

// Verificación de sesión al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Obtiene la sesión almacenada
    const session = JSON.parse(localStorage.getItem('usuario'));
    
    // Redirige si no hay sesión o no es administrador
    if (!session || session.rol !== 'admin') {
        window.location.href = "login.html";
        return;
    }

    // Muestra el nombre del administrador
    document.getElementById('adminName').textContent = `Admin: ${session.nombre}`;

    // Carga los datos del dashboard
    cargarDashboard();
});

// Carga métricas y listado de pedidos
async function cargarDashboard() {
    const tabla = document.getElementById('tablaPedidos');
    
    try {
        // Consulta al backend los datos del panel administrativo
        const response = await fetch(`${API_URL}?action=getAdminDashboard`);
        const data = await response.json();

        if (data.status === "success") {
            // Muestra métricas generales
            document.getElementById('totalVentas').textContent = `$${data.totalVentas}`;
            document.getElementById('pedidosPendientes').textContent = data.pendientes;

            // Limpia la tabla antes de renderizar
            tabla.innerHTML = '';

            // Renderiza cada pedido en la tabla (Incluye el fragmento del botón eliminar)
            data.pedidos.forEach(p => {
                tabla.innerHTML += `
                    <tr>
                        <td class="fw-bold">#${p.id}</td>
                        <td><small>${p.email}</small></td>
                        <td class="fw-bold text-teal">${p.total}</td>
                        <td>
                            <select 
                                class="form-select form-select-sm ${getBadgeColor(p.estado)}"
                                data-prev="${p.estado}"
                                onchange="cambiarEstado('${p.id}', this.value, this)">
                                <option value="Pendiente" ${p.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                                <option value="Enviado" ${p.estado === 'Enviado' ? 'selected' : ''}>Enviado</option>
                                <option value="Entregado" ${p.estado === 'Entregado' ? 'selected' : ''}>Entregado</option>
                                <option value="Cancelado" ${p.estado === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                            </select>
                        </td>
                        <td>
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm btn-outline-success border-0" onclick="notificarWhatsApp('${p.id}', '${p.email}', '${p.estado}')">
                                    <i class="fab fa-whatsapp"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger border-0" onclick="eliminarPedido('${p.id}', this)">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });
        }
    } catch (error) {
        // Mensaje de error en caso de falla de carga
        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-danger">
                    Error al cargar datos
                </td>
            </tr>`;
    }
}

// Devuelve clases CSS según el estado del pedido
function getBadgeColor(estado) {
    switch(estado) {
        case "Enviado": return "bg-info text-white";
        case "Entregado": return "bg-success text-white";
        case "Cancelado": return "bg-danger text-white";
        default: return "bg-warning text-dark";
    }
}

// Actualiza el estado del pedido sin recargar la página
async function cambiarEstado(id, nuevoEstado, selectElement) {
    if (!nuevoEstado) return;

    const claseOriginal = selectElement.className;
    const valorOriginal = selectElement.dataset.prev || "Pendiente";

    selectElement.className = `form-select form-select-sm ${getBadgeColor(nuevoEstado)}`;

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: "actualizarEstado",
                id: id,
                estado: nuevoEstado
            })
        });
        
        const result = await res.json();

        if (result.status === "success") {
            selectElement.dataset.prev = nuevoEstado;
            console.log(`Pedido ${id} actualizado`);
        } else {
            throw new Error("Actualización fallida");
        }
        
    } catch (e) {
        console.error("Error de sincronización:", e);
        selectElement.className = claseOriginal;
        selectElement.value = valorOriginal;
    }
}

// Envía notificación por WhatsApp
function notificarWhatsApp(id, email, estado) {
    let mensaje = "";
    if (estado === "Enviado") {
        mensaje = `¡Hola! Tu pedido *#${id}* de Wood & Ensamble ha sido enviado.`;
    } else if (estado === "Entregado") {
        mensaje = `¡Hola! Tu pedido *#${id}* ya fue entregado. ¡Gracias!`;
    } else {
        mensaje = `Hola, te escribimos por tu pedido *#${id}* (${estado}).`;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, '_blank');
}

// Función para eliminar pedido (Fragmento añadido)
async function eliminarPedido(id, boton) {
    if (!confirm(`¿Estás seguro de eliminar el pedido #${id}?`)) return;

    boton.disabled = true;
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ action: "eliminarPedido", id: id })
        });
        const result = await res.json();
        if (result.status === "success") {
            boton.closest('tr').remove(); // Borra la fila de la vista de inmediato
        } else {
            alert("No se pudo eliminar de la base de datos");
            boton.disabled = false;
        }
    } catch (e) {
        alert("Error al eliminar");
        boton.disabled = false;
    }
}

// Cierra sesión del administrador
function logoutAdmin() {
    localStorage.removeItem('usuario');
    window.location.href = "login.html";
}
