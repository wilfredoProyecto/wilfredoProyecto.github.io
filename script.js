
const products = [
    { id: 1, name: "Inflable Santa", price: 72, image: "santa.jpg", discount: "60%", category: "adornos", brand: "krea" },
    { id: 2, name: "Colgante Avión", price: 2.8, image: "avion.jpg", discount: "60%", category: "adornos", brand: "krea" },
    { id: 3, name: "Sticker Navideño", price: 3.6, image: "sticker.jpg", discount: "60%", category: "luces", brand: "otra" },
    { id: 4, name: "Guirnalda de Luces", price: 25, image: "guirnalda.jpg", discount: "30%", category: "luces", brand: "philips" },
    { id: 5, name: "Esfera Roja", price: 15, image: "esfera.jpg", discount: "20%", category: "adornos", brand: "krea" },
    { id: 6, name: "Árbol Pequeño", price: 120, image: "arbol.jpg", discount: "50%", category: "arboles", brand: "otra" },
    { id: 7, name: "Corona Navideña", price: 26, image: "corona.jpg", discount: "10%", category: "adornos", brand: "philips" },
    { id: 8, name: "Velas Aromáticas", price: 35, image: "velas.jpg", discount: "40%", category: "adornos", brand: "krea" },
    { id: 9, name: "Mantel Navideño", price: 50, image: "mantel.jpg", discount: "25%", category: "decoracion hogar", brand: "otra" },
    { id: 10, name: "Juego de Luces LED", price: 70, image: "luces_led.jpg", discount: "15%", category: "luces", brand: "philips" },
    { id: 11, name: "Estrella para Árbol", price: 45, image: "estrella.jpg", discount: "20%", category: "adornos", brand: "otra" },
    { id: 12, name: "Copo de Nieve", price: 18, image: "copo.jpg", discount: "30%", category: "adornos", brand: "krea" },
    { id: 13, name: "Muñeco de Nieve", price: 99, image: "muneco.jpg", discount: "25%", category: "adornos", brand: "philips" },
    { id: 14, name: "Reno Navideño", price: 150, image: "reno.jpg", discount: "50%", category: "adornos", brand: "krea" },
    { id: 15, name: "Campana Decorativa", price: 20, image: "campana.jpg", discount: "40%", category: "adornos", brand: "otra" },
    { id: 16, name: "Casa de Jengibre", price: 60, image: "casa.jpg", discount: "20%", category: "decoracion hogar", brand: "philips" },
    { id: 17, name: "Adorno de Renos", price: 80, image: "adorno_renos.jpg", discount: "30%", category: "adornos", brand: "krea" },
    { id: 18, name: "Guirnalda Clásica", price: 40, image: "guirnalda_clasica.jpg", discount: "50%", category: "decoracion hogar", brand: "otra" },
    { id: 19, name: "Letrero Feliz Navidad", price: 55, image: "letrero.jpg", discount: "15%", category: "decoracion hogar", brand: "philips" },
    { id: 20, name: "Esfera Dorada", price: 12, image: "esfera_dorada.jpg", discount: "35%", category: "adornos", brand: "krea" },
    { id: 21, name: "Camión Navideño", price: 130, image: "camion.jpg", discount: "40%", category: "adornos", brand: "otra" },
    { id: 22, name: "Caja de Regalos", price: 90, image: "caja_regalos.jpg", discount: "30%", category: "adornos", brand: "krea" },
    { id: 23, name: "Ropa Santa Claus", price: 100, image: "ropa_santa.jpg", discount: "50%", category: "otros", brand: "philips" },
    { id: 24, name: "Ángel Decorativo", price: 70, image: "angel.jpg", discount: "20%", category: "adornos", brand: "krea" },
    { id: 25, name: "Tren Navideño", price: 180, image: "tren.jpg", discount: "25%", category: "adornos", brand: "philips" },

    // Nuevos productos relacionados con árboles
    { id: 26, name: "Árbol de Navidad Grande", price: 250, image: "arbol_grande.jpg", discount: "40%", category: "árboles", brand: "krea" },
    { id: 27, name: "Árbol de Navidad Con Luces", price: 200, image: "arbol_con_luces.jpg", discount: "30%", category: "árboles", brand: "philips" },
    { id: 28, name: "Árbol Pequeño con Adornos", price: 90, image: "arbol_pequeno_adornos.jpg", discount: "20%", category: "árboles", brand: "otra" }
];

let filteredProducts = [...products];
const cart = [];

function loadProducts(productsToDisplay) {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';
    const fragment = document.createDocumentFragment();

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: S/ ${product.price}</p>
            <p>Descuento: ${product.discount}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        fragment.appendChild(productCard);
    });

    productList.appendChild(fragment);
}

