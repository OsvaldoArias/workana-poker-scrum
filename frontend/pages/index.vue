<template>
  <div class="container animated fadeIn">
    <div class="row justify-content-center align-items-center mt-5">
      <div class="col-md-6">
        <b-alert variant="danger" class="animated fadeIn" :show="alert != ''">
          {{ alert }}
        </b-alert>
        <b-form @submit.prevent="onSubmit">
          <b-form-group
            id="input-group-2"
            label="Your Name:"
            label-for="input-2"
          >
            <select class="form-control" v-model="user">
              <option value="">-- Select a user --</option>
              <option
                v-for="user in users"
                :key="user.userId"
                :value="{ userId: user.userId, userName: user.userName }"
              >
                {{ user.userName }}
              </option>
            </select>
          </b-form-group>
          <b-button v-if="user" type="submit" variant="primary">Send</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.$store.commit('setLoading', true)
    try {
      this.users = await this.$axios.$get('/users')
    } catch (error) {
      console.error('the request could not be made')
    }
    this.$store.commit('setLoading', false)
  },
  data() {
    return {
      user: '',
      users: [],
      alert: '',
    }
  },
  middleware: ['isHaveToken'],
  methods: {
    async onSubmit() {
      this.$store.commit('setLoading', true)
      try {
        const { token } = await this.$axios.$post('/users/singin', {
          userId: this.user.userId,
          userName: this.user.userName,
        })
        this.$store.dispatch('registerUser', {
          token,
          userId: this.user.userId,
          userName: this.user.userName,
        })
        this.$router.push('/poker-scrum/?issue=1')
      } catch (error) {
        if (error.response.data) {
          this.alert = error.response.data
          console.error(error.response.data)
        } else {
          console.error('the request could not be made')
        }
      }
      this.$store.commit('setLoading', false)
    },
  },
}
</script>
