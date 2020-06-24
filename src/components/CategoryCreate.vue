<template>
  <div>
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>

    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="title"
          :class="{invalid: $v.title.$error}"
        >
        <label for="name">Название</label>
        <span class="helper-text invalid" v-if="$v.title.$error">
            Введите название категории
          </span>
      </div>

      <div class="input-field">
        <input
          id="limit"
          type="number"
          v-model.number="limit"
          :class="{invalid: $v.limit.$error}"
        >
        <label for="limit">Лимит</label>
        <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.required">
            Поле не должно быть пустым
          </span>
        <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">
            Минимальная величина {{$v.limit.$params.minValue.min}}
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {required, minValue} from 'vuelidate/lib/validators';

  export default {
    name: 'CategoryCreate',
    data: () => ({
      title: '',
      limit: 100
    }),
    mounted() {
      M.updateTextFields() // eslint-disable-line no-undef
    },
    validations: {
      title: {required},
      limit: {required, minValue: minValue(100)}
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }

        const formData = {
          title: this.title,
          limit: this.limit
        };

        try {
          const category = await this.$store.dispatch('createCategory', formData);
          this.$message(`Категория '${this.title}' успешно создана`);
          this.title = '';
          this.limit = this.$v.limit.$params.minValue.min;
          this.$emit('categoryCreated', category);
          this.$v.$reset();
        } catch (e) {} // eslint-disable-line no-useless-catch, no-empty

      }
    }
  }
</script>
