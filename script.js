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
const numerosWhatsApp = ["573160512872"];
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

function agregarPedidoCarrito(nombre, detalle) {
    const productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
        if (detalle) productoExistente.detalle = detalle;
    } else {
        carrito.push({ nombre, detalle: detalle || '', precio: 0, cantidad: 1 });
    }
    actualizarCarritoUI();
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
        const detalleHtml = item.detalle ? `<span class="cart-item-detail">${item.detalle}</span>` : '';
        const precioHtml = item.precio === 0 ? '<span>Precio a cotizar</span>' : `<span>$${item.precio.toLocaleString()} c/u</span>`;
        html += `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    ${detalleHtml}
                    ${precioHtml}
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
    const soloCotizar = carrito.every(item => item.precio === 0);
    cartTotalPrice.textContent = soloCotizar ? 'A cotizar por WhatsApp' : `$${totalPrecio.toLocaleString()} COP`;
}

// --- PEDIDO: DATOS GLOBALES (FECHA, SOLICITANTE, DESTINATARIO) ---
let pedidoGlobal = [];

function abrirModalDatosGlobales(items) {
    if (!items || items.length === 0) return;
    pedidoGlobal = items;

    const resumen = document.getElementById('order-summary');
    resumen.innerHTML = items.map(item =>
        `<div class="order-summary-item">
            <strong>${item.nombre}</strong>
            <span>(Cant: ${item.cantidad})</span>
            ${item.detalle ? `<small>${item.detalle}</small>` : ''}
        </div>`
    ).join('');

    document.getElementById('orderDataForm').reset();
    document.getElementById('globalDedicatoria').checked = false;
    alternarDestinatario();

    document.getElementById('order-data-modal').classList.remove('hidden');
}

function cerrarModalDatosGlobales() {
    document.getElementById('order-data-modal').classList.add('hidden');
}

function alternarDestinatario() {
    const wrap = document.getElementById('globalDestinatarioWrap');
    const input = document.getElementById('globalDestinatario');
    const incluye = document.getElementById('globalDedicatoria').checked;
    wrap.style.display = incluye ? 'block' : 'none';
    if (incluye) {
        input.setAttribute('required', '');
    } else {
        input.removeAttribute('required');
    }
}

function enviarPedidoWhatsApp() {
    const fecha = document.getElementById('globalFecha').value;
    const solicitante = document.getElementById('globalSolicitante').value.trim();
    const incluyeDedicatoria = document.getElementById('globalDedicatoria').checked;
    const destinatario = document.getElementById('globalDestinatario').value.trim();

    if (!fecha) {
        alert("Por favor indica la fecha posible de entrega para tu pedido.");
        return;
    }
    if (!solicitante) {
        alert("Por favor escribe tu nombre (solicitante del pedido).");
        return;
    }
    if (incluyeDedicatoria && !destinatario) {
        alert("Tu pedido incluye dedicatoria, por favor escribe el nombre del destinatario.");
        return;
    }

    let texto = `¡Hola! Mi nombre es *${solicitante}* y deseo realizar el siguiente pedido en *Alashmoon S.A.S.*:\n\n`;
    texto += `📅 *Fecha posible de entrega:* ${fecha}\n`;
    texto += `👤 *Solicitante:* ${solicitante}\n`;
    if (incluyeDedicatoria && destinatario) {
        texto += `🎁 *Dedicado a:* ${destinatario}\n`;
    }

    texto += `\n*Resumen del pedido:*\n`;
    pedidoGlobal.forEach(item => {
        texto += `▪️ *${item.nombre}* (Cant: ${item.cantidad})\n`;
        if (item.detalle) {
            texto += `   └ ${item.detalle}\n`;
        }
    });

    texto += `\n¿Me confirman disponibilidad y datos de pago por favor?`;

    const url = `https://wa.me/${obtenerNumeroWhatsApp()}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
    cerrarModalDatosGlobales();
}

function enviarCarritoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega al menos un producto antes de finalizar el pedido.");
        return;
    }

    const items = carrito.map(item => ({
        nombre: item.nombre,
        detalle: item.detalle || '',
        cantidad: item.cantidad
    }));
    toggleCartModal();
    abrirModalDatosGlobales(items);
}

