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

/* FUNCIONALIDADES DE CONTACTO Y PAGO */

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