// Array para armazenar os itens do carrinho
const cartItems = [];

// Seleciona os elementos do carrinho do offcanvas
const cartTotalElement = document.getElementById('offcanvas-cart-total');
const cartItemsElement = document.getElementById('offcanvas-cart-items');
const checkoutButton = document.getElementById('checkout-button');

// Seleciona o elemento que exibe a contagem no carrinho fixo
const fixedCartCount = document.getElementById('fixed-cart-count');

// Função para adicionar um item ao carrinho
function addToCart(itemName, itemPrice) {
    cartItems.push({ name: itemName, price: parseFloat(itemPrice) });
    updateCart();
}

// Função para atualizar o carrinho
function updateCart() {
    cartItemsElement.innerHTML = ''; // Limpa os itens do carrinho
    let total = 0;
    
    // Adiciona cada item ao carrinho
    cartItems.forEach((item) => {
        total += item.price;
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            ${item.name}
            <span class="badge bg-primary rounded-pill">R$ ${item.price.toFixed(2)}</span>
        `;
        cartItemsElement.appendChild(listItem);
    });
    
    // Atualiza o total do carrinho
    cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    
    // Atualiza a contagem no carrinho fixo
    fixedCartCount.textContent = cartItems.length;
}

// Aguarda o carregamento do DOM para adicionar os eventos de clique
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = button.getAttribute('data-price');
            addToCart(itemName, itemPrice);
        });
    });
    
    // Evento para finalizar as compras
    checkoutButton.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Seu carrinho está vazio!');
        } else {
            alert('Compra finalizada com sucesso!');
            cartItems.length = 0; // Limpa o carrinho
            updateCart();
        }
    });
});