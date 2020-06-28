<template>
  <div>
    <div class="page-title">
      <h3>{{'Account' | localize}}</h3>
      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading"/>
    <div v-else class="row">
      <HomeBill :rates="currency.rates"/>
      <HomeCurrency :rates="currency.rates" :date="currency.date"/>
    </div>
  </div>
</template>

<script>
  import HomeBill from '@/components/HomeBill';
  import HomeCurrency from '@/components/HomeCurrency';
  import localizeFilter from '@/filters/localize.filter';

  export default {
    name: "Home",
    metaInfo() {
      return {
        title: localizeFilter('Account'),
        titleTemplate: `%s | ${localizeFilter('CRM_Title')}`
      }
    },
    data: () => ({
      loading: true,
      currency: null
    }),
    async mounted() {
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
    methods: {
      async refresh() {
        this.loading = true;
        this.currency = await this.$store.dispatch('fetchCurrency');
        this.loading = false;
      }
    },
    components: {
      HomeBill, HomeCurrency
    }
  };
</script>
