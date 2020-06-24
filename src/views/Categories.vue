<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <div class="col s12 m6">
          <CategoryCreate @categoryCreated="addCategory"/>
        </div>
        <div class="col s12 m6">
          <CategoryEdit v-if="categories.length"
                        :key="categories.length"
                        :categories="categories"
                        @categoryUpdated="updateCategory"
                        @categoryRemoved="removeCategory"/>
          <p class="center" v-else>Категорий пока нет</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from '@/components/CategoryCreate';
  import CategoryEdit from '@/components/CategoryEdit';

  export default {
    name: 'Categories',
    data: () => ({
      categories: [],
      loading: true
    }),
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
    },
    methods: {
      addCategory(category) {
        this.categories.push(category)
      },
      updateCategory(category) {
        const index = this.categories.findIndex(cat => cat.id === category.id);
        this.categories.splice(index, 1, category);
      },
      removeCategory(categoryId) {
        const index = this.categories.findIndex(cat => cat.id === categoryId);
        this.categories.splice(index, 1);
      }
    },
    components: {CategoryCreate, CategoryEdit}
  }
</script>
