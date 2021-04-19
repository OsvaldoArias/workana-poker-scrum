export const state = () => ({
  token: '',
  userId: '',
  loading: false,
  userName: '',
})
export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUserId(state, userId) {
    state.userId = userId
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  handleSingOut() {
    this.token = ''
    this.vote = ''
    this.userId = ''
    this.userName = ''
    localStorage.removeItem('token')
  },
  setLoading(state, sta) {
    state.loading = sta
  },
}
export const actions = {
  async nuxtClientInit({ commit }) {
    const token = localStorage.getItem('token')
    if (token) {
      this.$axios.setToken(token)
      try {
        const { data } = await this.$axios.get('users/user')
        commit('setToken', token)
        commit('setUserId', data.userId)
        commit('setUserName', data.userName)
      } catch (error) {
        commit('handleSingOut')
      }
    }
  },
  registerUser({ commit }, data) {
    localStorage.setItem('token', data.token)
    this.$axios.setToken(data.token)
    commit('setToken', data.token)
    commit('setUserId', data.userId)
    commit('setUserName', data.userName)
  },
  async handleSingOut({ commit }) {
    try {
      await this.$axios.get('users/singout')
      commit('handleSingOut')
    } catch (error) {
      console.error(error.response.data)
    }
  },
}
export const getters = {
  getUserId(state) {
    return state.userId
  },
  getLoading(state) {
    return state.loading
  },
}
