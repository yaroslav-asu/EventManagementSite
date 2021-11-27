import {ref} from "vue";

export default {
  state: {
    personsList: ref([])
  },
  mutations: {
    addPersons(state, person) {
      state.personsList.push(person)
      // state.personsList.push(person)
    }
  },
  getters: {
    getPersons(state) {
      return state.personsList
    }
  }
}
