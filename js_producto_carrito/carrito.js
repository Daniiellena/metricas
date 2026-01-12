// Configuración global 
window.carrito = JSON.parse(localStorage.getItem('carrito_wood')) || [];
const WHATSAPP_NUMBER = "593999999999"; 

/* Renderiza los productos en la vista del carrito */
function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('summary-total');
    
    if (!container || !totalEl) return; 

    container.innerHTML = '';

    if (window.carrito.length === 0) {
        container.innerHTML = `<div class="text-center py-5"><p class="text-muted">No hay productos seleccionados.</p></div>`;
        totalEl.innerText = "$0.00";
        return;
    }

    let totalGeneral = 0;
    
    window.carrito.forEach((p, index) => {
        const subtotalProducto = p.precio * (p.cantidad || 1);
        totalGeneral += subtotalProducto;

        container.innerHTML += `
            <div class="cart-item animate-up">
                <img src="${p.img}" class="cart-item-img">
                <div class="cart-item-info">
                    <h6 class="fw-bold mb-0">${p.nombre}</h6>
                    <small class="text-muted">Cantidad: ${p.cantidad || 1}</small><br>
                    <span class="text-teal fw-bold">$${p.precio} c/u</span>
                </div>
                <div class="ms-auto me-3 text-end">
                    <span class="fw-bold">$${subtotalProducto.toFixed(2)}</span>
                </div>
                <button class="btn-remove" onclick="removeItem(${index})"><i class="fas fa-trash"></i></button>
            </div>`;
    });

    totalEl.innerText = `$${totalGeneral.toFixed(2)}`;
}

/* Elimina un producto o reduce su cantidad */
function removeItem(i) {
    if (window.carrito[i].cantidad > 1) {
        window.carrito[i].cantidad -= 1;
    } else {
        window.carrito.splice(i, 1);
    }
    
    localStorage.setItem('carrito_wood', JSON.stringify(window.carrito));
    renderCart();
    actualizarContadorIcono();
}

/* Vacía completamente el carrito */
function clearCart() {
    if(confirm("¿Deseas vaciar el carrito?")) {
        localStorage.removeItem('carrito_wood');
        window.carrito = [];
        renderCart();
        actualizarContadorIcono();
    }
}

/* ==========================================
   LÓGICA DE PAGO CON TARJETA (NUEVA)
   ========================================== */

// Abre el modal de tarjeta
function openCardModal() {
    if (window.carrito.length === 0) return alert("El carrito está vacío.");
    
    const form = document.getElementById('cardForm');
    const successDiv = document.getElementById('paymentSuccess');
    if(form) form.classList.remove('d-none');
    if(successDiv) successDiv.classList.add('d-none');
    if(form) form.reset();
    
    const modal = new bootstrap.Modal(document.getElementById('cardModal'));
    modal.show();
}

