<template>
  <div class="event_card shadow-1 column q-ma-md text-center justify-between q-pa-md">
    <h5>{{ title }}</h5>
    <div class="event_img">
      <img :src="photoLink" alt="Фото мероприятия" class="fit">
    </div>
    <div class="">

      <p>Место проведения: </p>
      <p>{{ placeName }} {{ placeAddress }}</p>
      <p>Регестрация до: </p>
      <p>{{ regExpirationDate }}</p>
      <q-btn class="q-mb-sm" :to="'/event/' + id" color="primary">Подробнее</q-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ShowError from "src/mixins/ShowError";
import {ref} from "vue";

export default {
  name: "Event",
  mixins: [
    ShowError,
  ],
  props: [
    'placeLink',
    'regExpirationDate',
    'photoLink',
    'title',
    'id'
  ],
  data() {
    let placeName = ref('')
    let placeAddress = ref('')
    axios.get(this.placeLink)
      .then(res => {
        placeName = res.data.name
        placeAddress = res.data.address
        console.log(res)
      }).catch(
      err => {
        this.showError(err)
      })
    return {
      placeName,
      placeAddress
    }
  }
}
</script>

<style lang="scss" scoped>
.event_card {
  border-radius: 15px;
  width: 30%;
}
</style>
