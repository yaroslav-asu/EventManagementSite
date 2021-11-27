export default {
  state: {
    token: "",
    externalState: {
      event: null,
      user: null
    }
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    },
    clearToken(state) {
      state.token = ""
    },
    setEventUser(state, event, user) {
      state.externalState.event = event;
      state.externalState.user = user;
    }
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getEventUser(state) {
      return {event: state.externalState.event, user: state.externalState.user}
    }
  }
}

