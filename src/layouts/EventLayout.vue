
<template>
  <div class="event_main_content">
    <div class="event_header">{{ title }}</div>
    <div class="event_header_information justify-between">
      <div class="event_header_left">
        <q-list class="event_header_external_information" style="font-size: 1rem">
          <q-item-label class="event_information_field text-primary" v-on:click="redirect">Организатор</q-item-label>
          <q-item class="event_information_field">
            <q-item-section>
              <q-item-label>Регистрация до</q-item-label>
              <q-item-label caption>{{ registration_exp }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item-label class="event_information_field">Начало</q-item-label>
          <q-item disable class="event_information_field">
            <q-input  v-model="start_time" filled type="time" hint="Время"/>

            <q-input v-model="start_date" filled type="date" hint="Дата"/>
          </q-item>
          <q-item-label class="event_information_field">Конец</q-item-label>
          <q-item disable class="event_information_field">
            <q-input v-model="finish_time" filled type="time" hint="Время" />

            <q-input v-model="finish_date" filled type="date" hint="Дата" />
          </q-item>
        </q-list>
      </div>
      <div class="event_header_right">
        <q-img class="event_main_image fit" src="{{image}}"></q-img>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Constants from "src/mixins/Constants";


export default {
  name: "EventLayout",
  mixins: [Constants],
  props: {
    eventId: {
      default: 0
    }
  },
  data() {
    return {
      organizer: 0,
      date_time_start: null,
      date_time_finish: null,
      image: null,
      title: null,
      description: null,

      finish_date: null,
      finish_time: null,

      start_date: null,
      start_time: null,

      registration_exp: null
    }
  },
  methods: {
    getEvent() {
      axios.get(`${this.serverIp}api/events/${this.eventId}`).then((response) => {
        const EventInstance = response.data;
        this.organizer = EventInstance["owner"];
        this.title = EventInstance["title"];
        this.description = EventInstance["decription"];

        this.start = new Date(EventInstance["date_time_start"]);
        this.start_date = this.start.toISOString().substring(0, 10);
        this.start_time = this.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        this.finish = new Date(EventInstance["date_time_finish"]);
        this.finish_date = this.finish.toISOString().substring(0, 10);
        this.finish_time = this.finish.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        this.registration_exp = 123 //TODO

        console.log(EventInstance);
        console.log(this.date_time_finish);
      }).catch((error) => {
        this.$router.push("/404")
      })
    },
    redirect() {
      this.$router.push(`/profile/${this.organizer}`)
    }
  },
  mounted() {
    this.getEvent();
  }
}
</script>

<style lang="scss" scoped>

.event_main_content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}

.event_header_external_information {
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.event_header {
  font-size: 5vw;
  max-font-size: 1rem;
  text-align: center;
  overflow-wrap: break-word;
}

.event_header_left {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.event_header_information {
  display: flex;
  padding-bottom: 20px;
  flex-direction: row;
  border-bottom: 2px solid rgba(109, 109, 109, 0.29);
  border-radius: 1px;
}

.event_main_image {
  background: #9C27B0;
  min-width: 40vw;

}

.text-caption {
  font-size: 1.6vw;
  color: black;
}

.event_information_field {
  font-size: 1.5vw;
  color: grey;

}

.event_main_image {
  aspect-ratio: auto;
}

.q-item {
  padding: 0;
}

@media screen and (max-width: 800px) {
  .event_header_information {
    flex-direction: column-reverse;
  }
  .event_information_field {
    font-size: 3vw;
    color: grey;
  }
  .text-caption {
    font-size: 3.1vw;
    color: black;
  }
}

</style>
