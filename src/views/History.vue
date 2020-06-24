<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">
      Записей пока нет.
      <router-link to="/record">Создать новую запись</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" :startPageNumber="startPageNumber" />

      <Paginate v-if="pageCount > 1"
                v-model="page"
                :page-count="pageCount"
                :click-handler="changePageHandler"
                :prev-text="'Назад'"
                :next-text="'Вперед'"
                :container-class="'pagination'" />
    </section>
  </div>
</template>

<script>
  import PaginationMixin from "@/mixins/pagination.mixin";
  import HistoryTable from "@/components/HistoryTable";

  export default {
    name: 'History',
    mixins: [PaginationMixin],
    data: () => ({
      loading: true,
      records: []
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
      }
    },
    async mounted() {
      const categories = await this.$store.dispatch('fetchCategories');
      this.records = await this.$store.dispatch('fetchRecords');

      this.initPagination(this.records.map(record => ({
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      })).reverse());

      this.loading = false;
    },
    components: {
      HistoryTable
    }
  }
</script>
