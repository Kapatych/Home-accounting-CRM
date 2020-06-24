<template>
  <div class="app-main-layout">

    <Navbar @toggleSidebar="sidebarOpen = !sidebarOpen"/>
    <Sidebar v-model="sidebarOpen"/>

    <main class="app-content" :class="{full: !sidebarOpen}">
      <Loader v-if="loading" />
      <div class="app-page" v-else>
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/app/Navbar';
  import Sidebar from '@/components/app/Sidebar';
  import {mapGetters} from 'vuex';
  import messages from "@/utils/messages";

  export default {
    name: 'main-layout',
    data: () => ({
      sidebarOpen: true,
      loading: true
    }),
    computed: mapGetters(['error']),
    watch: {
      error(firebaseError) {
        this.$error(messages[firebaseError.code] || 'Что-то пошло не так')
      }
    },
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }
      this.loading = false
    },
    components: {
      Navbar, Sidebar
    }
  }
</script>
