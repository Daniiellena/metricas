// Configuración global del carrito y servicios externos
window.carrito = JSON.parse(localStorage.getItem('carrito_wood')) || [];
const WHATSAPP_NUMBER = "593999999999";
const API_URL = "https://script.google.com/macros/s/AKfycbw7Btfi3DOjpLydESbTeRYGziTH1iuGaO1xKOJjVftPY4QgfOOgDsHshJ-oy6icWCZa/exec";

/* Renderiza los productos almacenados en el carrito */
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

/* Reduce cantidad o elimina un producto del carrito */
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

/* Lógica para apertura del modal de pedido */
function openOrderModal() {
    if (window.carrito.length === 0) return alert("El carrito está vacío.");

    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(b => b.remove());
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '0px';

    const form = document.getElementById('cardForm');
    const successDiv = document.getElementById('paymentSuccess');
    
    if(form) form.classList.remove('d-none');
    if(successDiv) successDiv.classList.add('d-none');
    if(form) form.reset();

    const modalElement = document.getElementById('cardModal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (!modalInstance) {
        modalInstance = new bootstrap.Modal(modalElement);
    }
    modalInstance.show();
}

// Maneja el envío del pedido y registro en Google Sheets
document.getElementById('cardForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>REGISTRANDO...`;

    const orderId = "PED-" + (Math.floor(Math.random() * 900000) + 100000);
    const fecha = new Date().toLocaleString();
    const total = document.getElementById('summary-total').innerText;
    const user = JSON.parse(localStorage.getItem('usuario')) || { email: "invitado@mail.com" };

    const clienteData = {
        nombre: document.getElementById('custName').value,
        telefono: document.getElementById('custPhone').value,
        ciudad: document.getElementById('custCity').value,
        direccion: document.getElementById('custAddress').value
    };

    const pedidoData = {
        action: "crearPedido",
        id: orderId,
        email: user.email,
        productos: window.carrito.map(p => `${p.nombre} (x${p.cantidad || 1})`).join(" | "),
        total: total,
        direccion: `${clienteData.direccion}, ${clienteData.ciudad} (Telf: ${clienteData.telefono})`
    };

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(pedidoData)
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "success") {
            let productosLista = '<ul class="list-unstyled">';
            window.carrito.forEach(p => {
                productosLista += `<li>• ${p.nombre} (x${p.cantidad || 1}) - $${(p.precio * (p.cantidad || 1)).toFixed(2)}</li>`;
            });
            productosLista += '</ul>';

            document.getElementById('receiptDetails').innerHTML = `
                <strong>Orden:</strong> #${orderId}<br>
                <strong>Cliente:</strong> ${clienteData.nombre}<br>
                <strong>Envío:</strong> ${clienteData.direccion}, ${clienteData.ciudad}<br>
                <strong>Fecha:</strong> ${fecha}<br><br>
                <strong>Detalle:</strong><br> ${productosLista}
                <hr>
                <strong>Total a Pagar:</strong> ${total}
            `;

            document.getElementById('cardForm').classList.add('d-none');
            document.getElementById('paymentSuccess').classList.remove('d-none');

            localStorage.removeItem('carrito_wood');
            window.carrito = [];
            renderCart();
            actualizarContadorIcono();
        } else {
            throw new Error(data.message);
        }
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Hubo un problema al registrar su pedido.");
        btn.disabled = false;
        btn.innerHTML = originalText;
    });
});

/* Funciones auxiliares */
function payWhatsApp() {
    if (window.carrito.length === 0) return alert("Carrito vacío");
    let msg = "¡Hola Wood & Ensamble! 👋 Quiero realizar este pedido:%0A";
    window.carrito.forEach(p => {
        msg += `- ${p.nombre} (x${p.cantidad || 1})%0A`;
    });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

function toggleTransferDetails() {
    const div = document.getElementById('transfer-details');
    if (!div) return;
    div.classList.toggle('d-none');
}

function sendReceipt() {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
}

function actualizarContadorIcono() {
    const items = JSON.parse(localStorage.getItem('carrito_wood')) || [];
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.innerText = items.reduce((t, p) => t + (p.cantidad || 1), 0);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    actualizarContadorIcono();
});
