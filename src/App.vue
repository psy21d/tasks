<template>
  <modals-container v-if="$store.state.showModal"></modals-container>
  <RequestList />
</template>

<script>
import RequestList from '@/components/RequestList.vue'

export default {
  name: 'TestApp',
  components: {
    RequestList
  },
}
</script>

<style lang="scss">
@import '@/variables.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  padding: 0;
  margin: 0;
}
</style>
