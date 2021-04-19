<template>
  <div>
    <label for="">Users online {{ usersOnline }}</label>
    <div v-for="user in members" :key="user.userId" class="row m-3 usersCard">
      <div class="col-4">{{ user.value ? '✅' : '' }}</div>
      <div class="col-4">
        {{ user.userId == userId ? user.userName + ' (You)' : user.userName }}
      </div>
      <div class="col-4">{{ user.value }}</div>
    </div>
    <div class="row m-3 usersCard">
      <div class="col-12">
        <p class="text-center">average:{{ avg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['members', 'avg'],
  mounted() {
    this.socket = this.$nuxtSocket({ name: 'main' })
    this.socket.on('users', (msg, cb) => {
      this.usersOnline = msg
    })
    this.socket.emit('users')
  },
  data() {
    return {
      usersOnline: 0,
    }
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId
    },
  },
}
</script>
<style>
.usersCard {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e76f51;
  color: #fff;
  cursor: pointer;
}
.usersCard .col-4 {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
