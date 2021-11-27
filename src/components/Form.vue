<template>
  <div class="limiter window-height column justify-center items-center">
    <q-card
      class="form_box column justify-between items-center text-center q-pa-md"
    >
      <q-form @submit="onSubmit">
        <h2 class="q-pa-md q-mx-none">
          {{ formTypeName }}
        </h2>
        <div class="inputs_box">
          <q-input
            class="input q-my-md"
            v-for="input in paramsInput"
            :key="input"
            v-model="input.model"
            :label="input.label"
            hint=""
            lazy-rules
            :rules="input.rules"
            :type="input.type"

          >
          </q-input>
          <q-input
            class="input_num q-my-md"
            v-for="input in paramsInputNum"
            :key="input"
            v-model.number="input.model"
            :label="input.label"
            hint=""
            lazy-rules
            :rules="input.rules"

            type="number"
          >
          </q-input>
          <q-input
            class="input_pas q-my-md"
            v-for="input in paramsInputPassword"
            :key="input"
            v-model="input.model"
            :label="input.label"
            hint=""
            lazy-rules
            :rules="input.rules"
            :type="this.isPasShowed ? 'text' : 'password'"

          >
            <template v-slot:append>
              <q-icon
                :name="isPasShowed ?  'visibility': 'visibility_off'"
                class="cursor-pointer"
                @click="isPasShowed = !isPasShowed"
              />
            </template>
          </q-input>
          <q-input
            v-for="input in paramsTextAreas"
            :key="input"
            v-model="eventDescription"
            :type="input.label"
            autogrow
            :label="input.label"
          />
          <q-input
            v-for="input in paramsInputDates"
            :key="input"
            v-model="input.model"
            :label="input.label"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="input.model" mask="YYYY-MM-DD HH:mm">
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
                  <q-time v-model="input.model" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-uploader
            v-for="uploader in paramsUploaders"
            :key="uploader"
            :url="uploader.url"
            :label="uploader.label"
            style="max-width: 300px"

          />
          <q-uploader
            v-for="uploader in paramsUploadersMultiply"
            :key="uploader"
            :url="uploader.url"
            :label="uploader.label"
            multiple
            style="max-width: 300px"

          />
        </div>
        <div>
          <q-btn :label="this.buttonText" type="submit" color="primary" class="q-mb-sm"/>
        </div>
        <RegLogHelpText v-if="this.formTypeName === 'Регистрация' || this.formTypeName === 'Вход'"
                        :parent-page="this.$route.path.replace('/', '')"/>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import Constants from "src/mixins/Constants";
import ShowError from "src/mixins/ShowError";
import Tokens from "src/mixins/Tokens";
import RegLogHelpText from "components/RegLogHelpText";

