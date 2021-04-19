<template>
  <div
    @click="handleSelect"
    class="card m-3"
    :class="{ active: vote === voted }"
  >
    <p>{{ vote }}</p>
  </div>
</template>

<script>
export default {
  props: ['vote', 'issue', 'voted'],
  mounted() {
    this.socket = this.$nuxtSocket({ name: 'main' })
    this.socket.on('votedIssue', (msg, cb) => {
      const { payload } = msg
      if (this.issue === payload.issue) {
        this.$nuxt.refresh()
      }
      this.listReveal = [payload, ...this.listReveal]
      this.$emit('list-reveal', this.listReveal)
    })
  },
  data() {
    return {
      data: '',
      listReveal: [],
    }
  },
  methods: {
    async handleSelect() {
      if (this.voted != '') {
        this.$emit('vote-status', { status: 'vote already registered' })
      } else {
        try {
          this.data = await this.$axios.$post(`/issues/${this.issue}/vote`, {
            vote: this.vote,
          })
          this.socket.emit('votedIssue', this.issue)
          this.$emit('update-issue', { issue: this.data, voted: this.vote })
          this.$emit('vote-status', { status: 'vote registered correctly' })
        } catch (error) {
          console.error(error)
        }
      }
    },
  },
}
</script>

<style>
.card {
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e76f51;
  color: #fff;
  cursor: pointer;
}
.card.active {
  background: #2a9d8f;
}
p {
  font-size: 30px;
}
</style>
