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
      <div class="event_header_right">
        <q-img class="event_main_image fit" src="{{image}}"></q-img>
      </div>
    </div>
    <div class="event_about">
      <div class="event_about_header">
        О событии
      </div>
      <div class="event_about_text">
        {{description}}
      </div>
    </div>
    <div class="gallery">
      <q-carousel
        animated
        v-model="slide"
        arrows
        navigation
        infinite
      >
        <q-carousel-slide class="carousel_image" v-for="(image, i) in images" :key="i" :img-src="image" :name="i" >
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Constants from "src/mixins/Constants";
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: "EventLayout",
  mixins: [Constants],
  props: {
    eventId: {
      default: 0
    }
  },
  data() {
    return{
      slide: ref(1),
      organizer: 0,
      date_time_start: null,

      date_time_finish: null,
      image: null,

      title: null,

      images: ["https://i.ibb.co/H7PHwF7/fe8c3271f7a9.jpg", "https://i.ibb.co/jyrbLTk/73ae413457f6.jpg"],


      description: "Встретил как-то Владимир Симкин Захара Холмова. Разговорились. А жизнь вся такая - уходят звезды, пыль летит по вселенной, умирают микробы, гаснут солнца, черные дыры засасывают свет, и куда этот свет девается? От людей только и остается, что эпитафия в цветочках.  И вот он не выдержал, похвастался, какую свинью вы мне подложили. А та, на кого он положил глаз, сидела на той же помойке и красила ногти. Но это ее совсем не огорчило, а развеселило. Потом он снова встретил этого Захара.  И говорит ему так: ты себе такую свинью нажил, что сам в ней купаешься. А Захар в ответ: а как же твоя водка? Но тут та, о которой он только что мечтал, потеряла к нему всякий интерес.\n",

      finish_date: null,
      finish_time: null,

      start_date: null,
      start_time: null,

      exp_date: null,
      exp_time: null,

    }
  },
  methods: {
    getEvent() {
      this.$q.loading.show({
        delay: 800
      })
      axios.get(`${this.serverIp}api/events/${this.eventId}`).then((response) => {
        const EventInstance = response.data;
        this.organizer = EventInstance["owner"];
        this.title = EventInstance["title"];
        this.description = EventInstance["decription"];

        this.start = new Date(EventInstance["date_time_start"]);
        this.start_date = this.start.toISOString().substring(0, 10);
        this.start_time = this.start.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        this.finish = new Date(EventInstance["date_time_finish"]);
        this.finish_date = this.finish.toISOString().substring(0, 10);
        this.finish_time = this.finish.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        this.exp = new Date(EventInstance["date_time_start"]); //TODO
        this.exp_date = this.exp.toISOString().substring(0, 10);
        this.exp_time = this.exp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        this.description = EventInstance['description']

        this.$q.loading.hide();

      }).catch((error) => {
        //this.$router.push("/404")
      })
    },
    redirect() {
      this.$router.push(`/profile/${this.organizer}`)
    },
    setup () {
      const $q = useQuasar();
    }
  },
  mounted() {
    this.getEvent();
  }
}
</script>

<style lang="scss" scoped>

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
  margin-bottom: 100px;
  height: fit-content;
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
  background: #9C27B0;
  min-width: 40vw;

}

.text-caption {
  font-size: 1.6vw;
  color: black;
}

.event_information_field {
  font-size: 1.5vw;
  color: black;

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
