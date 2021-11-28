<template>
  <div class="content row justify-center ">

    <form class="text-center shadow-4 q-pa-lg">
      <h4>Создать Мероприятие</h4>

      <div class="row justify-center">
        <q-uploader
          class="q-ma-md"
          label="Основная картинка"
          url="http://localhost:4444/upload"
        />
        <q-uploader
          class="q-ma-md"
          url="http://localhost:4444/upload"
          label="Дополнительные картинки"
          multiple
        />
      </div>
      <q-input
        label="Название мероприятия"
        v-model="eventName"
      />
      <div class="row">
        <div class="column justify-between">
          <q-input
            class="q-ma-md"
            label="Время начала"
            v-model="startDate"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="startDate" mask="HH:mm DD.MM.YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="startDate" mask="HH:mm DD.MM.YYYY" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            class="q-ma-md"
            label="Время завершения"
            v-model="endDate"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="endDate" mask="HH:mm DD.MM.YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="endDate" mask="HH:mm DD.MM.YYYY" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            label="Количество участников"
            v-model.number="participantsCount"
            type="number"
            class="q-ma-md"
            style="flex-grow: 1"
          />
          <q-toggle
            class="q-my-md"
            label="Приватное ли мероприятие?"
            v-model="isPrivate"

          />
          <q-btn @click="onFindAd">Найти адреса</q-btn>
          <q-select
            :options="this.addresses"
            label="Посмотреть подходящие здания"
            class="q-ma-md"
            :disable="!(Boolean(this.participantsCount )&& Boolean(this.startDate) && Boolean(this.endDate)  && Boolean(this.isFindAddressesActive))"
            v-model="selectedPlace"
          />
        </div>
        <SpeakersPersons type="speakers" name="Спикеры" style="flex-grow:1"/>
        <ModeratorsList type="moderators" name="Модераторы"/>
      </div>
      <div class="row justify-center">

        <VipsList type="vips" name="VIP's"/>
        <SponsorsList type="sponsors" name="Спонсоры"/>
      </div>

      <q-input
        class="q-my-md"
        v-model="eventDescription"
        type="textarea"
        autogrow
        label="Описание"
      />
      <q-btn color="primary" @click="onSubmit">Создать</q-btn>
    </form>
  </div>
</template>

<script>
import Form from "components/Form";
import PersonsList from "components/SpeakersPersons";
import axios from "axios";
import {ref} from "vue";
import ModeratorsList from "components/ModeratorsList";
import VipsList from "components/VipsList";
import SpeakersPersons from "src/components/SpeakersPersons";
import SponsorsList from "components/SponsorsList";
import {mapGetters, mapMutations} from "vuex";
import ServerIp from "src/global_values/ServerIp";
import ShowError from "src/mixins/ShowError";

export default {
  name: "CreateEvent",
  components: {
    ModeratorsList,
    // Form,
    SponsorsList,
    VipsList,
    SpeakersPersons,
  },
  data() {

    return {
      eventName: ref(''),
      startDate: ref(''),
      endDate: ref(''),
      isPrivate: ref(false),
      eventDescription: ref(''),
      buildingName: ref(''),
      address: ref(''),
      participantsCount: ref(),
      selectedPlace: ref(null),
      addresses: ref([]),
      isFindAddressesActive: ref(false),
    }
  },
  methods: {
    prepareDate(date) {
      let splitted_date = date.split(' ')[1].split('.')
      return splitted_date.reverse().join('-')
    },
    getAddresses() {
      let addresses = []
      axios.get(ServerIp.serverIp + 'api/premises/', {
        params: {
          date_start: this.prepareDate(this.startDate),
          date_finish: this.prepareDate(this.endDate),
          capacity: this.participantsCount
        }
      }).then(res => {
        for (let i = 0;  i < res.data.length; i++){
          axios.get(ServerIp.serverIp + 'api/places/' + res.data[i])
            .then(res =>{
              // console.log(res)
              addresses.push(res.data.name + " " + res.data.address)
          })
            .catch(err => this.showError(err))
        }
      }).catch(err => this.showError(err))
      // console.log(addresses)
      return addresses
    },
    onFindAd(){
      for (let i in this.getAddresses() ){
        this.addresses.push(i)
      }
    },
    ...mapMutations(['clearModerators', 'clearSpeakers', 'clearSponsors', 'clearVips']),
    onSubmit() {
      this.clearModerators()
      this.clearSpeakers()
      this.clearVips()
      this.clearSponsors()
    }
  }
}
</script>

<style scoped>
form {
  border-radius: 15px;
  /*width: 80vw;*/
}
</style>
