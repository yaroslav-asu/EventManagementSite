<template>

  <div class="event_card shadow-1 column q-mx-md text-center justify-between q-pa-md">
    <h5>{{ title }}</h5>
    <div class="event_img">
      <img :src="photoLink" alt="Фото мероприятия" class="fit">
    </div>
    <div class="">

      <p>Место проведения: {{ place }}</p>
      <p>Регестрация до: {{ regExpirationDate }}</p>
      <q-btn class="q-mb-sm" :to="'/event/' + id" color="primary">Подробнее</q-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Constants from "src/mixins/Constants";

export default {
  name: "Event",
  props: [
    'place',
    'regExpirationDate',
    'photoLink',
    'title',
    'id'
  ],
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.event_card {
  border-radius: 15px;
  max-width: 20vw;
}
</style>
