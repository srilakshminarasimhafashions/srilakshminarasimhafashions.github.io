// ==========================================================================
// SRI LAKSHMI NARASIMHA FASHIONS — INTERACTIVE CATALOG & WHATSAPP ORDERING
// ==========================================================================

const BOUTIQUE_PHONE = "919701650914";
const productCards = document.querySelectorAll('.product-card');

// 1. SIZE SELECTION, LIVE STOCK TRACKER & WHATSAPP ORDERING
productCards.forEach(card => {
  const dressName = card.querySelector('h2').innerText.trim();
  const dressPrice = card.querySelector('.price').innerText.trim();
  const sizeButtons = card.querySelectorAll('.size-btn');
  const stockBadge = card.querySelector('.stock-badge');
  const whatsappBtn = card.querySelector('.whatsapp-btn');

  let selectedSize = null;

  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;

      sizeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.innerText.trim();

      const stockCount = parseInt(btn.getAttribute('data-stock'), 10);

      if (stockCount === 1) {
        stockBadge.className = 'badge stock-badge low-stock';
        stockBadge.innerText = `● Hurry! Only 1 piece left in Size ${selectedSize}`;
      } else {
        stockBadge.className = 'badge stock-badge in-stock';
        stockBadge.innerText = `● In Stock (${stockCount} pieces ready in Size ${selectedSize})`;
      }
    });
  });

  whatsappBtn.addEventListener('click', () => {
    const sizeText = selectedSize ? `Size *${selectedSize}*` : "available sizes";
   const message =
      `Namaste Sri Lakshmi Narasimha Fashions! 🙏\n` +
      `I would like to order / inquire about:\n\n` +
      `• *Dress:* ${dressName}\n` +
      `• *Price:* ${dressPrice}\n` +
      `• *Preferred Size:* ${sizeText}\n\n` +
      `Please confirm availability.`;
    const whatsappURL = `https://wa.me/${BOUTIQUE_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  });
});

// 2. COMBINED CATEGORY FILTER, PRICE RANGE FILTER & PRICE SORTING
const catalogContainer = document.querySelector('.catalog-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const priceButtons = document.querySelectorAll('.price-btn');
const priceSortSelect = document.getElementById('price-sort');
const noResultsMsg = document.getElementById('no-results-msg');

const originalOrder = Array.from(productCards);

let activeCategory = 'all';
let activeMinPrice = 0;
let activeMaxPrice = 99999;

function updateCatalog() {
  let visibleCount = 0;

  productCards.forEach(card => {
    const category = card.getAttribute('data-category');
    const price = parseInt(card.getAttribute('data-price'), 10);

    const matchesCategory = (activeCategory === 'all' || category === activeCategory);
    const matchesPrice = (price >= activeMinPrice && price <= activeMaxPrice);

    if (matchesCategory && matchesPrice) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  noResultsMsg.style.display = (visibleCount === 0) ? 'block' : 'none';

  const sortMode = priceSortSelect.value;
  let sortedCards = [...originalOrder];

  if (sortMode === 'asc') {
    sortedCards.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
  } else if (sortMode === 'desc') {
    sortedCards.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
  }

  sortedCards.forEach(card => catalogContainer.appendChild(card));
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.getAttribute('data-filter');
    updateCatalog();
  });
});

priceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    priceButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeMinPrice = parseInt(btn.getAttribute('data-min'), 10);
    activeMaxPrice = parseInt(btn.getAttribute('data-max'), 10);
    updateCatalog();
  });
});

priceSortSelect.addEventListener('change', updateCatalog); 