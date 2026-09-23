// --- PRECARGADOR DINÁMICO CON JS (Refleja la transformación de la Misión) ---
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
// Los pedidos se alternan entre los dos números oficiales:
// +573160512872 y +573153767043
const numerosWhatsApp = ["573160512872", "573153767043"];
let indiceNumeroActual = 0;

function obtenerNumeroWhatsApp() {
    const numero = numerosWhatsApp[indiceNumeroActual];
    indiceNumeroActual = (indiceNumeroActual + 1) % numerosWhatsApp.length;
    return numero;
}

// --- REDIRECCIONAMIENTO A WHATSAPP ---
function pedirProducto(productoNombre) {
    const mensaje = `¡Hola! Me interesa solicitar el producto: *${productoNombre}*. ¿Me brindan más información por favor?`;
    const url = `https://wa.me/${obtenerNumeroWhatsApp()}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function enviarWhatsApp() {
    const nombre = document.getElementById('nombre').value.trim();
    const producto = document.getElementById('productoSelect').value;
    const correo = document.getElementById('correo').value.trim();
    const detalles = document.getElementById('mensaje').value.trim();

    if (!nombre || !correo || !detalles) {
        alert("Por favor completa todos los campos antes de enviar.");
        return;
    }

    const texto = `Hola, mi nombre es *${nombre}*.\nQuiero solicitar: *${producto}*.\nMi correo es: ${correo}\nDetalles adicionales: ${detalles}`;
    const url = `https://wa.me/${obtenerNumeroWhatsApp()}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}

// --- ENVÍO POR CORREO ELECTRÓNICO (MAILTO) ---
const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const producto = document.getElementById('productoSelect').value;
    const correo = document.getElementById('correo').value.trim();
    const detalles = document.getElementById('mensaje').value.trim();

    const destinatario = "contacto.alashmoon@gmail.com"; // Reemplaza con tu correo institucional
    const asunto = encodeURIComponent(`Nueva Solicitud - ${producto}`);
    const cuerpo = encodeURIComponent(
        `Cliente: ${nombre}\n` +
        `Correo: ${correo}\n` +
        `Producto: ${producto}\n\n` +
        `Especificaciones:\n${detalles}`
    );

    window.location.href = `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;
});