<template>
  <div class="">

  </div>
</template>

<script>
import axios from "axios";
import ServerIp from "src/global_values/ServerIp";
import Tokens from "src/mixins/Tokens";
export default {
  name: "account",
  mixins: [
    Tokens,
  ],
  mounted() {
    this.getId()
    this.getData()
  },
  methods: {
    getId() {
      let id
      axios.get(ServerIp.serverIp + "api/auth/user/", {
        headers: {
          Authorization: "Token " + this.getToken()
        },
        params:{speakers: id}
      })
        .then(response => {
          console.log(response.data)
          id = response.data.pk
        })
      return id
    },
    getData(){
      axios.get(ServerIp.serverIp + 'api/activities?event_id=&speakers=' + this.getId()).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
