document.addEventListener('DOMContentLoaded', function() {
  // Filter gallery items
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Set active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter items
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          item.classList.add('fade-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-btn');
  
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    galleryItems.forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      const description = item.querySelector('p').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        item.style.display = 'block';
        item.classList.add('fade-in');
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  // Shopping cart functionality
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutButton = document.getElementById('checkout-btn');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  let cart = [];
  
  // Add to cart
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const itemElement = this.closest('.gallery-item');
      const itemId = itemElement.getAttribute('data-price'); // Using price as ID for simplicity
      const itemName = itemElement.querySelector('h3').textContent;
      const itemPrice = parseInt(itemElement.getAttribute('data-price'));
      const itemImage = itemElement.querySelector('img').src;
      
      // Check if item already in cart
      const existingItem = cart.find(item => item.id === itemId);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: itemId,
          name: itemName,
          price: itemPrice,
          image: itemImage,
          quantity: 1
        });
      }
      
      updateCart();
      
      // Show success animation
      this.textContent = 'Ditambahkan!';
      this.style.backgroundColor = '#4CAF50';
      
      setTimeout(() => {
        this.textContent = 'Tambah ke Keranjang';
        this.style.backgroundColor = '';
      }, 1000);
    });
  });
  
  // Update cart display
  function updateCart() {
    // Clear cart
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Keranjang belanja masih kosong</p>';
      cartTotal.textContent = 'Rp 0';
      return;
    }
    
    // Add items to cart
    let total = 0;
    
    cart.forEach(item => {
      total += item.price * item.quantity;
      
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      cartItemElement.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p class="cart-item-price">Rp ${item.price.toLocaleString()}</p>
          </div>
        </div>
        <div class="cart-item-quantity">
          <button class="decrease-quantity">-</button>
          <span>${item.quantity}</span>
          <button class="increase-quantity">+</button>
        </div>
        <div class="cart-item-remove">×</div>
      `;
      
      cartItems.appendChild(cartItemElement);
      
      // Add event listeners for quantity buttons
      const decreaseButton = cartItemElement.querySelector('.decrease-quantity');
      const increaseButton = cartItemElement.querySelector('.increase-quantity');
      const removeButton = cartItemElement.querySelector('.cart-item-remove');
      
      decreaseButton.addEventListener('click', () => {
        if (item.quantity > 1) {
          item.quantity -= 1;
          updateCart();
        }
      });
      
      increaseButton.addEventListener('click', () => {
        item.quantity += 1;
        updateCart();
      });
      
      removeButton.addEventListener('click', () => {
        cart = cart.filter(cartItem => cartItem.id !== item.id);
        updateCart();
      });
    });
    
    // Update total
    cartTotal.textContent = `Rp ${total.toLocaleString()}`;
  }
  
  // Checkout button
  checkoutButton.addEventListener('click', function() {
    if (cart.length === 0) {
      alert('Keranjang belanja masih kosong!');
      return;
    }
    
    // In a real application, this would redirect to a checkout page
    alert(`Pesanan Anda dengan total ${cartTotal.textContent} telah diterima! Terima kasih.`);
    cart = [];
    updateCart();
  });
  
  // Sort by price (additional feature)
  const sortSelect = document.createElement('select');
  sortSelect.innerHTML = `
    <option value="">Urutkan berdasarkan...</option>
    <option value="price-asc">Harga: Rendah ke Tinggi</option>
    <option value="price-desc">Harga: Tinggi ke Rendah</option>
  `;
  
  sortSelect.addEventListener('change', function() {
    const value = this.value;
    
    if (value === 'price-asc') {
      sortItems((a, b) => a.getAttribute('data-price') - b.getAttribute('data-price'));
    } else if (value === 'price-desc') {
      sortItems((a, b) => b.getAttribute('data-price') - a.getAttribute('data-price'));
    }
  });
  
  function sortItems(compareFunction) {
    const galleryGrid = document.querySelector('.gallery-grid');
    const items = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
    
    items.sort(compareFunction).forEach(item => {
      galleryGrid.appendChild(item);
      item.classList.add('fade-in');
    });
  }
  
  // Add sort select to controls
  const controlsContainer = document.querySelector('.gallery-controls .container');
  const sortContainer = document.createElement('div');
  sortContainer.className = 'sort-box';
  sortContainer.appendChild(sortSelect);
  controlsContainer.appendChild(sortContainer);
  
  // Add hover effect to gallery items
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const image = item.querySelector('.gallery-image img');
      image.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', () => {
      const image = item.querySelector('.gallery-image img');
      image.style.transform = 'scale(1)';
    });
  });
});