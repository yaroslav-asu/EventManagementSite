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
            v-for="input in paramsInput"
            :key="input"
            v-model="input.model"
            :label="input.label"
            hint=""
            lazy-rules
            :rules="input.rules"
            class="q-my-md"
          >
          </q-input>
          <q-input
            v-for="input in paramsInputPassword"
            :key="input"
            v-model="input.model"
            :label="input.label"
            hint=""
            lazy-rules
            :rules="input.rules"
            :type="this.isPasShowed ? 'text' : 'password'"
            class="q-my-md"
          >
            <template v-slot:append>
              <q-icon
                :name="isPasShowed ?  'visibility': 'visibility_off'"
                class="cursor-pointer"
                @click="isPasShowed = !isPasShowed"
              />
            </template>
          </q-input>
        </div>
        <div>
          <q-btn label="Submit" type="submit" color="primary" class="q-mb-sm"/>
        </div>
        <RegLogHelpText :parent-page="this.$route.path.replace('/', '')"/>
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
  components:{
    RegLogHelpText,
  },
  props: {
    formType: {
      type: String,
      // required: true,
    }
  },
  data() {
    let username = ref('')
    let email = ref('')
    let password1 = ref('')
    let password2 = ref('')
    let isPasShowed = ref(false)

    let paramsInput
    let paramsInputPassword

    let passwordRules = [val => val && val.length || 'Введите даныне']

    if (this.formType === 'login') {
      this.formTypeName = "Вход"
      paramsInput = [
        {
          model: email,
          label: 'Ваша почта',
          rules: [
            val => val && val.length || 'Введите вашу почту',
            val => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val) || 'Формат почты: a@b.c'
          ],
        },
      ]
      paramsInputPassword =  [{
        model: password1,
        label: 'Ваш пароль',
        rules: [val => val && val.length || 'Введите даныне'],
        type: "isPasShowed ? 'password' : 'text'",
      }]
    }
    else if (this.formType === 'registration') {
      this.formTypeName = "Регистрация"
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
    }
    return {
      paramsInput,
      paramsInputPassword,
      username,
      email,
      password1,
      password2,
      isPasShowed,
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
        }).catch(err => {
          this.showError(err)
        })
      } else if (this.formType === 'login') {
        axios.post(this.serverIp + 'api/auth/login/', {
          email: this.email,
          password: this.password1,
        }).then(res => {
          this.setToken(res.data.key)
        }).catch(err => {
          this.showError(err)
        })
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.q-form{
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
@media screen and (max-width: 400px){
  .form_box{
    min-width:auto;
    width: 100%;
    padding: 0;
  }
  .inputs_box{
    //margin:0;
    margin-left: 10px;
    margin-right: 10px;
  }
  h2{
    padding: 0;
    font-size: 15vw;
  }
}
</style>
