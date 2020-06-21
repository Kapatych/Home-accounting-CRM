<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>


<script>
  import messages from "@/utils/messages";
  import {mapGetters} from 'vuex';

  export default {
    computed: mapGetters(['error']),
    watch: {
      error(firebaseError) {
        this.$error(messages[firebaseError.code] || 'Что-то пошло не так')
      }
    }
  }
</script>
