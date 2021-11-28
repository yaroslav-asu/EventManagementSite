import {ref} from "vue";

export default {
  state: {
    sponsorsList: ref([])
  },
  mutations: {
    addSponsors(state, person) {
      state.sponsorsList.push(person)
      // state.personsList.push(person)
    },
    clearSponsors(state){
      state = ref([])
    }
  },
  getters: {
    getSponsors(state) {
      return state.sponsorsList
    }
  }
}
