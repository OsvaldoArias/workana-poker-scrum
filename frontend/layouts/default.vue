<template>
  <div>
    <Navbar />
    <Nuxt />
    <b-overlay :show="loading" no-wrap></b-overlay>
  </div>
</template>
<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.getLoading
    },
  },
}
</script>
