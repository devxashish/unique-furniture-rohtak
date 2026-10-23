/**
 * UNIQUE FURNITURE ROHTAK — REACTIVE COMMERCE STORE
 * Centralized State Container with LocalStorage Persistence
 */

class CommerceStore {
  constructor() {
    this.storageKey = 'unique_furniture_store_v1';
    this.listeners = new Map();
    this.state = {
      products: [],
      categories: [],
      reviews: [],
      cms: {},
      cart: [],
      wishlist: [],
      compare: [],
      orders: [],
      quotes: [],
      activeCoupon: null,
      adminSession: false
    };

    this.init();
  }

  async init() {
    // 1. Try to load persisted local state
    const saved = localStorage.getItem(this.storageKey);
    let cachedData = null;
    if (saved) {
      try {
        cachedData = JSON.parse(saved);
      } catch (e) {
        console.warn('Error parsing cached store data', e);
      }
    }

    // 2. Hydrate seed files if needed
    const basePath = window.location.pathname.includes('/admin') ? '../data/' : 'data/';
    try {
      const [prodsRes, catsRes, revsRes, cmsRes] = await Promise.all([
        fetch(basePath + 'products.json').then(r => r.json()),
        fetch(basePath + 'categories.json').then(r => r.json()),
        fetch(basePath + 'reviews.json').then(r => r.json()),
        fetch(basePath + 'cms-content.json').then(r => r.json())
      ]);

      this.state.products = (cachedData && cachedData.products && cachedData.products.length > 0) ? cachedData.products : prodsRes;
      this.state.categories = catsRes;
      this.state.reviews = (cachedData && cachedData.reviews && cachedData.reviews.length > 0) ? cachedData.reviews : revsRes;
      this.state.cms = (cachedData && cachedData.cms && Object.keys(cachedData.cms).length > 0) ? cachedData.cms : cmsRes;
      this.state.cart = cachedData?.cart || [];
      this.state.wishlist = cachedData?.wishlist || [];
      this.state.compare = cachedData?.compare || [];
      this.state.orders = cachedData?.orders || [];
      this.state.quotes = cachedData?.quotes || [
        {
          id: "QUOTE-2026-001",
          timestamp: new Date().toISOString(),
          customer: { name: "Anand Rathi", phone: "+91 98120 44552", locality: "Model Town, Rohtak" },
          furnitureType: "L-Shape Modular Sofa",
          roomDimensions: "15 x 20 ft",
          preferredMaterial: "Teak Wood + Sand Boucle",
          budgetTier: "₹50,000 - ₹1,00,000",
          notes: "Need extra depth and stain resistant fabric for family living room.",
          status: "New"
        }
      ];
      this.state.activeCoupon = cachedData?.activeCoupon || null;
    } catch (err) {
      console.warn('Could not fetch data seeds directly, utilizing internal offline defaults', err);
    }

    this.persist();
    this.emit('store:ready', this.state);
  }

