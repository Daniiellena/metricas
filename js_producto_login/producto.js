// Base de datos local de productos
const productos = [
    // HOGAR / SALA
    { id: 1, nombre: "Sofá Modular", cat: "hogar", precio: 850, desc: "Sofá de 3 piezas con tela anti-manchas.", descue: true, img: "Images_catalogo/1_sala.png" },
    { id: 2, nombre: "Mesa de Centro Roble", cat: "hogar", precio: 120, desc: "Mesa sólida con acabado natural.", descue: false, img: "Images_catalogo/2_mesa.png" },
   
    // OFICINA
    { id: 6, nombre: "Escritorio Ejecutivo L", cat: "oficina", precio: 380, desc: "Amplio espacio de trabajo con cajonera.", descue: true, img: "Images_catalogo/6_escritorio ejecutivo.png" },
    { id: 7, nombre: "Silla Ergonómica Pro", cat: "oficina", precio: 210, desc: "Soporte lumbar ajustable y malla transpirable.", descue: true, img: "Images_catalogo/7_silla ergonomica pro.png" },
  
    // DORMITORIO
    { id: 11, nombre: "Cama King Size Wood", cat: "dormitorio", precio: 950, desc: "Estructura reforzada sin ruidos.", descue: true, img: "Images_catalogo/11_cama king saze wood.png" },
    { id: 12, nombre: "Velador Moderno", cat: "dormitorio", precio: 85, desc: "Un cajón con sistema de cierre lento.", descue: false, img: "Images_catalogo/12_velador moderno.png" },

    // CLOSETS
    { id: 16, nombre: "Closet Empotrado Full", cat: "closets", precio: 1200, desc: "Diseño de pared a pared con zapatera.", descue: true, img: "Images_catalogo/16_closet empotrado full.png" },
    { id: 17, nombre: "Walk-in Closet Luxury", cat: "closets", precio: 2500, desc: "Isla central y luces LED integradas.", descue: false, img: "Images_catalogo/17_Walk-in Closet Luxury.png" },
];

/* Filtra los productos SOLAMENTE por categoría */
function filterProducts() {
    const category = document.getElementById('filterCategory').value;
    let filtered = [...productos];

    if (category !== 'all') {
        filtered = filtered.filter(p => p.cat === category);
    }

    displayProducts(filtered); 
}

/* Muestra los productos agrupados por categoría (Limitado a 2 por categoría) */
function displayProducts(items) {
    const container = document.getElementById('productSectionsContainer');
    if(!container) return;
    container.innerHTML = '';

    const categorias = [...new Set(items.map(p => p.cat))];

    categorias.forEach(cat => {
        // Obtenemos los productos de la categoría y limitamos a los primeros 2
        const pCat = items.filter(p => p.cat === cat).slice(0, 2);

        const section = document.createElement('section');
        section.className = 'mb-5 animate-up';
        section.innerHTML = `
            <div class="category-separator mb-4">
                <h3 class="text-uppercase fw-bold m-0">${cat}</h3>
                <div class="category-line ms-3"></div>
            </div>
            <div class="row g-4">
                ${pCat.map(p => `
                    <div class="col-md-6">
                        <div class="card h-100 border-0 shadow-sm product-card" onclick="openProductModal(${p.id})">
                            <div class="position-relative overflow-hidden" style="height:250px;">
                                ${p.descue ? '<span class="badge-discount position-absolute top-0 start-0 m-3 rounded-pill">OFERTA</span>' : ''}
                                <img src="${p.img}" class="card-img-top h-100 w-100 object-fit-cover">
                            </div>
                            <div class="card-body text-center">
                                <h6 class="fw-bold mb-1">${p.nombre}</h6>
                                <h5 class="text-teal fw-bold">$${p.precio}</h5>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>`;
        container.appendChild(section);
    });
}

/* Abre el modal del producto seleccionado */
function openProductModal(id) {
    const p = productos.find(x => x.id === id);
    if(!p) return;
    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalTitle').innerText = p.nombre;
    document.getElementById('modalPrice').innerText = `$${p.precio}`;
    document.getElementById('modalDesc').innerText = p.desc;
    document.querySelector('.btn-add-cart-modal').onclick = () => addToCart(p.id);
    new bootstrap.Modal(document.getElementById('productModal')).show();
}

/* Agrega un producto al carrito */
function addToCart(id) {
    const p = productos.find(x => x.id === id);
    let carritoTemporal = JSON.parse(localStorage.getItem('carrito_wood')) || [];
    
    const existe = carritoTemporal.find(item => item.id === p.id);

    if (existe) {
        existe.cantidad += 1;
    } else {
        carritoTemporal.push({ ...p, cantidad: 1 });
    }
    
    localStorage.setItem('carrito_wood', JSON.stringify(carritoTemporal));
    window.carrito = carritoTemporal;

    if (typeof actualizarContadorIcono === 'function') {
        actualizarContadorIcono();
    }
    
    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    if(modalInstance) modalInstance.hide();
}

/* Inicialización: Solo escucha el cambio de categoría */
if (document.getElementById('filterCategory')) {
    document.getElementById('filterCategory').addEventListener('change', filterProducts);
    displayProducts(productos);
}

document.addEventListener('DOMContentLoaded', () => {
    // Verificación de sesión si es necesario
    const session = JSON.parse(localStorage.getItem('usuario'));
});