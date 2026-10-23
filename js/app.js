/**
 * UNIQUE FURNITURE ROHTAK — GLOBAL APP CONTROLLER
 * Header, Mini-Cart Drawer, Toast Notifications, Quick-View Modal, Search
 */

document.addEventListener('DOMContentLoaded', () => {
  initToasts();
  initMiniCart();
  initMobileMenu();
  initHeaderCounters();
  initGlobalSearch();
});

/* Toast Notification Utility (Slop Rule: Never use browser alert) */
function initToasts() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  window.showToast = function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '•';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  };
}

/* Header Badge Counters */
function initHeaderCounters() {
  function updateCounters() {
    const cartSummary = window.store.getCartSummary();
    const cartBadges = document.querySelectorAll('.cart-count-badge');
    cartBadges.forEach(badge => {
      badge.textContent = cartSummary.itemCount;
      badge.style.display = cartSummary.itemCount > 0 ? 'flex' : 'none';
    });

    const wishlistBadges = document.querySelectorAll('.wishlist-count-badge');
    const wishlistCount = window.store.state.wishlist.length;
    wishlistBadges.forEach(badge => {
      badge.textContent = wishlistCount;
      badge.style.display = wishlistCount > 0 ? 'flex' : 'none';
    });
  }

  window.store.subscribe('cart:updated', updateCounters);
  window.store.subscribe('wishlist:updated', updateCounters);
  window.store.subscribe('store:ready', updateCounters);
  updateCounters();
}

/* Mini-Cart Drawer */
function initMiniCart() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer || !backdrop) return;

  const openBtns = document.querySelectorAll('.open-cart-btn');
  const closeBtns = drawer.querySelectorAll('.close-cart-btn');

  function openCart() {
    renderCartDrawer();
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  }));

  closeBtns.forEach(btn => btn.addEventListener('click', closeCart));
  backdrop.addEventListener('click', closeCart);

  window.openMiniCart = openCart;
  window.closeMiniCart = closeCart;

  window.store.subscribe('cart:updated', () => {
    if (drawer.classList.contains('open')) {
      renderCartDrawer();
    }
  });
}

function renderCartDrawer() {
  const itemsContainer = document.getElementById('cart-drawer-items');
  const summarySubtotal = document.getElementById('cart-drawer-subtotal');
  const summaryShipping = document.getElementById('cart-drawer-shipping');
  const summaryTotal = document.getElementById('cart-drawer-total');
  const footerActions = document.getElementById('cart-drawer-footer-actions');
  if (!itemsContainer) return;

  const summary = window.store.getCartSummary();

  if (summary.items.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5" style="margin: 0 auto 1rem;">
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
        <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Your shopping bag is empty</h4>
        <p style="font-size: 0.85rem; color: var(--text-tertiary); margin-bottom: 1.5rem;">Discover hand-crafted solid Sheesham and teak furniture for your space.</p>
        <a href="shop.html" class="btn-primary" onclick="window.closeMiniCart()">Explore Collection</a>
      </div>
    `;
    if (summarySubtotal) summarySubtotal.textContent = '₹0';
    if (summaryShipping) summaryShipping.textContent = 'Calculated at checkout';
    if (summaryTotal) summaryTotal.textContent = '₹0';
    if (footerActions) footerActions.style.display = 'none';
    return;
  }

  if (footerActions) footerActions.style.display = 'block';

  itemsContainer.innerHTML = summary.items.map(item => `
    <div style="display: flex; gap: 1rem; padding-bottom: 1.25rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle);">
      <img src="${item.image}" alt="${item.name}" style="width: 72px; height: 72px; object-fit: cover; border-radius: var(--radius-sm); background-color: var(--bg-subtle);">
      <div style="flex-grow: 1;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <h5 style="font-size: 0.925rem; font-weight: 600; line-height: 1.2;">${item.name}</h5>
          <button onclick="window.store.removeFromCart('${item.id}'); window.showToast('Item removed', 'info');" style="background: none; border: none; cursor: pointer; color: var(--text-tertiary); padding: 0.2rem;">
            ✕
          </button>
        </div>
        ${item.variant ? `<p style="font-size: 0.75rem; color: var(--accent-gold); margin-block: 0.2rem;">${item.variant.name || item.variant.size || 'Custom Variant'}</p>` : ''}
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.6rem;">
          <div style="display: flex; align-items: center; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
            <button onclick="window.store.updateCartQuantity('${item.id}', ${item.quantity - 1})" style="padding: 0.2rem 0.5rem; background: none; border: none; cursor: pointer;">-</button>
            <span style="padding-inline: 0.6rem; font-size: 0.85rem; font-weight: 600;">${item.quantity}</span>
            <button onclick="window.store.updateCartQuantity('${item.id}', ${item.quantity + 1})" style="padding: 0.2rem 0.5rem; background: none; border: none; cursor: pointer;">+</button>
          </div>
          <span style="font-size: 0.95rem; font-weight: 700;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  `).join('');

  if (summarySubtotal) summarySubtotal.textContent = '₹' + summary.subtotal.toLocaleString('en-IN');
  if (summaryShipping) summaryShipping.textContent = summary.shipping === 0 ? 'FREE (Orders over ₹20k)' : '₹' + summary.shipping.toLocaleString('en-IN');
  if (summaryTotal) summaryTotal.textContent = '₹' + summary.grandTotal.toLocaleString('en-IN');
}

/* Mobile Nav Drawer */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const isOpen = mobileNav.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });
}

/* Instant Search Modal */
function initGlobalSearch() {
  const searchInput = document.getElementById('header-search-input');
  const searchResults = document.getElementById('header-search-results');
  if (!searchInput || !searchResults) return;

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (q.length < 2) {
      searchResults.style.display = 'none';
      return;
    }

    const matches = window.store.state.products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.materials.primaryWood.toLowerCase().includes(q)
    ).slice(0, 5);

    if (matches.length === 0) {
      searchResults.innerHTML = `<div style="padding: 1rem; font-size: 0.85rem; color: var(--text-tertiary); text-align: center;">No furniture found for "${q}".</div>`;
    } else {
      searchResults.innerHTML = matches.map(p => `
        <a href="product.html?slug=${p.slug}" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; text-decoration: none; border-bottom: 1px solid var(--border-subtle); color: var(--text-primary);">
          <img src="${p.images[0]}" style="width: 44px; height: 44px; object-fit: cover; border-radius: var(--radius-sm);">
          <div>
            <div style="font-size: 0.875rem; font-weight: 600;">${p.name}</div>
            <div style="font-size: 0.75rem; color: var(--accent-gold);">₹${p.price.toLocaleString('en-IN')} • ${p.category}</div>
          </div>
        </a>
      `).join('');
    }
    searchResults.style.display = 'block';
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });
}
