<template>
  <div>
    <div class="page-title">
      <h3>{{'NewRecord' | localize}}</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">
      {{'Message_NotCategories' | localize}}
      <router-link to="/categories">{{'Message_AddCategory' | localize}}</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="currentCategoryId">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{category.title}}
          </option>
        </select>
        <label>{{'SelectCategory' | localize}}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{'Income' | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{'Outcome' | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$error}"
        >
        <label for="amount" :class="{active: amount}">{{'Total' | localize}}</label>
        <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.required">
          {{'Message_FieldNotEmpty' | localize}}
        </span>
        <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.minValue">
           {{'MinValue' | localize}} {{$v.amount.$params.minValue.min}}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="description"
          :class="{invalid: $v.description.$error}"
        >
        <label for="description">{{'Description' | localize}}</label>
        <span class="helper-text invalid" v-if="$v.description.$error">
          {{'Message_FieldNotEmpty' | localize}}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Create' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import M from 'materialize-css';
  import {required, minValue} from 'vuelidate/lib/validators';
  import {mapGetters} from 'vuex';
  import localizeFilter from '@/filters/localize.filter'

  export default {
    name: 'Record',
    metaInfo() {
      return {
        title: localizeFilter('NewRecord'),
        titleTemplate: `%s | ${localizeFilter('CRM_Title')}`
      }
    },
    data: () => ({
      loading: true,
      categories: [],
      currentCategoryId: null,
      select: null,
      type: 'outcome',
      amount: 1,
      description: ''
    }),
    validations: {
      amount: {required, minValue: minValue(1)},
      description: {required}
    },
    computed: {
      ...mapGetters(['info']),
      canRecord() {
        if (this.type === 'outcome') {
          return this.info.bill >= this.amount
        }
        return true;
      }
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }

        if (this.canRecord) {
          try {
            await this.$store.dispatch('createRecord', {
              categoryId: this.currentCategoryId,
              amount: this.amount,
              description: this.description,
              type: this.type,
              date: new Date().toJSON()
            });

            this.$message(localizeFilter('RecordHasBeenCreated'));

            const bill = this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;

            await this.$store.dispatch('updateInfo', {bill});
            this.amount = this.$v.amount.$params.minValue.min;
            this.description = '';
            this.$v.$reset()
          } catch (e) {} // eslint-disable-line no-useless-catch, no-empty
        } else {
          this.$message(localizeFilter('NotEnoughMoney') + this.info.bill)
        }
      }
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
      if (this.categories.length) {
        this.currentCategoryId = this.categories[0].id
      }
      this.$nextTick(() => {
        this.select = M.FormSelect.init(this.$refs.select);
      })
    },
    beforeDestroy() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    }
  }
</script>
