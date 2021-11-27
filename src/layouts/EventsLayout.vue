<template>
  <HeaderLayout/>

  <div class="content">
    <EventCard
      v-for="event in events"
      v-bind:key="event"
      v-bind:photo-link="event.image"
      v-bind:reg-expiration-date="event.date_time_start"
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
  mounted(){


  },
  data() {
    // console.log(ServerIp.serverIp)
    let events
    axios.get(ServerIp.serverIp + 'api/events/')
      .then(res => {
        events = res.data.results
        for (let i = 0; i < 3; i++) {
          console.log(res.data.results[i])
        }
      }).catch(err => {
      this.showError(err)
    })
    return {
      events,
    }
  }
}
</script>

<style scoped>

</style>
