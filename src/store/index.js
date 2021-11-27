import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import tokensStore from "src/store/modules/TokensStore";

export default new Vuex.Store({
  modules: {
    tokensStore,
  },
  plugins: [createPersistedState()]
})
