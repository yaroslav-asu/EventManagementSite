<template>
  <div class="content row justify-center ">

    <form class="text-center shadow-4 q-pa-lg">
      <h4>Создать Мероприятие</h4>
      <q-input
        label="Название мероприятия"
        v-model="eventName"
      />
      <div class="row">
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
          <q-toggle
            class="q-my-md"
            label="Приватное ли мероприятие?"
            v-model="isPrivate"
          />
        </div>
          <SpeakersPersons type="speakers" name="Спикеры" style="flex-grow:1"/>
      </div>
      <div class="row justify-between">
        <ModeratorsList type="moderators" name="Модераторы"/>
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
      <q-btn color="primary" @click="onCLick">Создать</q-btn>
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

export default {
  name: "CreateEvent",
  components: {
    ModeratorsList,
    // Form,
    SponsorsList,
    VipsList,
    SpeakersPersons,
  },
  data(){
    return {
      eventName: ref(''),
      startDate: ref(),
      endDate: ref(),
      isPrivate: ref(false),
      eventDescription: ref(''),
    }
  },
  methods:{
    onCLick(){

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