// Maneja el envío del formulario de tarjeta
document.getElementById('cardForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = this.querySelector('button');
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>PROCESANDO...`;

    setTimeout(() => {
        const orderId = Math.floor(Math.random() * 900000) + 100000;
        const fecha = new Date().toLocaleString();
        const total = document.getElementById('summary-total').innerText;

        // CAPTURA DE DATOS DE ENVÍO Y CLIENTE
        const clienteData = {
            nombre: document.getElementById('custName').value,
            telefono: document.getElementById('custPhone').value,
            ciudad: document.getElementById('custCity').value,
            direccion: document.getElementById('custAddress').value
        };
        
        // Crear resumen para la vista de éxito
        let productosLista = '<ul class="list-unstyled">';
        window.carrito.forEach(p => {
            productosLista += `<li>• ${p.nombre} (x${p.cantidad || 1}) - $${(p.precio * (p.cantidad || 1)).toFixed(2)}</li>`;
        });
        productosLista += '</ul>';

        const infoRecibo = `
            <strong>Orden:</strong> #${orderId}<br>
            <strong>Cliente:</strong> ${clienteData.nombre}<br>
            <strong>Envío:</strong> ${clienteData.direccion}, ${clienteData.ciudad}<br>
            <strong>Fecha:</strong> ${fecha}<br><br>
            <strong>Detalle:</strong><br> ${productosLista}
            <hr>
            <strong>Total Pagado:</strong> ${total}
        `;

        document.getElementById('receiptDetails').innerHTML = infoRecibo;
        document.getElementById('cardForm').classList.add('d-none');
        document.getElementById('paymentSuccess').classList.remove('d-none');
        
        // Guardamos copia con datos del cliente para el PDF
        window.ultimoPedido = {
            id: orderId,
            fecha: fecha,
            total: total,
            cliente: clienteData,
            items: [...window.carrito]
        };

        localStorage.removeItem('carrito_wood');
        window.carrito = [];
        renderCart();
        actualizarContadorIcono();
    }, 2000);
});

// Función para descargar el recibo como PDF profesional
async function downloadReceipt() {
    const pedido = window.ultimoPedido;
    if (!pedido) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Encabezado
    doc.setFillColor(11, 33, 45); 
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("WOOD & ENSAMBLE DESIGNS", 20, 25);
    
    // Info del Pedido (Derecha)
    doc.setTextColor(100);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`No. de Orden: #${pedido.id}`, 145, 55);
    doc.text(`Fecha: ${pedido.fecha}`, 145, 60);

    // DATOS DE ENVÍO
    doc.setTextColor(0, 76, 109); 
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DATOS DE ENTREGA", 20, 55);
    
    doc.setTextColor(0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Cliente: ${pedido.cliente.nombre}`, 20, 62);
    doc.text(`Teléfono: ${pedido.cliente.telefono}`, 20, 67);
    doc.text(`Dirección: ${pedido.cliente.direccion}`, 20, 72);
    doc.text(`Ciudad: ${pedido.cliente.ciudad}`, 20, 77);
    
    // Tabla de productos
    let y = 88;
    doc.setDrawColor(217, 105, 28); 
    doc.setLineWidth(1);
    doc.line(20, y, 190, y);

    y += 10;
    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Producto", 20, y);
    doc.text("Cant.", 120, y);
    doc.text("Subtotal", 160, y);
    
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setLineWidth(0.1);
    doc.setDrawColor(200);

    pedido.items.forEach(p => {
        const cant = p.cantidad || 1;
        const sub = (p.precio * cant).toFixed(2);
        
        doc.text(`${p.nombre}`, 20, y);
        doc.text(`${cant}`, 125, y);
        doc.text(`$${sub}`, 160, y);
        
        doc.line(20, y + 2, 190, y + 2);
        y += 10;
    });

    y += 5;
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(11, 33, 45);
    doc.text(`TOTAL PAGADO: ${pedido.total}`, 135, y);

    // Pie de página
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("Gracias por su compra. Sus muebles están siendo fabricados con los más altos estándares.", 20, y + 25);
    doc.text("Quito, Ecuador - Wood & Ensamble Designs", 20, y + 30);

    doc.save(`Recibo_Wood_${pedido.id}.pdf`);
}

/* OTRAS FUNCIONALIDADES */
function payWhatsApp() {
    if (window.carrito.length === 0) return alert("Carrito vacío");
    let msg = "¡Hola Wood & Ensamble! 👋 Quiero realizar este pedido:%0A";
    window.carrito.forEach(p => {
        const cant = p.cantidad || 1;
        msg += `- ${p.nombre} (x${cant}) : $${(p.precio * cant).toFixed(2)}%0A`;
    });
    msg += `%0A*TOTAL:* ${document.getElementById('summary-total').innerText}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

function toggleTransferDetails() {
    const div = document.getElementById('transfer-details');
    if (!div) return;
    div.classList.toggle('d-none');
    if(!div.classList.contains('d-none')) div.scrollIntoView({ behavior: 'smooth' });
}

function sendReceipt() {
    const msg = encodeURIComponent("¡Hola! Aquí adjunto el comprobante de mi transferencia para el pedido de Wood & Ensamble. ✨");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

function actualizarContadorIcono() {
    const data = localStorage.getItem('carrito_wood');
    const items = data ? JSON.parse(data) : [];
    const contador = document.getElementById('cart-count');
    if (contador) {
        const totalItems = items.reduce((total, p) => total + (p.cantidad || 1), 0);
        contador.innerText = totalItems;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    actualizarContadorIcono();
});