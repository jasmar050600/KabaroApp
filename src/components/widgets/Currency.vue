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
      <div v-else class="carousel-container" ref="carousel" @mousedown="startDrag" @mousemove="drag" @mouseup="endDrag"
        @mouseleave="endDrag" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag">
        <div class="carousel-track" :style="{ transform: `translateX(${-offset}px)` }">
          <div v-for="currency in duplicatedRates" :key="currency.code" class="rate-card">
            <img :src="getFlagUrl(currency.code)" :alt="`${currency.code} flag`" class="currency-flag" />
            <div class="currency-code">{{ currency.code }}</div>
            <div class="exchange-rate">
              1 {{ currency.code }} = ₱{{ formatRate(currency.rate) }}
            </div>
            <div class="currency-name">{{ currencyNames[currency.code] }}</div>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import euroFlag from '@/assets/icons/european-union.png'

export default {
  name: 'Currency',
  setup() {
    const carousel = ref(null)
    const offset = ref(0)
    const cardWidth = ref(0)
    const isDragging = ref(false)
    const startX = ref(0)
    const startOffset = ref(0)
    const exchangeRates = ref({})
    const loading = ref(true)
    const error = ref(null)
    const lastUpdated = ref(null)
    let updateTimer = null

    const currencyNames = {
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
    }

    const countryCodes = {
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
    }

    const currentDateTime = computed(() => {
      return new Date().toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    })

    const sortedRates = computed(() => {
      const sortOrder = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY',
        'HKD', 'SGD', 'AED', 'SAR', 'KRW', 'THB', 'MYR', 'IDR']
      
      return sortOrder
        .filter(currency => exchangeRates.value.hasOwnProperty(currency))
        .map(currency => ({
          code: currency,
          rate: exchangeRates.value[currency]
        }))
    })

    const duplicatedRates = computed(() => [...sortedRates.value, ...sortedRates.value, ...sortedRates.value])

    const startDrag = (e) => {
      isDragging.value = true
      startX.value = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
      startOffset.value = offset.value
      if (carousel.value) {
        carousel.value.style.cursor = 'grabbing'
      }
    }

    const drag = (e) => {
      if (!isDragging.value) return
      const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
      const diff = startX.value - currentX
      offset.value = startOffset.value + diff
      checkBoundary()
    }

    const endDrag = () => {
      isDragging.value = false
      if (carousel.value) {
        carousel.value.style.cursor = 'grab'
      }
    }

    const checkBoundary = () => {
      const maxOffset = cardWidth.value * sortedRates.value.length
      if (offset.value < 0) {
        offset.value += maxOffset
      } else if (offset.value >= maxOffset) {
        offset.value -= maxOffset
      }
    }

    const getFlagUrl = (currency) => {
      if (currency === 'EUR') {
        return euroFlag
      }
      const countryCode = countryCodes[currency]
      return `https://flagsapi.com/${countryCode}/shiny/64.png`
    }

    const formatRate = (rate) => {
      return rate < 0.01 ? rate.toFixed(4) : rate.toFixed(2)
    }

    const fetchRates = async () => {
      try {
        loading.value = true
        error.value = null
        
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
        
        const relevantCurrencies = Object.keys(currencyNames)
        const phpRate = data.rates.PHP
        
        exchangeRates.value = Object.fromEntries(
          relevantCurrencies.map(currency => [
            currency,
            phpRate / data.rates[currency]
          ])
        )
        
        lastUpdated.value = new Date().toLocaleString('en-PH', {
          timeZone: 'Asia/Manila',
          timeStyle: 'medium'
        })
      } catch (err) {
        error.value = 'Failed to load exchange rates. Please try again later.'
        console.error('Error fetching rates:', err)
      } finally {
        loading.value = false
      }
    }

    let animationId
    const animate = () => {
      offset.value += 0.5
      checkBoundary()
      animationId = requestAnimationFrame(animate)
    }

    onMounted(async () => {
      await fetchRates()
      updateTimer = setInterval(fetchRates, 60000)
      
      if (carousel.value) {
        cardWidth.value = carousel.value.offsetWidth
        animationId = requestAnimationFrame(animate)
      }
    })

    onUnmounted(() => {
      if (updateTimer) {
        clearInterval(updateTimer)
      }
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    })

    return {
      carousel,
      offset,
      currentDateTime,
      duplicatedRates,
      currencyNames,
      loading,
      error,
      lastUpdated,
      startDrag,
      drag,
      endDrag,
      getFlagUrl,
      formatRate
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

.carousel-container {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  cursor: grab;
  padding: 1rem;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.carousel-container:hover {
  border-color: #8dc63f;
}

.carousel-container:active {
  cursor: grabbing;
  border-color: #8dc63f;
}

.carousel-track {
  display: flex;
  transition: transform 0.1s ease;
}

.rate-card {
  flex: 0 0 300px;
  padding: 1.5rem;
  margin-right: 1rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
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

.rate-card:active {
  cursor: grabbing;
  border-color: #8dc63f;
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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .widget-container {
    padding: 1.5rem;
  }
  
  .rate-card {
    flex: 0 0 250px;
    padding: 1rem;
  }

  .widget-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
}
</style>