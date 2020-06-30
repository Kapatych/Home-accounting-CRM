<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{'Total' | localize}}</th>
      <th>{{'Date' | localize}}</th>
      <th>{{'Category' | localize}}</th>
      <th>{{'Type' | localize}}</th>
      <th>{{'Open' | localize}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) in records" :key="record.id">
      <td>{{ startPageNumber - index }}</td>
      <td>{{ record.amount | currency(info.currency) }}</td>
      <td>{{ record.date | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span class="white-text badge" :class="record.typeClass">
          {{ record.typeText }}
        </span>
      </td>
      <td>
        <button class="btn-small btn" @click="$router.push(`/detail/${record.id}`)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    props: {
      records: {
        type: Array,
        require: true
      },
      startPageNumber: Number
    },
    computed: {
      ...mapGetters(['info'])
    },
  }
</script>
