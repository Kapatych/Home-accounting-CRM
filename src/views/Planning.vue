<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency}}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет. <router-link to="/categories">Создать новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend | currency}} из {{category.limit | currency}}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
            class="determinate"
            :class="category.progressColor"
            :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import currencyFilter from '@/filters/currency.filter';

  export default {
    name: 'planning',
    data: () => ({
      loading: true,
      categories: []
    }),
    computed: {
      ...mapGetters(['info'])
    },
    async mounted() {
      const categories = await this.$store.dispatch('fetchCategories');
      const records = await this.$store.dispatch('fetchRecords');

      this.categories = categories.map(cat => {
        const spend = records
          .filter(rec => rec.categoryId === cat.id)
          .filter(rec => rec.type === 'outcome')
          .reduce((sum, record) => {
            return sum += +record.amount
          }, 0);

        const percent = spend / cat.limit * 100;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red';

        const tooltipValue = cat.limit - spend;
        const tooltip = (tooltipValue < 0 ? 'Превышение на ' : 'Осталось ') + currencyFilter(Math.abs(tooltipValue));

        return {
          ...cat,
          spend,
          progressPercent,
          progressColor,
          tooltip
        }
      });

      this.loading = false
    }
  }
</script>