// =====================================================
// CARRUSEL DE ARRASTRE: RAMOS DE ROSAS ETERNAS
// (jQuery + Hammer.js)
// =====================================================
if (window.jQuery) {
    $(document).ready(function() {
        var $carruselRosas = $(".contenedor-rosas");
        if ($carruselRosas.length > 0) {
            var objectsRosas = $(".contenedor-rosas #items-rosas img");
            var totalRosas = objectsRosas.length - 1;
            var contadorRosas = 0;

            objectsRosas.each(function (index) {
                if (contadorRosas === 0) {
                    $(this).addClass('img-left-rosa');
                } else if (contadorRosas === 1) {
                    $(this).addClass('img-center-rosa');
                } else if (contadorRosas === 2) {
                    $(this).addClass('img-right-rosa');
                }
                contadorRosas++;
            });

            var imagenCentral = 1;

            $("#arrowleft-rosa").on("click", function() {
                objectsRosas.attr('class', 'img-rosa');

                var imagenIzq = (imagenCentral === 0) ? totalRosas : imagenCentral - 1;
                var imagenDer = (imagenIzq === 0) ? totalRosas : imagenIzq - 1;

                $(objectsRosas[imagenCentral]).addClass('anima-right-r-rosa img-right-rosa');
                $(objectsRosas[imagenIzq]).addClass('anima-right-c-rosa img-center-rosa');
                $(objectsRosas[imagenDer]).addClass('anima-right-l-rosa img-left-rosa');

                imagenCentral = (imagenCentral === 0) ? totalRosas : imagenCentral - 1;
            });

            $("#arrowrigth-rosa").on("click", function() {
                objectsRosas.attr('class', 'img-rosa');

                var imagenDer = (imagenCentral === totalRosas) ? 0 : imagenCentral + 1;
                var imagenIzq = (imagenDer === totalRosas) ? 0 : imagenDer + 1;

                $(objectsRosas[imagenCentral]).addClass('anima-left-l-rosa img-left-rosa');
                $(objectsRosas[imagenIzq]).addClass('anima-left-r-rosa img-right-rosa');
                $(objectsRosas[imagenDer]).addClass('anima-left-c-rosa img-center-rosa');

                imagenCentral = (imagenCentral === totalRosas) ? 0 : imagenCentral + 1;
            });

            if (window.Hammer) {
                var elementoRosas = document.getElementsByClassName('contenedor-rosas')[0];
                var swiperRosas = new Hammer(elementoRosas);
                swiperRosas.on("swipeleft", function() {
                    $("#arrowrigth-rosa").trigger("click");
                });
                swiperRosas.on("swiperight", function() {
                    $("#arrowleft-rosa").trigger("click");
                });
            }
        }
    });
}

// =====================================================
// CARRUSEL DE TARJETAS APILADAS: POEMAS
// =====================================================
let poemaCurrentStep = 1;
let poemaTouchStartX = 0;

function nextPoemaCard() {
    const currentCard = document.getElementById(`poema-card-${poemaCurrentStep}`);
    const nextCard = document.getElementById(`poema-card-${poemaCurrentStep + 1}`);
    const nextCard2 = document.getElementById(`poema-card-${poemaCurrentStep + 2}`);
    const previousCard = document.getElementById(`poema-card-${poemaCurrentStep - 1}`);
    const dots = document.querySelectorAll('.poema-dot');

    poemaCurrentStep++;

    dots.forEach(dot => dot.classList.remove('poema-active-dot'));

    if (currentCard) {
        currentCard.classList.remove('principal-poema');
        currentCard.classList.add('anterior-poema');
    }

    if (nextCard) {
        const nextCardDots = nextCard.querySelectorAll('.poema-dot');
        if (nextCardDots.length > poemaCurrentStep - 1) {
            nextCardDots[poemaCurrentStep - 1].classList.add('poema-active-dot');
        }
        nextCard.classList.remove('siguiente-poema');
        nextCard.classList.add('principal-poema');
    }

    if (nextCard2) {
        nextCard2.classList.remove('siguiente2-poema');
        nextCard2.classList.add('siguiente-poema');
    }

    if (previousCard) {
        previousCard.classList.remove('anterior-poema');
        previousCard.classList.add('anterior2-poema');
        document.getElementById('div-transparent-next-poema')?.classList.add('poema-ocultar');
    }
    document.getElementById('div-transparent-previous-poema')?.classList.remove('poema-ocultar');
}

function previousPoemaCard() {
    const currentCard = document.getElementById(`poema-card-${poemaCurrentStep}`);
    const nextCard = document.getElementById(`poema-card-${poemaCurrentStep + 1}`);
    const previousCard = document.getElementById(`poema-card-${poemaCurrentStep - 1}`);
    const previousCard2 = document.getElementById(`poema-card-${poemaCurrentStep - 2}`);
    const dots = document.querySelectorAll('.poema-dot');

    poemaCurrentStep--;

    dots.forEach(dot => dot.classList.remove('poema-active-dot'));

    if (currentCard) {
        currentCard.classList.remove('principal-poema');
        currentCard.classList.add('siguiente-poema');
    }

    if (previousCard) {
        const previousCardDots = previousCard.querySelectorAll('.poema-dot');
        if (previousCardDots.length > poemaCurrentStep - 1) {
            previousCardDots[poemaCurrentStep - 1].classList.add('poema-active-dot');
        }
        previousCard.classList.remove('anterior-poema');
        previousCard.classList.add('principal-poema');
    }

    if (previousCard2) {
        previousCard2.classList.remove('anterior2-poema');
        previousCard2.classList.add('anterior-poema');
    }

    if (nextCard) {
        nextCard.classList.remove('siguiente-poema');
        nextCard.classList.add('siguiente2-poema');
        document.getElementById('div-transparent-previous-poema')?.classList.add('poema-ocultar');
    }
    document.getElementById('div-transparent-next-poema')?.classList.remove('poema-ocultar');
}

