// Supabase Integration for Static HTML Pages
// This file provides dynamic data loading for existing static pages

class SupabaseIntegration {
  constructor() {
    this.supabaseUrl = window.ENV?.SUPABASE_URL || 'https://zmgruppmzyzdemxhhkgr.supabase.co';
    this.supabaseKey = window.ENV?.SUPABASE_ANON_KEY || 'your-anon-key-here';
    this.supabase = null;
    this.marketPrices = [];
    this.userData = null;
    this.isAuthenticated = false;

    this.init();
  }

  async init() {
    try {
      // Load Supabase client dynamically
      if (typeof supabase === 'undefined') {
        await this.loadSupabase();
      }

      this.supabase = createClient(this.supabaseUrl, this.supabaseKey);

      // Check authentication status
      const { data: { user } } = await this.supabase.auth.getUser();
      this.isAuthenticated = !!user;

      // Load initial data
      await this.loadMarketPrices();

      // Set up real-time subscriptions
      this.setupRealtimeSubscriptions();

      console.log('Supabase integration initialized');
    } catch (error) {
      console.error('Failed to initialize Supabase:', error);
    }
  }

  async loadSupabase() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://esm.sh/@supabase/supabase-js@2';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async loadMarketPrices() {
    try {
      const { data, error } = await this.supabase
        .from('market_prices')
        .select('*')
        .order('unix_timestamp', { ascending: false })
        .limit(100);

      if (error) throw error;

      this.marketPrices = data || [];
      this.updatePriceDisplays();
    } catch (error) {
      console.error('Failed to load market prices:', error);
    }
  }

  async syncUserData() {
    if (!this.isAuthenticated) return;

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await this.supabase.functions.invoke('sync-user-data', {
        body: { userId: user.id }
      });

      if (error) throw error;

      console.log('User data synced:', data);
      this.updateUserDisplays();
    } catch (error) {
      console.error('Failed to sync user data:', error);
    }
  }

  async getUserFactories() {
    if (!this.isAuthenticated) return [];

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await this.supabase
        .from('user_factories')
        .select('*')
        .eq('user_id', user.id)
        .order('last_sync', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to get user factories:', error);
      return [];
    }
  }

  setupRealtimeSubscriptions() {
    // Subscribe to market price updates
    this.supabase
      .channel('market_prices')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'market_prices'
      }, (payload) => {
        this.marketPrices.unshift(payload.new);
        this.marketPrices = this.marketPrices.slice(0, 100);
        this.updatePriceDisplays();
      })
      .subscribe();

    // Subscribe to user data updates (if authenticated)
    if (this.isAuthenticated) {
      const userTables = [
        'user_factories', 'user_warehouses', 'user_mines',
        'user_special_buildings', 'user_headquarters'
      ];

      userTables.forEach(table => {
        this.supabase
          .channel(`${table}_changes`)
          .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: table
          }, () => {
            this.updateUserDisplays();
          })
          .subscribe();
      });
    }
  }

  updatePriceDisplays() {
    // Update price displays in calculator pages
    const priceElements = document.querySelectorAll('[data-item-id]');
    priceElements.forEach(element => {
      const itemId = element.getAttribute('data-item-id');
      const priceData = this.marketPrices.find(p => p.item_id === parseInt(itemId));

      if (priceData) {
        const priceElement = element.querySelector('.price-value');
        if (priceElement) {
          priceElement.textContent = priceData.price.toLocaleString();
        }

        const changeElement = element.querySelector('.price-change');
        if (changeElement && this.marketPrices.length > 1) {
          const previousPrice = this.marketPrices[1]?.price || priceData.price;
          const change = ((priceData.price - previousPrice) / previousPrice * 100).toFixed(1);
          changeElement.textContent = `${change >= 0 ? '+' : ''}${change}%`;
          changeElement.className = `price-change ${change >= 0 ? 'text-success' : 'text-danger'}`;
        }
      }
    });

    // Update calculator tables
    this.updateCalculatorTables();
  }

  updateCalculatorTables() {
    const tableBody = document.querySelector('#marketPricesTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    this.marketPrices.slice(0, 20).forEach(price => {
      const row = document.createElement('tr');
      const prevPrice = this.marketPrices.find(p => p.item_id === price.item_id && p.id !== price.id);
      const change = prevPrice ? ((price.price - prevPrice.price) / prevPrice.price * 100) : 0;

      row.innerHTML = `
        <td><i class="fas fa-gem mr-2"></i>${price.item_name}</td>
        <td class="text-warning font-weight-bold">${price.price.toLocaleString()}</td>
        <td class="${change >= 0 ? 'text-success' : 'text-danger'}">
          <i class="fas fa-arrow-${change >= 0 ? 'up' : 'down'} mr-1"></i>
          ${change >= 0 ? '+' : ''}${change.toFixed(1)}%
        </td>
        <td><span class="badge badge-info">${price.price > 1000000 ? 'Rare' : price.price > 100000 ? 'Valuable' : 'Common'}</span></td>
      `;

      tableBody.appendChild(row);
    });
  }

  updateUserDisplays() {
    // Update user-specific elements
    if (this.isAuthenticated) {
      document.querySelectorAll('.user-only').forEach(el => {
        el.style.display = 'block';
      });
      document.querySelectorAll('.guest-only').forEach(el => {
        el.style.display = 'none';
      });
    } else {
      document.querySelectorAll('.user-only').forEach(el => {
        el.style.display = 'none';
      });
      document.querySelectorAll('.guest-only').forEach(el => {
        el.style.display = 'block';
      });
    }
  }

  async authenticateUser() {
    try {
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider: 'google', // or other providers
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  // Calculator integration methods
  async getFactoryData(factoryId) {
    const factories = await this.getUserFactories();
    return factories.find(f => f.factory_id === parseInt(factoryId));
  }

  getMarketPrice(itemId) {
    return this.marketPrices.find(p => p.item_id === parseInt(itemId));
  }

  async logout() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
      this.isAuthenticated = false;
      this.updateUserDisplays();
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Utility methods for calculators
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
  }
}

// Global instance
let supabaseIntegration = null;

document.addEventListener('DOMContentLoaded', () => {
  supabaseIntegration = new SupabaseIntegration();

  // Make it globally available
  window.supabaseIntegration = supabaseIntegration;
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SupabaseIntegration;
}