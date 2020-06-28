<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{'BillInCurrency' | localize}}</span>
        <p class="currency-line" v-for="currency in currencies" :key="currency">
          <span>{{getCurrency(currency) | currency(currency)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeBill',
    props: {
      rates: Object
    },
    data: () => ({
      currencies: ['RUB', 'USD', 'EUR']
    }),
    methods: {
      getCurrency(currency) {
        return (this.$store.getters.info.bill * (this.rates[currency] || 1))
      }
    }
  }
</script>
