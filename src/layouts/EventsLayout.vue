<template>
  <HeaderLayout/>

  <div class="content row">
    <EventCard
      v-for="event in a"
      :key="event"
      :reg-expiration-date="event.date_time_start"
      :title="event.title"
      :id="event.id"
    />
  </div>
</template>

<script>
import HeaderLayout from "layouts/HeaderLayout";
import EventCard from "components/EventCard";
import axios from "axios";
import Constants from "src/mixins/Constants.js";
import ShowError from "src/mixins/ShowError";
import ServerIp from "src/global_values/ServerIp";
import {ref} from "vue";

export default {
  name: "EventsLayout",
  mixins: [
    ShowError,
    // Constants,
  ],
  components: {
    HeaderLayout,
    EventCard,
  },
  mounted() {


  },
  data() {
    let a = ref([])
    axios.get(ServerIp.serverIp + 'api/events/')
      .then(res => {
        console.log(res)
        for (let i = 0; i < 3; i++) {
          a.value.push(res.data.results[i])
        }
      }).catch(err => {
      this.showError(err)
    })
    console.log(a)
    return {
      a,
    }
  }
}
</script>

<style scoped>

</style>
