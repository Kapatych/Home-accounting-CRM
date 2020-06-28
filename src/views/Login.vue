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
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{'Login' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'NoAccount' | localize}}
        <router-link to="/register">{{'Register' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, required, minLength} from 'vuelidate/lib/validators';
  import messages from '@/utils/messages';
  import localizeFilter from '@/filters/localize.filter';

  export default {
    name: 'Login',
    metaInfo() {
      return {
        title: localizeFilter('Login'),
        titleTemplate: `%s | ${localizeFilter('CRM_Title')}`
      }
    },
    data: () => ({
      email: '',
      password: ''
    }),
    mounted() {
      if (messages[this.$route.query.message]) {
        this.$message(localizeFilter(messages[this.$route.query.message]))
      }
    },
    validations: {
      email: {
        email, required
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }

        const loginData = {
          email: this.email,
          password: this.password
        };

        try {
          await this.$store.dispatch('login', loginData);
          this.$router.history.push('/')
        } catch (e) {} // eslint-disable-line no-useless-catch, no-empty

      }
    }
  }
</script>
