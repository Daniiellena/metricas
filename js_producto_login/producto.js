// Base de datos local de productos
const productos = [
    // HOGAR / SALA
    { id: 1, nombre: "Sofá Modular", cat: "hogar", precio: 850, desc: "Sofá de 3 piezas con tela anti-manchas.", descue: true, img: "Images_catalogo/1_sala.png" },
    { id: 2, nombre: "Mesa de Centro Roble", cat: "hogar", precio: 120, desc: "Mesa sólida con acabado natural.", descue: false, img: "Images_catalogo/2_mesa.png" },
    { id: 3, nombre: "Centro de TV Nórdico", cat: "hogar", precio: 450, desc: "Espacio para TV de hasta 65 pulgadas.", descue: true, img: "Images_catalogo/3_centro tv nordico.png" },
    { id: 4, nombre: "Repisa Flotante Minimal", cat: "hogar", precio: 45, desc: "Set de 3 repisas invisibles.", descue: false, img: "Images_catalogo/4_repisas invisible.png" },
    { id: 5, nombre: "Sillón Orejero Azul", cat: "hogar", precio: 320, desc: "Clásico sillón de lectura muy cómodo.", descue: false, img: "Images_catalogo/5_sillon azul lectura.png" },

    // OFICINA
    { id: 6, nombre: "Escritorio Ejecutivo L", cat: "oficina", precio: 380, desc: "Amplio espacio de trabajo con cajonera.", descue: true, img: "Images_catalogo/6_escritorio ejecutivo.png" },
    { id: 7, nombre: "Silla Ergonómica Pro", cat: "oficina", precio: 210, desc: "Soporte lumbar ajustable y malla transpirable.", descue: true, img: "Images_catalogo/7_silla ergonomica pro.png" },
    { id: 8, nombre: "Librero Industrial", cat: "oficina", precio: 290, desc: "Madera y metal, estilo vintage.", descue: false, img: "Images_catalogo/8_librero industrial.png" },
    { id: 9, nombre: "Mesa de Reuniones", cat: "oficina", precio: 550, desc: "Capacidad para 6 personas, madera sólida.", descue: false, img: "Images_catalogo/9_mesa reuniones.png" },
    { id: 10, nombre: "Organizador de Pared", cat: "oficina", precio: 65, desc: "Panel perforado para herramientas de oficina.", descue: false, img: "Images_catalogo/10_organizador de pared.png" },

    // DORMITORIO
    { id: 11, nombre: "Cama King Size Wood", cat: "dormitorio", precio: 950, desc: "Estructura reforzada sin ruidos.", descue: true, img: "Images_catalogo/11_cama king saze wood.png" },
    { id: 12, nombre: "Velador Moderno", cat: "dormitorio", precio: 85, desc: "Un cajón con sistema de cierre lento.", descue: false, img: "Images_catalogo/12_velador moderno.png" },
    { id: 13, nombre: "Cómoda de 6 Cajones", cat: "dormitorio", precio: 420, desc: "Gran capacidad de almacenamiento.", descue: false, img: "Images_catalogo/13_comoda de 6 cajones.png" },
    { id: 14, nombre: "Espejo de Cuerpo Entero", cat: "dormitorio", precio: 150, desc: "Marco de madera tallada a mano.", descue: true, img: "Images_catalogo/14_espejo de cuerpoe entero.png" },
    { id: 15, nombre: "Banqueta Pie de Cama", cat: "dormitorio", precio: 110, desc: "Tapizada en lino gris.", descue: false, img: "Images_catalogo/15_baqueta pie de cama.png" },

    // CLOSETS
    { id: 16, nombre: "Closet Empotrado Full", cat: "closets", precio: 1200, desc: "Diseño de pared a pared con zapatera.", descue: true, img: "Images_catalogo/16_closet empotrado full.png" },
    { id: 17, nombre: "Walk-in Closet Luxury", cat: "closets", precio: 2500, desc: "Isla central y luces LED integradas.", descue: false, img: "Images_catalogo/17_Walk-in Closet Luxury.png" },
    { id: 18, nombre: "Armario Juvenil", cat: "closets", precio: 680, desc: "Compacto y funcional para niños.", descue: true, img: "Images_catalogo/18_armario juvenil.png" },
    { id: 19, nombre: "Organizador de Melamina", cat: "closets", precio: 340, desc: "Módulos ajustables según tu necesidad.", descue: false, img: "Images_catalogo/19_organizador de melanina.png" },
    { id: 20, nombre: "Closet de Pasillo", cat: "closets", precio: 450, desc: "Puertas corredizas para ahorrar espacio.", descue: false, img: "Images_catalogo/20_closet de pasillo.png" }
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