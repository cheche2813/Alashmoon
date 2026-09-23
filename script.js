// --- PRECARGADOR DINÁMICO CON JS ---
window.addEventListener('DOMContentLoaded', () => {
    const progressFill = document.querySelector('.progress-fill');
    const loaderText = document.getElementById('loader-text');
    const preloader = document.getElementById('preloader');

    const steps = [
        { progress: "25%", text: "Iniciando sistema Alashmoon S.A.S...." },
        { progress: "50%", text: "Seleccionando detalles artesanales y flores eternas..." },
        { progress: "75%", text: "Sincronizando plataforma web con tecnología ADSO..." },
        { progress: "100%", text: "¡Transformación completa! Bienvenido al arte digital." }
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            progressFill.style.width = steps[currentStep].progress;
            loaderText.textContent = steps[currentStep].text;
            currentStep++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 500);
        }
    }, 450);
});

// --- NÚMEROS OFICIALES DE WHATSAPP ---
const numerosWhatsApp = ["573160512872", "573153767043"];
let indiceNumeroActual = 0;

function obtenerNumeroWhatsApp() {
    const numero = numerosWhatsApp[indiceNumeroActual];
    indiceNumeroActual = (indiceNumeroActual + 1) % numerosWhatsApp.length;
    return numero;
}

// --- LÓGICA DEL CARRITO DE COMPRAS ---
let carrito = [];

function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarritoUI();
    
    // Feedback visual rápido
    alert(`¡"${nombre}" fue agregado al carrito con éxito!`);
}

function cambiarCantidad(nombre, cambio) {
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(item => item.nombre !== nombre);
        }
    }
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    // Actualizar contador superior
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;

    // Renderizar productos en el modal
    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-text">Tu carrito está vacío.</p>';
        cartTotalPrice.textContent = '$0 COP';
        return;
    }

    let html = '';
    let totalPrecio = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalPrecio += subtotal;
        html += `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <span>$${item.precio.toLocaleString()} c/u</span>
                </div>
                <div class="cart-item-actions">
                    <button onclick="cambiarCantidad('${item.nombre}', -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button onclick="cambiarCantidad('${item.nombre}', 1)">+</button>
                    <button class="btn-remove-item" onclick="cambiarCantidad('${item.nombre}', -${item.cantidad})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    cartTotalPrice.textContent = `$${totalPrecio.toLocaleString()} COP`;
}

function enviarCarritoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega al menos un producto antes de finalizar el pedido.");
        return;
    }

    let detallePedido = "¡Hola! Deseo realizar el siguiente pedido en *Alashmoon S.A.S.*:\n\n";
    let totalGeneral = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;
        detallePedido += `▪️ *${item.nombre}* (Cant: ${item.cantidad}) - Subtotal: $${subtotal.toLocaleString()} COP\n`;
    });

    detallePedido += `\n*Total a Pagar:* $${totalGeneral.toLocaleString()} COP\n¿Me confirman disponibilidad y datos de pago por favor?`;

    const url = `https://wa.me/${obtenerNumeroWhatsApp()}?text=${encodeURIComponent(detallePedido)}`;
    window.open(url, '_blank');
}

// --- REDIRECCIONAMIENTO FORMULARIO INDIVIDUAL ---
function enviarWhatsAppForm() {
    const nombre = document.getElementById('nombre').value.trim();
    const producto = document.getElementById('productoSelect').value;
    const correo = document.getElementById('correo').value.trim();
    const detalles = document.getElementById('mensaje').value.trim();

    if (!nombre || !correo || !detalles) {
        alert("Por favor completa todos los campos del formulario antes de enviar.");
        return;
    }

    const texto = `Hola, mi nombre es *${nombre}*.\nQuiero solicitar: *${producto}*.\nMi correo es: ${correo}\nDetalles adicionales: ${detalles}`;
    const url = `https://wa.me/${obtenerNumeroWhatsApp()}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}

// --- ENVÍO POR CORREO ELECTRÓNICO (MAILTO) ---
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const producto = document.getElementById('productoSelect').value;
        const correo = document.getElementById('correo').value.trim();
        const detalles = document.getElementById('mensaje').value.trim();

        const destinatario = "contacto.alashmoon@gmail.com";
        const asunto = encodeURIComponent(`Nueva Solicitud - ${producto}`);
        const cuerpo = encodeURIComponent(
            `Cliente: ${nombre}\n` +
            `Correo: ${correo}\n` +
            `Producto: ${producto}\n\n` +
            `Especificaciones:\n${detalles}`
        );

        window.location.href = `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;
    });
}