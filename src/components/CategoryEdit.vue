<template>
  <div>
    <div class="page-subtitle">
      <h4>{{'Edit' | localize}}</h4>
    </div>

    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="currentId">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{category.title}}
          </option>
        </select>
        <label>{{'SelectCategory' | localize}}</label>
      </div>

      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="title"
          :class="{invalid: $v.title.$error}"
        >
        <label for="name">{{'Title' | localize}}</label>
        <span class="helper-text invalid" v-if="$v.title.$error">
            {{'Message_FieldNotEmpty' | localize}}
        </span>
      </div>

      <div class="input-field">
        <input
          id="limit"
          type="number"
          v-model.number="limit"
          :class="{invalid: $v.limit.$error}"
        >
        <label for="limit"> {{'Limit' | localize}}</label>
        <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.required">
            {{'Message_FieldNotEmpty' | localize}}
          </span>
        <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">
            {{'MinValue' | localize}} {{$v.limit.$params.minValue.min}}
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
      <button class="btn waves-effect waves-light red right" type="button" @click="removeHandler">
        {{'Delete' | localize}}
        <i class="material-icons right">delete</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {required, minValue} from 'vuelidate/lib/validators';
  import localizeFilter from '@/filters/localize.filter';

  export default {
    name: 'CategoryEdit',
    data: () => ({
      select: null,
      title: '',
      limit: null,
      currentId: null
    }),
    props: {
      categories: {
        type: Array,
        required: true
      },
    },
    validations: {
      title: {required},
      limit: {required, minValue: minValue(100)}
    },
    watch: {
      currentId(categoryId) {
        const {title, limit} = this.categories.find(cat => cat.id === categoryId);
        this.title = title;
        this.limit = limit;
      }
    },
    methods: {
      selectInit() {
        this.select = M.FormSelect.init(this.$refs.select); // eslint-disable-line no-undef
      },
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }

        const formData = {
          id: this.currentId,
          title: this.title,
          limit: this.limit
        };

        try {
          await this.$store.dispatch('updateCategory', formData);
          this.$message(localizeFilter('CategoryHasBeenUpdated'));
          this.$emit('categoryUpdated', formData);
          this.$nextTick(function () {
            this.select.destroy();
            this.selectInit();
          })
        } catch (e) {} // eslint-disable-line no-useless-catch, no-empty
      },
      async removeHandler() {
        try {
          await this.$store.dispatch('removeCategory', this.currentId);
          this.$message(localizeFilter('CategoryHasBeenDeleted'));
          this.$emit('categoryRemoved', this.currentId);
        } catch (e) {} // eslint-disable-line no-useless-catch, no-empty
      }
    },
    created() {
      const {id, title, limit} = this.categories[0];
      this.title = title;
      this.limit = limit;
      this.currentId = id;
    },
    mounted() {
      M.updateTextFields(); // eslint-disable-line no-undef
      this.selectInit();
    },
    beforeDestroy() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    }
  }
</script>
