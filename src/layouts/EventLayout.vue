<template>
  <div class="event_main_content">
    <div class="event_header">{{ title }}</div>
    <div class="event_header_information justify-between">
      <div class="event_header_left">
        <q-list class="event_header_external_information" style="font-size: 1rem">
          <q-item-label class="event_information_field text-primary" v-on:click="redirect">Организатор</q-item-label>
          <q-item-label class="event_information_field">Регистрация открыта до</q-item-label>
          <q-item class="event_information_field">
            <q-input v-model="exp_time" readonly filled type="time" hint="Время"/>
            <q-input v-model="exp_date" readonly filled type="date" hint="Дата"/>
          </q-item>
          <q-item-label class="event_information_field">Начало</q-item-label>
          <q-item class="event_information_field">
            <q-input v-model="start_time" readonly filled type="time" hint="Время"/>

            <q-input v-model="start_date" readonly filled type="date" hint="Дата"/>
          </q-item>
          <q-item-label class="event_information_field">Конец</q-item-label>
          <q-item class="event_information_field">
            <q-input v-model="finish_time" readonly filled type="time" hint="Время"/>

            <q-input v-model="finish_date" readonly filled type="date" hint="Дата"/>
          </q-item>
        </q-list>
      </div>
      <div class="event_header_center" v-if="this.getToken()">
        <div class="event_header_center_row">
          <q-btn v-if="isModerator" push color="white" text-color="primary" label="Изменить event"/>
        </div>
      </div>
      <div class="event_header_right column justify-center">
        <q-img class="event_main_image " :src="image"></q-img>
      </div>
    </div>
    <div class="event_about">
      <div class="event_about_header">
        О событии
      </div>
      <div class="row justify-between">
        <div class="text-center">
          <h5>Приемы пищи:</h5>
          <p v-for="meal in meals" :key="meal">{{ meal }}</p>
        </div>
        <div class="">
          <h5 class="text-center">Расписания:</h5>
          <div class="row">

            <div v-for="schedule in schedules" :key="schedule" class="q-mx-lg">
              Длинное:

              <p v-for="el in schedule[0].split('\n')" :key="el">{{ el }}</p>
            </div>
            <div v-for="schedule in schedules" :key="schedule">
              Краткое:
              <p v-for="el in schedule[1].split('\n')" :key="el">{{ el }}</p>
            </div>
          </div>
        </div>
        <div class="text-center">
          <h5>Места проведения:</h5>
          <p v-for="place in places" :key="place">{{ place }}</p>
        </div>

      </div>
      <div class="event_about_text">
        {{ }}
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import Constants from "src/mixins/Constants";
import {ref} from 'vue'
import Tokens from "src/mixins/Tokens";
import ServerIp from "src/global_values/ServerIp";

export default {
  name: "EventLayout",
  mixins: [Constants, Tokens],
  props: {
    eventId: {
      default: 0
    }
  },
  data() {
    let meals = this.getMeals()
    let image = this.getImage()
    let places = this.getPlace()
    let schedules = this.getSchedule()
    return {
      registered: false,
      value: ref(true),
      slide: ref(1),
      organizer: 0,
      date_time_start: null,

      moderators: [],

      date_time_finish: null,

      title: null,
      meals,
      image,
      places,
      schedules,

      finish_date: null,
      finish_time: null,

      start_date: null,
      start_time: null,

      exp_date: null,
      exp_time: null,

      isModerator: false

    }
  },
  methods: {
    getEvent() {
      let image, description, images
      axios.get(`${this.serverIp}api/events/${this.eventId}`).then((response) => {
        const EventInstance = response.data;
        this.organizer = EventInstance["owner"];
        this.title = EventInstance["title"];
        this.description = EventInstance["decription"];

        this.image = EventInstance["image"]
        this.start = new Date(EventInstance["date_time_start"]);
        this.start_date = this.start.toISOString().substring(0, 10);
        this.start_time = this.start.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        this.finish = new Date(EventInstance["date_time_finish"]);
        this.finish_date = this.finish.toISOString().substring(0, 10);
        this.finish_time = this.finish.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        this.exp = new Date(EventInstance["date_time_start"]);
        this.exp_date = this.exp.toISOString().substring(0, 10);
        this.exp_time = this.exp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        this.moderators = EventInstance["moderators"];


        this.checkForRights();

      })
      return {
        image,
        description,
        images,
      }
    },
    redirect() {
      this.$router.push(`/profile/${this.organizer}`)
    },
    checkForRights() {
      axios.get(`${this.serverIp}api/auth/user`, {headers: {Authorization: "Token " + this.getToken()}}).then(
        (response) => {
          const id = response.data["pk"];
          this.getParticipants(id)
          this.setEventUser(this.eventId, id);
        }
      )
    },
    getMeals() {
      let meals = []
      axios.get(ServerIp.serverIp + 'api/meals/?event_id=' + this.eventId)
        .then(res => {
          for (let i = 0; i < res.data.results.length; i++) {
            meals.push(res.data.results[i].name)
          }
        })

      return meals
    },
    getImage() {
      let img
      axios.get(ServerIp.serverIp + 'api/events/' + this.eventId)
        .then(res => {
          img = res.data.image
        })
      return img
    },
    getPlace() {
      let places = []
      axios.get(ServerIp.serverIp + 'api/places/?events=' + this.eventId)
        .then(res => {
          for (let i = 0; i < res.data.results.length; i++) {
            places.push(res.data.results[i].name + " " + res.data.results[i].address)
          }
        })
      return places
    },
    getSchedule() {
      let programs = []
      axios.get(ServerIp.serverIp + 'api/more_information/' + this.eventId).then(res => {
        programs.push([res.data.long_program, res.data.short_program])
      })
      return programs
    },
    getParticipants(id) {
      axios.get(`${this.serverIp}api/participants_of_the_event/`, {data: {event: this.eventId, user: id}}).then(
        (response) => {
          if (response.data["moderator"] || response.data["owner"]) {
            this.isModerator = true;
          }
        }
      )
    },
    redirectRegister() {
      this.$router.push("/event/registration");
    }
  },
  mounted() {
    this.getEvent();
    this.getSchedule()
  }
}
</script>

<style lang="scss" scoped>

.event_header_center {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.carousel_image {
  background-size: contain;
  background-repeat: no-repeat;
  background-color: $primary;
}

.event_about_header {
  font-size: 3vw;
  text-align: center;
}

.event_about {
  display: flex;
  flex-direction: column;
}

.event_about_text {
  font-size: 2vw;
  font-weight: normal;
}

.event_main_content {
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 100px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}

.event_header_center_row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 20px;
  margin: 20px;
  width: max-content;
  color: $primary;
  font-size: 1.2vw;
}

.event_header_external_information {
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.event_header {
  text-align: center;
  font-size: 2vw;
  max-font-size: 1rem;
  min-font-size: 0.5rem;
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
  //background: #9C27B0;
  min-width: 40vw;
  width: 100%;
  height: auto;

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

.gallery {
  height: 100%;
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
