import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import tokensStore from "src/store/modules/TokensStore";
import PersonsListStore from "src/store/modules/PersonsListStore";

export default new Vuex.Store({
  modules:{
    tokensStore,
    PersonsListStore,
  },
  plugins: [createPersistedState()]
})