  persist() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error('LocalStorage persist error', e);
    }
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.listeners.get(event).delete(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => cb(data));
    }
  }

  /* --- CART OPERATIONS --- */
  addToCart(product, quantity = 1, selectedVariant = null) {
    const existingIndex = this.state.cart.findIndex(item => 
      item.productId === product.id && 
      JSON.stringify(item.variant) === JSON.stringify(selectedVariant)
    );

    const unitPrice = product.price + (selectedVariant?.priceDelta || 0);

    if (existingIndex > -1) {
      this.state.cart[existingIndex].quantity += quantity;
    } else {
      this.state.cart.push({
        id: 'cart-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        productId: product.id,
        name: product.name,
        price: unitPrice,
        image: product.images[0],
        variant: selectedVariant,
        quantity: quantity
      });
    }

    this.persist();
    this.emit('cart:updated', this.getCartSummary());
  }

  updateCartQuantity(cartItemId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeFromCart(cartItemId);
      return;
    }
    const item = this.state.cart.find(i => i.id === cartItemId);
    if (item) {
      item.quantity = newQuantity;
      this.persist();
      this.emit('cart:updated', this.getCartSummary());
    }
  }

  removeFromCart(cartItemId) {
    this.state.cart = this.state.cart.filter(i => i.id !== cartItemId);
    this.persist();
    this.emit('cart:updated', this.getCartSummary());
  }

  clearCart() {
    this.state.cart = [];
    this.persist();
    this.emit('cart:updated', this.getCartSummary());
  }

  applyCoupon(code) {
    if (code.trim().toUpperCase() === 'UNIQUE10') {
      this.state.activeCoupon = { code: 'UNIQUE10', discountPercent: 10 };
      this.persist();
      this.emit('cart:updated', this.getCartSummary());
      return { success: true, message: "Coupon UNIQUE10 applied! 10% discount added." };
    }
    return { success: false, message: "Invalid coupon code. Try UNIQUE10 for 10% off." };
  }

  removeCoupon() {
    this.state.activeCoupon = null;
    this.persist();
    this.emit('cart:updated', this.getCartSummary());
  }

  getCartSummary() {
    const subtotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = this.state.activeCoupon ? Math.round(subtotal * (this.state.activeCoupon.discountPercent / 100)) : 0;
    const shipping = (subtotal > 20000 || subtotal === 0) ? 0 : 1500;
    const gst = Math.round((subtotal - discount) * 0.18);
    const grandTotal = subtotal - discount + shipping;
    const itemCount = this.state.cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items: this.state.cart,
      subtotal,
      discount,
      shipping,
      gst,
      grandTotal,
      itemCount,
      activeCoupon: this.state.activeCoupon
    };
  }

  /* --- WISHLIST OPERATIONS --- */
  toggleWishlist(product) {
    const exists = this.state.wishlist.some(p => p.id === product.id);
    if (exists) {
      this.state.wishlist = this.state.wishlist.filter(p => p.id !== product.id);
    } else {
      this.state.wishlist.push(product);
    }
    this.persist();
    this.emit('wishlist:updated', this.state.wishlist);
    return !exists;
  }

  isInWishlist(productId) {
    return this.state.wishlist.some(p => p.id === productId);
  }

  /* --- COMPARE OPERATIONS --- */
  toggleCompare(product) {
    const exists = this.state.compare.some(p => p.id === product.id);
    if (exists) {
      this.state.compare = this.state.compare.filter(p => p.id !== product.id);
    } else {
      if (this.state.compare.length >= 4) {
        return { success: false, message: "Maximum 4 items can be compared side-by-side." };
      }
      this.state.compare.push(product);
    }
    this.persist();
    this.emit('compare:updated', this.state.compare);
    return { success: true, added: !exists };
  }

  /* --- CUSTOM QUOTE SUBMISSION --- */
  submitCustomQuote(quoteData) {
    const newQuote = {
      id: 'QUOTE-2026-' + (this.state.quotes.length + 101),
      timestamp: new Date().toISOString(),
      ...quoteData,
      status: "New"
    };
    this.state.quotes.unshift(newQuote);
    this.persist();
    this.emit('quote:submitted', newQuote);
    return newQuote;
  }

  /* --- ORDER PROCESSING --- */
  placeOrder(customerDetails, paymentMethod) {
    const summary = this.getCartSummary();
    if (summary.items.length === 0) {
      throw new Error("Cannot place order with empty cart");
    }

    const orderId = 'UF-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: customerDetails,
      items: [...summary.items],
      pricing: { ...summary },
      paymentMethod,
      paymentStatus: paymentMethod.includes('Showroom') ? 'Pending Confirmation' : 'Paid Online (Mock)',
      orderStatus: 'Confirmed'
    };

    this.state.orders.unshift(newOrder);
    this.clearCart();
    this.persist();
    this.emit('order:placed', newOrder);
    return newOrder;
  }

  /* --- ADMIN PRODUCT CRUD --- */
  saveProduct(productData) {
    if (productData.id) {
      const idx = this.state.products.findIndex(p => p.id === productData.id);
      if (idx > -1) {
        this.state.products[idx] = { ...this.state.products[idx], ...productData };
      }
    } else {
      const newProduct = {
        id: 'prod-' + (this.state.products.length + 1).toString().padStart(3, '0'),
        slug: productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        rating: 5.0,
        reviewCount: 1,
        ...productData
      };
      this.state.products.unshift(newProduct);
    }
    this.persist();
    this.emit('products:changed', this.state.products);
  }

  deleteProduct(productId) {
    this.state.products = this.state.products.filter(p => p.id !== productId);
    this.persist();
    this.emit('products:changed', this.state.products);
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.state.orders.find(o => o.orderId === orderId);
    if (order) {
      order.orderStatus = newStatus;
      this.persist();
      this.emit('orders:changed', this.state.orders);
    }
  }

  updateQuoteStatus(quoteId, newStatus, adminNotes = '') {
    const quote = this.state.quotes.find(q => q.id === quoteId);
    if (quote) {
      quote.status = newStatus;
      if (adminNotes) quote.adminNotes = adminNotes;
      this.persist();
      this.emit('quotes:changed', this.state.quotes);
    }
  }

  updateCMSContent(updatedCMS) {
    this.state.cms = { ...this.state.cms, ...updatedCMS };
    this.persist();
    this.emit('cms:changed', this.state.cms);
  }
}

// Global Singleton Export
window.store = new CommerceStore();
