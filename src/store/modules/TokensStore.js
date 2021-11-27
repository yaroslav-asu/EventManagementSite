export default {
  state: {
    token: ""
  },
  mutations: {
    setToken(state, newToken){
      state.token = newToken
    },
    clearToken(state){
      state.token = ""
    }
  },
  getters:{
    getToken(state){
      return state.token
    }
  }
}
