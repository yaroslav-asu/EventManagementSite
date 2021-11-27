<template>
  <div class="column justify-center items-center ">
    <q-btn color="primary q-my-lg" to="/event-create">Создать новое мероприятие</q-btn>
    <div class="content row">
      <EventCard
        v-for="event in eventsList"
        :key="event"
        :photo-link="event.image"
        :placeLink="event.place"

        :reg-expiration-date="this.formatDate(event.date_time_start)"
        :title="event.title"
        :id="event.id"
      />
    </div>
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
    EventCard,
  },
  mounted() {


  },
  data() {
    let eventsList = ref([])
    axios.get(ServerIp.serverIp + 'api/events/')
      .then(res => {
        for (let i = 0; i < res.data.count; i++) {
          eventsList.value.push(res.data.results[i])
        }
      }).catch(err => {
      this.showError(err)
    })
    return {
      eventsList,
    }
  },
  methods: {
    formatDate(rawDate) {
      let date = new Date(rawDate)
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }).toString() + " " + date.toISOString().substring(0, 10).toString().split('-').reverse().join('.')
    }
  }
}
</script>

<style scoped>

</style>
