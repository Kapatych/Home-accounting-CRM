<template>
  <div>
    <div class="page-title">
      <h3>{{'History' | localize}}</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">
      {{'Message_NotRecords' | localize}}
      <router-link to="/record">{{'Message_AddRecord' | localize}}</router-link>
    </p>

    <section v-else>
      <div class="history-chart">
        <DoughnutChart :chartdata="chartdata" />
      </div>

      <HistoryTable :records="items" :startPageNumber="startPageNumber" />

      <Paginate v-if="pageCount > 1"
                v-model="page"
                :page-count="pageCount"
                :click-handler="changePageHandler"
                :prev-text="'Prev' | localize"
                :next-text="'Next' | localize"
                :container-class="'pagination'" />
    </section>
  </div>
</template>

<script>
  import PaginationMixin from "@/mixins/pagination.mixin";
  import HistoryTable from "@/components/HistoryTable";
  import DoughnutChart from "@/components/DoughnutChart";
  import localizeFilter from '@/filters/localize.filter';

  export default {
    name: 'History',
    mixins: [PaginationMixin],
    data: () => ({
      loading: true,
      records: [],
      categories: []
    }),
    watch: {
      '$route'(to){
        if (!to.query.page){
          this.changePageHandler(1);
          this.page = 1;
        }
      }
    },
    computed: {
      startPageNumber() {
        return this.records.length - ((this.page - 1) * this.pageSize)
      },
      chartdata() {
        return {
          labels: this.categories.map(cat => cat.title),
          datasets: [
            {
              label: localizeFilter('OutcomeForCategories'),
              data: this.categories.map(cat => {
                return this.records.reduce((total, rec) => {
                  if (rec.categoryId === cat.id && rec.type === 'outcome') {
                    total += +rec.amount
                  }

                  return total
                }, 0)
              }),
              backgroundColor: [
                '#9c27b0', '#ffeb3b', '#2196f3', '#e91e63',
                '#00bcd4', '#f44336', '#8bc34a', '#3f51b5',
              ],
            }
          ]
        }
      }
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.records = await this.$store.dispatch('fetchRecords');

      this.initPagination(this.records.map(record => ({
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome'),
      })).reverse());

      this.loading = false;
    },
    components: {
      DoughnutChart,
      HistoryTable
    }
  }
</script>
