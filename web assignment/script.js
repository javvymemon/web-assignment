//  hamburger menu
const hamburger = document.querySelector('.hamburger-menu');
const menuBox = document.querySelector('.menu-box');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menuBox.classList.toggle('active');
});





let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

function showSlide(index) {
  if (index >= totalSlides) currentSlide = 0;
  if (index < 0) currentSlide = totalSlides - 1;
  const offset = -currentSlide * 100;
  document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
  currentSlide--;
  showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
  currentSlide++;
  showSlide(currentSlide);
});

/* Auto Slide */
setInterval(() => {
  currentSlide++;
  showSlide(currentSlide);
}, 5000);


// Initialize cart from localStorage or set as empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to toggle cart modal
function toggleCartModal() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
}

// Function to add an item to the cart
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
    } else {
        cart.push({ ...item, quantity: 1 }); // Add new item
    }
    updateCart(); // Update the cart state
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId); // Filter out the removed item
    updateCart(); // Update the cart state
}

// Function to update the cart and render in the modal
function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    renderCartItems(); // Render updated cart items
    updateCartIcon(); // Update cart count in the header
}

// Function to render cart items in the modal
function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: RS${item.price} | Quantity: ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });
}

// Function to update the cart icon count
function updateCartIcon() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
    const cartIcon = document.querySelector(".fas.fa-shopping-cart");
    if (cartIcon) {
        cartIcon.setAttribute("data-count", cartCount); // Update cart count badge
    }
}

// Add event listeners for modal toggle
document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".fas.fa-shopping-cart");
    const closeCart = document.getElementById("close-cart");

    if (cartIcon) {
        cartIcon.addEventListener("click", toggleCartModal); // Open/close cart modal
    }
    if (closeCart) {
        closeCart.addEventListener("click", toggleCartModal); // Close cart modal
    }

    updateCartIcon(); // Update cart count when page loads
    renderCartItems(); // Render cart items when page loads
});


