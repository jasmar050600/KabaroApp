<template>
  <div class="currency-widget">
    <div class="widget-container">
      <h2 class="widget-title">
        Philippine Peso Exchange Rates
        <span class="update-time">as of {{ currentDateTime }}</span>
      </h2>
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        Loading rates...
      </div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="rates-container">
        <div class="rates-grid">
          <div v-for="(rate, currency) in sortedExchangeRates" :key="currency" class="rate-card">
            <img :src="getFlagUrl(currency)" :alt="`${currency} flag`" class="currency-flag" />
            <div class="currency-code">{{ currency }}</div>
            <div class="exchange-rate">
              1 {{ currency }} = ₱{{ formatRate(rate) }}
            </div>
            <div class="currency-name">{{ currencyNames[currency] }}</div>
          </div>
        </div>
      </div>
      <div class="last-updated">
        Last updated: {{ lastUpdated }}
      </div>
    </div>
  </div>
</template>

<script>
import euroFlag from '@/assets/icons/european-union.png'

export default {
  name: 'Currency',
  data() {
    return {
      exchangeRates: {},
      currencyNames: {
        USD: 'US Dollar',
        EUR: 'Euro',
        JPY: 'Japanese Yen',
        GBP: 'British Pound',
        AUD: 'Australian Dollar',
        CAD: 'Canadian Dollar',
        CHF: 'Swiss Franc',
        CNY: 'Chinese Yuan',
        HKD: 'Hong Kong Dollar',
        SGD: 'Singapore Dollar',
        AED: 'UAE Dirham',
        SAR: 'Saudi Riyal',
        KRW: 'Korean Won',
        THB: 'Thai Baht',
        MYR: 'Malaysian Ringgit',
        IDR: 'Indonesian Rupiah'
      },
      countryCodes: {
        USD: 'US',
        EUR: 'EU',
        JPY: 'JP',
        GBP: 'GB',
        AUD: 'AU',
        CAD: 'CA',
        CHF: 'CH',
        CNY: 'CN',
        HKD: 'HK',
        SGD: 'SG',
        AED: 'AE',
        SAR: 'SA',
        KRW: 'KR',
        THB: 'TH',
        MYR: 'MY',
        IDR: 'ID'
      },
      loading: true,
      error: null,
      lastUpdated: null,
      updateTimer: null
    }
  },
  computed: {
    currentDateTime() {
      return new Date().toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    },
    sortedExchangeRates() {
      const sortOrder = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 
                         'HKD', 'SGD', 'AED', 'SAR', 'KRW', 'THB', 'MYR', 'IDR'];
      return Object.fromEntries(
        sortOrder
          .filter(currency => this.exchangeRates.hasOwnProperty(currency))
          .map(currency => [currency, this.exchangeRates[currency]])
      );
    }
  },
  methods: {
    async fetchRates() {
      try {
        this.loading = true
        this.error = null
        
        const response = await fetch('https://api.fxratesapi.com/latest', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer fxr_live_d54960eb4dcd8cfd6c51d1ed5de3dbf7f043',
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        
        const relevantCurrencies = Object.keys(this.currencyNames)
        const phpRate = data.rates.PHP
        
        this.exchangeRates = Object.fromEntries(
          relevantCurrencies.map(currency => [
            currency,
            phpRate / data.rates[currency]
          ])
        )
        
        this.lastUpdated = new Date().toLocaleString('en-PH', {
          timeZone: 'Asia/Manila',
          timeStyle: 'medium'
        })
      } catch (err) {
        this.error = 'Failed to load exchange rates. Please try again later.'
        console.error('Error fetching rates:', err)
      } finally {
        this.loading = false
      }
    },
    getFlagUrl(currency) {
      if (currency === 'EUR') {
        return euroFlag
      }
      const countryCode = this.countryCodes[currency]
      return `https://flagsapi.com/${countryCode}/shiny/64.png`
    },
    formatRate(rate) {
      return rate < 0.01 ? rate.toFixed(4) : rate.toFixed(2)
    }
  },
  async mounted() {
    await this.fetchRates()
    this.updateTimer = setInterval(this.fetchRates, 60000) // Update every minute
  },
  beforeUnmount() {
    if (this.updateTimer) {
      clearInterval(this.updateTimer)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.currency-widget {
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Poppins', sans-serif;
}

.widget-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  padding: 2.5rem;
}

.widget-title {
  text-align: center;
  color: #1a202c;
  margin-bottom: 2.5rem;
  font-size: 2rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.update-time {
  font-size: 1rem;
  color: #718096;
  font-weight: 400;
}

.rates-container {
  margin-bottom: 2rem;
}

.rates-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
}

.rate-card {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rate-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.currency-flag {
  width: 48px;
  height: 48px;
  margin-bottom: 0.75rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.currency-code {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.exchange-rate {
  font-size: 0.9rem;
  color: #38a169;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.currency-name {
  font-size: 0.8rem;
  color: #718096;
}

.last-updated {
  text-align: center;
  font-size: 0.9rem;
  color: #718096;
  margin-top: 2rem;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #718096;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.spinner {
  border: 4px solid #e2e8f0;
  border-top: 4px solid #4299e1;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

.error {
  text-align: center;
  padding: 2rem;
  color: #e53e3e;
  font-weight: 500;
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 1200px) {
  .rates-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .widget-container {
    padding: 1.5rem;
  }
  
  .rates-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .rate-card {
    padding: 0.75rem;
  }

  .currency-code {
    font-size: 1rem;
  }

  .exchange-rate {
    font-size: 0.8rem;
  }

  .currency-name {
    font-size: 0.7rem;
  }
}
</style>