<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'CRM_Title' | localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: $v.email.$error}"
        >
        <label for="email">{{'Email' | localize}}</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">
          {{'Message_FieldNotEmpty' | localize}}
        </small>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.email">
          {{'Message_EnterEmail' | localize}}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: $v.password.$error}"
        >
        <label for="password">{{'Password' | localize}}</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">
          {{'Message_FieldNotEmpty' | localize}}
        </small>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.minLength">
          {{'Message_PassMinLength' | localize}} {{$v.password.$params.minLength.min}}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$error}"
        >
        <label for="name">{{'Name' | localize}}</label>
        <small class="helper-text invalid" v-if="$v.name.$error">
          {{'Message_FieldNotEmpty' | localize}}
        </small>
      </div>

      <div class="row">
        <div class="col s6">
          <div class="input-field">
            <input
              id="startBill"
              type="number"
              v-model.number="startBill"
              :class="{invalid: $v.startBill.$error}"
            >
            <label for="startBill" :class="{active: startBill}"> {{'StartBill' | localize}}</label>
            <span class="helper-text invalid" v-if="$v.startBill.$dirty && !$v.startBill.required">
            {{'Message_FieldNotEmpty' | localize}}
          </span>
            <span class="helper-text invalid" v-if="$v.startBill.$dirty && !$v.startBill.minValue">
            {{'MinValue' | localize}} {{$v.startBill.$params.minValue.min}}
          </span>
          </div>
        </div>
        <div class="col s6">
          <div class="input-field">
            <select ref="select" v-model="currency">
              <option v-for="currency in ['RUB', 'USD', 'EUR']" :key="currency" :value="currency">
                {{currency}}
              </option>
            </select>
            <label>{{'SelectCurrency' | localize}}</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <div class="switch">
            <label>
              English
              <input type="checkbox" v-model="isRuLocale" @change="changeSwitchHandler">
              <span class="lever"></span>
              Русский
            </label>
          </div>
        </div>
        <div class="col s6">
          <p>
            <label>
              <input type="checkbox" v-model="agree" />
              <span>{{'AcceptRules' | localize}}</span>
            </label>
          </p>
        </div>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{'Register' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'HasAccount' | localize}}
        <router-link to="/login">{{'Login' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, required, minLength, minValue} from 'vuelidate/lib/validators'
  import localizeFilter from '@/filters/localize.filter';

  export default {
    name: 'Register',
    metaInfo() {
      return {
        title: localizeFilter('Register'),
        titleTemplate: `%s | ${localizeFilter('CRM_Title')}`
      }
    },
    data: () => ({
      email: '',
      password: '',
      name: '',
      startBill: 1,
      currency: 'RUB',
      agree: false,
      isRuLocale: true,
    }),
    validations: {
      email: {
        email, required
      },
      password: {
        required,
        minLength: minLength(6)
      },
      name: {
        required
      },
      startBill: {
        required,
        minValue: minValue(1)
      },
      agree: {checked: v => v}
    },
    mounted() {
      M.FormSelect.init(this.$refs.select); // eslint-disable-line no-undef
    },
    methods: {
      changeSwitchHandler() {
        localStorage.setItem('locale', this.isRuLocale ? 'ru-RU' : 'en-US');
      },
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }

        const locale = this.isRuLocale ? 'ru-RU' : 'en-US';

        const regData = {
          email: this.email,
          password: this.password,
          name: this.name,
          bill: this.startBill,
          currency: this.currency,
          locale,
        };

        try {
          await this.$store.dispatch('register', regData);
          localStorage.setItem('locale', locale);
          this.$router.history.push('/');
        } catch (e) {} // eslint-disable-line no-useless-catch, no-empty
      }
    }
  }
</script>

<style scoped>
  .row {
    margin: 0 -0.75rem;
  }
</style>
