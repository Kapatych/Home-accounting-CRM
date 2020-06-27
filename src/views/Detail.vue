<template>
  <div>
    <Loader v-if="loading" />

    <p class="center" v-else-if="!record">{{'Message_NotDetail' | localize}}</p>

    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'History' | localize}}</router-link>
        <a class="breadcrumb">{{ record.typeText | localize }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.typeClass">
            <div class="card-content white-text">
              <p>{{'Description' | localize}}: {{ record.description }}</p>
              <p>{{'Total' | localize}}: {{ record.amount | currency}}</p>
              <p>{{'Category' | localize}}: {{ record.categoryName }}</p>
              <small>{{ record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'Detail',
    data: () => ({
      loading: true,
      record: null,
    }),
    async mounted() {
      const record = await this.$store.dispatch('fetchRecordById', this.$route.params.id);
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);
      this.record = {
        ...record,
        categoryName: category.title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Income' : 'Outcome',
      };
      this.loading = false
    }
  }
</script>
