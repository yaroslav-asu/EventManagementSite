<template>
  <div class="event_card shadow-1 q-mx-md text-center justify-center">
    <h5>{{title}}</h5>
    <div class="event_img">
      <img :src="photoLink" alt="Фото мероприятия">
    </div>
    <p>Место проведения: {{ place }}</p>
    <p>Регестрация до: {{ regExpirationDate }}</p>
    <q-btn class="q-mb-md" :to="'/event' + id">Подробнее</q-btn>
  </div>
</template>

<script>
import axios from "axios";
import Constants from "src/mixins/Constants";

export default {
  name: "Event",
  props:[
    'place',
    'regExpirationDate',
    'photoLink',
    'title',
    'id'
  ],
  data() {
    // place = 'г.Ханты-Мансийск ул.Объездная д.6 кв.111'
    // regExpirationDate = '28.01.2021'
    // axios.get(this.serverIp + 'api/events/')
    //   .then(res => {
    //     regExpirationDate = res.data.results[]
    //   })
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.event_card{
  border-radius: 15px;
}
</style>
