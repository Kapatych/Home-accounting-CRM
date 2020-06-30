<template>
  <div>
    <div class="page-title">
      <h3>{{'Profile' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$error}"
        >
        <label for="description" :class="{active: name.length}">{{'Name' | localize}}</label>
        <small class="helper-text invalid" v-if="$v.name.$error">{{'Message_EnterName' | localize}}</small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import { required } from 'vuelidate/lib/validators';
  import localizeFilter from '@/filters/localize.filter';

  export default {
    name: 'Profile',
    metaInfo() {
      return {
        title: localizeFilter('Profile'),
        titleTemplate: `%s | ${localizeFilter('CRM_Title')}`
      }
    },
    data: () => ({
      name: '',
      isRuLocale: true,
    }),
    computed: {
      ...mapGetters(['info'])
    },
    mounted() {
      this.name = this.info.name;
      this.isRuLocale = this.info.locale === 'ru-RU';
    },
    validations: {
      name: {required}
    },
    methods: {
      ...mapActions(['updateInfo']),
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }

        const locale = this.isRuLocale ? 'ru-RU' : 'en-US';

        try {
          await this.updateInfo({
            name: this.name,
            locale
          });
          localStorage.setItem('locale', locale);
        } catch (e) {} // eslint-disable-line no-useless-catch, no-empty
      }
    },
  }
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
