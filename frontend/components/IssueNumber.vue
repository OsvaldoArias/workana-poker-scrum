<template>
  <div>
    <label>
      {{ status }} Issue # {{ issue }} created by {{ created }} -- Total
      <b-badge v-if="totalIssue > 0">{{ totalIssue }}</b-badge>
      <b-badge v-else>{{ from }}</b-badge>
    </label>
  </div>
</template>

<script>
export default {
  props: ['status', 'issue', 'created', 'from'],
  data() {
    return {
      totalIssue: 0,
      listNoti: [],
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({ name: 'main' })
    this.socket.on('issue', (msg, cb) => {
      const { payload } = msg
      this.listNoti = [payload, ...this.listNoti]
      this.totalIssue = payload.totalIssues
      this.$emit('list-noti', this.listNoti)
    })
  },
}
</script>

<style></style>
