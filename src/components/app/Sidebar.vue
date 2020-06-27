<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      :exact="link.exact"
      tag="li"
      active-class="active"
    >
      <a href="#" class="pointer">{{link.title | localize}}</a>
    </router-link>

  </ul>
</template>

<script>
  export default {
    name: 'Sidebar',
    props: {
      value: Boolean
    },
    data: () => ({
      links: [
        {title: 'Account', url: '/', exact: true},
        {title: 'History', url: '/history'},
        {title: 'Planning', url: '/planning'},
        {title: 'NewRecord', url: '/record'},
        {title: 'Categories', url: '/categories'},
      ]
    })
  }
</script>