function poemaOnTouchStart(event) {
    poemaTouchStartX = event.changedTouches[0].clientX;
}

function poemaOnTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = poemaTouchStartX - touchEndX;
    const nextCardElement = document.getElementById(`poema-card-${poemaCurrentStep + 1}`);
    const previousCardElement = document.getElementById(`poema-card-${poemaCurrentStep - 1}`);

    if (deltaX > 50 && nextCardElement) {
        nextPoemaCard();
    } else if (deltaX < -50 && previousCardElement) {
        previousPoemaCard();
    }
}

// --- FORMULARIOS DE PEDIDO POR CATEGORÍA ---
function recolectarRosas() {
    const cantidad = document.getElementById('rosasCantidad').value;
    const colores = document.getElementById('rosasColores').value.trim();

    if (!cantidad || !colores) {
        alert("Por favor completa la cantidad y los colores deseados.");
        return null;
    }
    return {
        nombre: 'Rosas Eternas Personalizadas',
        detalle: `Cant: ${cantidad} • Colores: ${colores}`,
        cantidad: 1
    };
}

function comprarRosasAhora() {
    const pedido = recolectarRosas();
    if (pedido) abrirModalDatosGlobales([pedido]);
}

function agregarRosasCarrito() {
    const pedido = recolectarRosas();
    if (pedido) agregarPedidoCarrito(pedido.nombre, pedido.detalle);
}

function recolectarCartelera() {
    const tamano = (document.querySelector('input[name="carteleraTamano"]:checked') || {}).value;
    const material = (document.querySelector('input[name="carteleraMaterial"]:checked') || {}).value;
    const crearMensaje = document.getElementById('carteleraCrearMensaje').checked;
    const mensaje = document.getElementById('carteleraMensaje').value.trim();
    const finalidad = document.getElementById('carteleraFinalidad').value.trim();

    if (!tamano || !material) {
        alert("Por favor elige el tamaño y el material de tu cartelera.");
        return null;
    }
    if (!crearMensaje && !mensaje) {
        alert("Escribe el mensaje de tu cartelera o marca la opción para que nosotros lo creemos por ti.");
        return null;
    }

    const detalle = crearMensaje
        ? `Tamaño: ${tamano} • Material: ${material} • Mensaje: nos lo crean ustedes${finalidad ? ` (finalidad: ${finalidad})` : ''}`
        : `Tamaño: ${tamano} • Material: ${material} • Mensaje: ${mensaje}`;
    return { nombre: 'Cartelera Personalizada', detalle, cantidad: 1 };
}

function comprarCarteleraAhora() {
    const pedido = recolectarCartelera();
    if (pedido) abrirModalDatosGlobales([pedido]);
}

function agregarCarteleraCarrito() {
    const pedido = recolectarCartelera();
    if (pedido) agregarPedidoCarrito(pedido.nombre, pedido.detalle);
}

function recolectarPoema() {
    const autor = (document.querySelector('input[name="poemaAutor"]:checked') || {}).value;
    const temas = document.getElementById('poemaTemas').value.trim();
    const estrofas = document.getElementById('poemaEstrofas').value;

    if (!autor || !temas) {
        alert("Por favor indica quién escribe el poema y los temas que quieres transmitir.");
        return null;
    }

    return {
        nombre: 'Poema Personalizado',
        detalle: `¿Quién lo escribe?: ${autor} • Temas: ${temas} • Largo: ${estrofas}`,
        cantidad: 1
    };
}

function comprarPoemaAhora() {
    const pedido = recolectarPoema();
    if (pedido) abrirModalDatosGlobales([pedido]);
}

function agregarPoemaCarrito() {
    const pedido = recolectarPoema();
    if (pedido) agregarPedidoCarrito(pedido.nombre, pedido.detalle);
}

// --- MODAL DE PROMOCIÓN DE BIENVENIDA ---
function abrirPromoModal() {
    document.getElementById('promo-modal').classList.remove('hidden');
}

function cerrarPromoModal() {
    document.getElementById('promo-modal').classList.add('hidden');
}

document.getElementById('promo-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('promo-modal')) cerrarPromoModal();
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(abrirPromoModal, 2800);
});