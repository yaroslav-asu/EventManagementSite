import {ref} from "vue";

export default {
  state: {
    vipsList: ref([])
  },
  mutations: {
    addVips(state, person) {
      state.vipsList.push(person)
      // state.personsList.push(person)
    }
  },
  getters: {
    getVips(state) {
      return state.vipsList
    }
  }
}
