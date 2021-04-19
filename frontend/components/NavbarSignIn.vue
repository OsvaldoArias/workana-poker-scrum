<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#">
        <img
          src="https://wkncdn.com/newx/assets/build/img/workana-logo-2x.9e13d14c2.png"
          alt="logo workana"
        />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="SignOut">Sign Out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  mounted() {
    this.socket = this.$nuxtSocket({ name: 'main' })
  },
  methods: {
    async SignOut() {
      await this.$store.dispatch('handleSingOut')
      this.socket.emit('users')
      this.$router.go('/')
    },
  },
}
</script>
<style scoped>
img {
  width: 120px;
}
</style>
