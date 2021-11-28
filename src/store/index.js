import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import tokensStore from "src/store/modules/TokensStore";
import ModeratorsList from "src/store/modules/ModeratorsList";
import SpeakersPersons from "src/store/modules/SpeakersPersons";
import SponsorsPersons from "src/store/modules/SponsorsPersons";
import VipsListStore from "src/store/modules/VipsListStore";
export default new Vuex.Store({
  modules:{
    tokensStore,
    VipsListStore,
    SponsorsPersons,
    SpeakersPersons,
    ModeratorsList,
  },
  plugins: [createPersistedState()]
})