let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    slides[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    slides[currentSlide].classList.add('active');

    document.querySelector('.slider').style.transform = `translateX(-${currentSlide * 100}%)`;
}


function updateCartUI() {
    updateCartIcon();
    updateCartModal();
}

function updateCartIcon() {
    const cartCount = cart.length;
    const cartIcon = document.querySelector('#cart-button i');
    cartIcon.style.color = cartCount > 0 ? '#ffcb05' : '#333';
    cartIcon.style.transform = cartCount > 0 ? 'scale(1.2)' : 'scale(1)';
    document.getElementById('cart-count').innerText = cartCount;
}

function updateCartModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((product, index) => {
        const cartItem = `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" width="50">
                <p>${product.name}</p>
                <p>S/ ${product.price}</p>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItem;
        total += product.price;
    });

    document.getElementById('cart-total-amount').textContent = total.toFixed(2);
}

function sortProducts(sortBy) {
    switch (sortBy) {
        case "lowestprice":
            // Ordenar por menor precio
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case "highestprice":
            // Ordenar por mayor precio
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case "alphabetical":
            // Ordenar alfabéticamente
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "bestselling":
            // Ordenar por más vendido (requiere que tengas un campo 'sales')
            filteredProducts.sort((a, b) => b.sales - a.sales);  // Asumiendo que cada producto tiene un campo 'sales'
            break;
        case "relevance":
            // Ordenar por relevancia (esto es solo un ejemplo, puedes personalizarlo)
            break;
        default:
            // Si no se selecciona un criterio válido, no hacer nada
            break;
    }

    // Volver a cargar los productos ordenados
    loadProducts(filteredProducts);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
    alert(`${product.name} agregado al carrito.`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Función para abrir el modal de pago
function comprar() {
    // Muestra el modal de pago
    document.getElementById('payment-modal').style.display = 'block';
}

// Función para cerrar el modal de pago
function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

// Función para mostrar la opción de pago en efectivo
function showCashPayment() {
    document.getElementById('cash-payment-info').style.display = 'block';
    document.getElementById('card-payment-info').style.display = 'none';
}

// Función para mostrar la opción de pago con tarjeta
function showCardPayment() {
    document.getElementById('cash-payment-info').style.display = 'none';
    document.getElementById('card-payment-info').style.display = 'block';
}

// Función para abrir el modal de inicio de sesión
function openLoginModal() {
    document.getElementById("login-modal").style.display = "block";
}

// Función para cerrar el modal de inicio de sesión
function closeLoginModal() {
    document.getElementById("login-modal").style.display = "none";
}

// Cerrar el modal cuando se haga clic fuera de la ventana emergente
window.onclick = function(event) {
    var modal = document.getElementById("login-modal");
    if (event.target == modal) {
        closeLoginModal();
    }
}

// Función para manejar el envío del formulario de inicio de sesión (aquí podrías procesar el login)
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recarga de la página)
    
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;

    // Aquí puedes agregar la lógica para procesar los datos del formulario, como guardarlos o enviarlos al servidor
    alert("Bienvenido, " + username + " (" + email + ")");

    // Después de enviar, cerramos el modal
    closeLoginModal();
});


document.getElementById('cart-button').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'block';
});

document.getElementById('close-cart-modal').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('cart-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Mostrar y ocultar el formulario de contacto
document.getElementById('contact-button').addEventListener('click', function() {
    const formContainer = document.getElementById('contact-form-container');
    if (formContainer.style.display === 'none' || formContainer.style.display === '') {
        formContainer.style.display = 'block';  // Mostrar formulario
    } else {
        formContainer.style.display = 'none';   // Ocultar formulario
    }
});

document.getElementById('price-range').addEventListener('input', (e) => {
    document.getElementById('price-value').innerText = e.target.value;
    applyFilters();
});

document.querySelectorAll('input[name="subcategory"], input[name="brand"]').forEach(input => {
    input.addEventListener('change', applyFilters);
});

document.getElementById('search-bar').addEventListener('input', function (event) {
    const query = event.target.value.toLowerCase();
    const searchResults = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    loadProducts(searchResults);
});

function applyFilters() {
    const categoryFilters = Array.from(document.querySelectorAll('input[name="subcategory"]:checked')).map(input => input.value);
    const brandFilters = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(input => input.value);
    const maxPrice = document.getElementById('price-range').value;

    filteredProducts = products.filter(product => {
        const matchesCategory = categoryFilters.length ? categoryFilters.includes(product.category) : true;
        const matchesBrand = brandFilters.length ? brandFilters.includes(product.brand) : true;
        const matchesPrice = product.price <= maxPrice;
        return matchesCategory && matchesBrand && matchesPrice;
    });

    loadProducts(filteredProducts);
}

loadProducts(products);  // Cargar los productos inicialmente
