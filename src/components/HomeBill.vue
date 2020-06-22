<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line"
           v-for="currency in currencies"
           :key="currency"
        >
          <span>{{getCurrency(currency) | currency(currency)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-bill',
    props: {
      rates: Object
    },
    data: () => ({
      currencies: ['RUB', 'USD', 'EUR']
    }),
    computed: {
      base() {
        return this.$store.getters.info.bill / this.rates['RUB']
      }
    },
    methods: {
      getCurrency(currency) {
        return (this.base * this.rates[currency]).toFixed(2)
      }
    }
  }
</script>