export default {
  name: "From",
  mixins: [
    Constants,
    ShowError,
    Tokens,
  ],
  components: {
    RegLogHelpText,
  },
  props: {
    formType: {
      type: String,
      // required: true,
    },
  },
  data() {
    let username = ref('')
    let email = ref('')
    let password1 = ref('')
    let password2 = ref('')
    let isPasShowed = ref(false)
    let eventName = ref('')
    let countParticipants = ref()
    let eventDescription = ref('')
    let startDate = ref()
    let endDate = ref()
    let paramsTextAreas = []
    let paramsInputNum = []
    let paramsInputDates = []
    let paramsUploaders = []
    let paramsUploadersMultiply = []

    let arrive_time = ref()
    let depart_time = ref()

    let paramsInput
    let paramsInputPassword

    let passwordRules = [val => val && val.length || 'Введите даныне']

    if (this.formType === 'login') {
      this.formTypeName = "Вход"
      this.buttonText = "Вход"
      paramsInput = [
        {
          model: email,
          label: 'Ваша почта',
          rules: [
            val => val && val.length || 'Введите вашу почту',
            val => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val) || 'Формат почты: a@b.c'
          ],
          type: "email"
        },
      ]
      paramsInputPassword = [{
        model: password1,
        label: 'Ваш пароль',
        rules: [val => val && val.length || 'Введите даныне'],
        type: "isPasShowed ? 'password' : 'text'",
      }]
    } else if (this.formType === 'registration') {
      this.formTypeName = "Регистрация"
      this.buttonText = "Регистрация"
      paramsInput = [
        {
          model: email,
          label: 'Ваша почта',
          rules: [
            val => val && val.length || 'Введите вашу почту',
            val => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val) || 'Формат почты: a@b.c'
          ],
          type: "email"
        },
        // {
        //   model: username,
        //   label: 'Ваше имя, фамилия',
        //   rules: [
        //     val => val && val.length || 'Введите данные'
        //   ],
        //   type: "text",
        // },
      ]
      paramsInputPassword = [
        {
          model: password1,
          label: 'Ваш пароль',
          rules: passwordRules,
        },
        {
          model: password2,
          label: 'Ваш пароль, еще раз',
          rules: passwordRules,
        },
      ]

    } else if (this.formType === 'create-event') {
      this.formTypeName = "Создать событие"
      this.buttonText = "Создать"
      paramsInput = [
        {
          model: eventName,
          label: 'Название Мероприятия',
          rules: [
            val => val && val.length || 'Введите данные'
          ],
          type: "text"
        },
      ]
      paramsInputNum = [
        {
          model: countParticipants,
          label: 'Количество участников',
          rules: [
            val => val && val.length || 'Введите данные',
          ],
          type: "text"
        },
      ]
      paramsTextAreas = [
        {
          model: countParticipants,
          label: 'Описание события',
          type: "textarea"
        },
      ]
      paramsInputDates = [
        {
          model: startDate,
          label: 'Дата начала',
        },
        {
          model: endDate,
          label: 'Дата окончания',
        },
      ]
      paramsUploaders = [
        {
          url: "",
          label: 'Загрузить главное фото',
        },
      ]
      paramsUploadersMultiply = [
        {
          url: "",
          label: 'Загрузить дополнительные фото',
        },
      ]
    } else if (this.formType === "EventRegistration") {
      paramsInputDates = [{model: arrive_time, label: "Время прибытия"}, {model: depart_time, label: "Время отбытия"}];
    }
    return {
      paramsInput,
      paramsInputPassword,
      paramsInputNum,
      paramsTextAreas,
      eventDescription,
      username,
      email,
      password1,
      password2,
      isPasShowed,
      eventName,
      countParticipants,
      paramsInputDates,
      paramsUploaders,
      paramsUploadersMultiply,
      arrive_time,
      depart_time
    }
  },
  methods: {
    onSubmit() {
      if (this.formType === 'registration') {
        axios.post(this.serverIp + 'api/auth/registration/', {
          email: this.email,
          // username: this.username,
          password1: this.password1,
          password2: this.password2
        }).then(res => {
          this.setToken(res.data.key)
          this.$router.push('/')
        }).catch(err => {
          this.showError(err)
        })
      } else if (this.formType === 'login') {
        axios.post(this.serverIp + 'api/auth/login/', {
          email: this.email,
          password: this.password1,
        }).then(res => {
          this.setToken(res.data.key)
          this.$router.push('/')
        }).catch(err => {
          this.showError(err)
        })
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.q-form {
  width: 100%;
}

.form_box {
  border-radius: 25px;
  min-width: 350px;
}

.inputs_box {
  margin-left: 20px;
  margin-right: 20px;
}

@media screen and (max-width: 400px) {
  .form_box {
    min-width: auto;
    width: 100%;
    padding: 0;
  }
  .inputs_box {
    //margin:0;
    margin-left: 10px;
    margin-right: 10px;
  }
  h2 {
    padding: 0;
    font-size: 15vw;
  }
}
</style>
