<template>
  <div class="row ">
    <Card v-for="el in this.sp" :key="el"
          :name="el.name"
          :location="el.location"
          :info="el.full_info"
          :time="el.time"
    ></Card>
  </div>
</template>

<script>
import axios from "axios";
import ServerIp from "src/global_values/ServerIp";
import Tokens from "src/mixins/Tokens";
import Card from "components/Card";

export default {
  name: "account",
  mixins: [
    Tokens,
  ],
  components: {
    Card,
  },
  mounted() {
    this.fun()
  },
  methods: {
    a() {
      console.log(this.userId)
    },
    fun() {
      let sp
      axios.get(ServerIp.serverIp + "api/auth/user/", {
        headers: {
          Authorization: "Token " + this.getToken()
        }
      })
        .then(response => {
          // console.log(response)
          axios.get(ServerIp.serverIp + 'api/activities?event_id=&speakers=' + response.data.pk).then(res => {
            this.sp = res.data.results
          })
        })

    },
    getId() {
      let id
      axios.get(ServerIp.serverIp + "api/auth/user/", {
        headers: {
          Authorization: "Token " + this.getToken()
        }
      })
        .then(response => {
          id = response.data.pk
          // console.log(response.data.pk)
        })
      return id
    },
    getData() {

    }
  },
  data() {
    let id = this.getId()
    return {
      id,
      userId: "",
      sp: [
        {
          name: "asdf",
          location: "asdf",
          info: "asdf",
          time: "asdfasddf"
        },
        {
          name: "asdf",
          location: "asdf",
          info: "asdf",
          time: "asdfasddf"
        },
        {
          name: "asdf",
          location: "asdf",
          info: "asdf",
          time: "asdfasddf"
        },
        {
          name: "asdf",
          location: "asdf",
          info: "asdf",
          time: "asdfasddf"
        },
        {
          name: "asdf",
          location: "asdf",
          info: "asdf",
          time: "asdfasddf"
        },
        {
          name: "asdf",
          location: "asdf",
          info: "asdf",
          time: "asdfasddf"
        },
        {
          name: "asdf",
          location: "asdf",
          info: "asdf",
          time: "asdfasddf"
        },
        {
          name: "asdf",
          location: "asdf",
          info: "asdf",
          time: "asdfasddf"
        },
      ],
      elems: [],
    }
  }
}
</script>

<style scoped>

</style>
