<template>
  <div class="limiter window-height column justify-center items-center">
    <q-card
      class="form_box column justify-between items-center text-center q-pa-md"
    >
      <q-form
        @submit="onSubmit"
      >
        <h2
          class="q-pa-md q-mx-none"
        >
          {{ formTypeName }}
        </h2>
        <div class="inputs_box">
          <q-input
            v-for="input in paramsForInput"
            :key="input"
            v-model="input.model"
            :label="input.label"
            hint=""
            lazy-rules
            :rules="input.rules"
            :type="isPasShowed ? 'text' : 'password'"
            class="q-my-md"
          >
            <template v-if="input.label.includes('пароль')" v-slot:append>
              <q-icon
                :name="isPasShowed ?  'visibility': 'visibility_off'"
                class="cursor-pointer"
                @click="isPasShowed = !isPasShowed"
              />
            </template>
          </q-input>
        </div>
        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import Constants from "src/mixins/Constants";
import ShowError from "src/mixins/ShowError";

export default {
  name: "From",
  mixins: [
    Constants,
    ShowError,
  ],
  props: {
    formType: {
      type: String,
      default: "registration",
      // required: true,
    }
  },
  data() {
    let username = ref('')
    let email = ref('')
    let password1 = ref('')
    let password2 = ref('')



    let password = ref('')
    let isPwd = ref(false)


    let paramsForInput
    let isPasShowed = ref(false)

    if (this.formType === 'login') {
      this.formTypeName = "Вход"
      paramsForInput = [
        {
          model: email,
          label: 'Ваша почта',
          rules: [
            val => val && val.length || 'Введите вашу почту',
            val => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val) || 'Формат почты: a@b.c'
          ],
        },
        {
          model: password1,
          label: 'Ваш пароль',
          rules: [val => val && val.length || 'Введите даныне'],
          type: "isPasShowed ? 'password' : 'text'",
        },
      ]
    } else if (this.formType === 'registration') {
      this.formTypeName = "Регистрация"
      paramsForInput = [
        {
          model: username,
          label: 'Ваше имя, фамилия',
          rules: [
            val => val && val.length || 'Введите данные'
          ],
          type: "text",
        },
        {
          model: email,
          label: 'Ваша почта',
          rules: [
            val => val && val.length || 'Введите вашу почту',
            val => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val) || 'Формат почты: a@b.c'
          ],
          type: "text"
        },
        {
          model: password1,
          label: 'Ваш пароль',
          rules: [val => val && val.length || 'Введите даныне'],
          type: "text"
        },
        {
          model: password2,
          label: 'Ваш пароль, еще раз',
          rules: [val => val && val.length || 'Введите даныне'],
          type: ref(this.isPasShowed ? 'password' : 'text')
        },

      ]
    }
    return {
      paramsForInput,
      username,
      email,
      password1,
      password2,
      isPasShowed,
      password,
      isPwd
    }
  },
  methods: {
    onSubmit() {
      if (this.formType === 'registration') {
        axios.post(this.serverIp + 'api/auth/registration/', {
          email: this.email,
          username: this.username,
          password1: this.password1,
          password2: this.password2
        }).then(res => {
          console.log(res)
        }).catch(err => {
          this.showError(err)
        })
      }

    },
    fun(a){
     a = !a
    }
  }
}
</script>

<style lang="scss" scoped>
.form_box {
  border-radius: 25px;
}

.inputs_box {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
