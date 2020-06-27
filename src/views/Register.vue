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
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{'AcceptRules' | localize}}</span>
        </label>
      </p>
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
  import {email, required, minLength} from 'vuelidate/lib/validators'

  export default {
    name: 'Register',
    data: () => ({
      email: '',
      password: '',
      name: '',
      agree: false
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
      agree: {checked: v => v}
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }

        const regData = {
          email: this.email,
          password: this.password,
          name: this.name
        };

        try {
          await this.$store.dispatch('register', regData);
          this.$router.history.push('/')
        } catch (e) {} // eslint-disable-line no-useless-catch, no-empty


      }
    }
  }
</script>
