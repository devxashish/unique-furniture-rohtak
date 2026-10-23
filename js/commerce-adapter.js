/**
 * UNIQUE FURNITURE ROHTAK — COMMERCE ADAPTER
 * Headless Commerce Connector (Shopify Storefront API & Local Mock Abstraction)
 */

class CommerceAdapter {
  constructor(config = {}) {
    this.mode = config.mode || 'local'; // 'local' | 'shopify' | 'supabase'
    this.shopifyDomain = config.shopifyDomain || '';
    this.storefrontAccessToken = config.storefrontAccessToken || '';
  }

  async fetchCatalog() {
    if (this.mode === 'shopify' && this.shopifyDomain) {
      // Production Shopify Storefront GraphQL query structure
      const query = `
        {
          products(first: 20) {
            edges {
              node {
                id
                title
                handle
                description
                priceRange { minVariantPrice { amount currencyCode } }
                images(first: 3) { edges { node { url altText } } }
              }
            }
          }
        }
      `;
      try {
        const res = await fetch(`https://${this.shopifyDomain}/api/2024-01/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': this.storefrontAccessToken
          },
          body: JSON.stringify({ query })
        });
        const data = await res.json();
        return data.data.products.edges.map(e => e.node);
      } catch (err) {
        console.error('Shopify API fallback to local store:', err);
      }
    }
    // Default: Return Local State
    return window.store.state.products;
  }

  async submitOrder(orderPayload) {
    if (this.mode === 'shopify') {
      // Shopify Draft Order or Checkout API endpoint
      console.log('Dispatching order to Headless Shopify:', orderPayload);
    }
    // Local Store Execution
    return window.store.placeOrder(orderPayload.customer, orderPayload.paymentMethod);
  }
}

window.commerceAdapter = new CommerceAdapter();
