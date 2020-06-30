<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'ExchangeRates' | localize}}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{'Currency' | localize}}</th>
            <th>{{'ExchangeRate' | localize}}</th>
            <th>{{'Date' | localize}}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="currency in currencies" :key="currency">
            <td>{{currency}}</td>
            <td>{{getCurrency(currency) | currency(info.currency)}}</td>
            <td>{{date | date('date')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'HomeCurrency',
    props: {
      rates: Object,
      date: String
    },
    data: () => ({
      currencies: ['RUB', 'USD', 'EUR']
    }),
    computed: {
      ...mapGetters(['info'])
    },
    methods: {
      getCurrency(currency) {
        return ( (this.rates[this.info.currency] || 1) / (this.rates[currency] || 1) )
      }
    }
  }
</script>
