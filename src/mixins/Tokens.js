import Vuex from "vuex";
import {mapMutations, mapGetters} from "vuex";

export default {
  methods: {
    ...mapMutations(['setToken', 'clearToken']),
    ...mapGetters(['getToken']),
  },
}
