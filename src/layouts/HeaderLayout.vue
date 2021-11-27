<template>
  <header class=" row justify-between items-center">
    <div class="logo q-mx-md">Events</div>
    <div class="row ">
      <q-tabs
        v-model="tab"
        inline-label
        class="text-primary "
      >
        <q-route-tab label="Каталог Мероприятий" to="/events"/>
<!--        <q-route-tab label="Рейтинг" to="/rating"/>-->
      </q-tabs>
      <div class="user_name_box row justify-end items-center" v-if="this.getToken()">
        <div class="user_name text-center q-mx-lg cursor-pointer">{{ userName }}</div>
        <div class="user_photo cursor-pointer q-mr-md">
          <img src="../assets/avatar.jpg" alt="user_photo" class="">
        </div>
        <q-menu fit>
          <q-list>
            <q-item clickable @click="this.$router.push('/account')">
              <q-item-section>
                Аккаунт
              </q-item-section>
            </q-item>
            <q-separator/>
            <q-item clickable @click="this.$router.push('/settings')">
              <q-item-section>
                Настройки
              </q-item-section>
            </q-item>
            <q-separator/>
            <q-item clickable @click="exit">
              <q-item-section>
                Выход
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>

      <div class="login_box row justify-end items-center" v-else>
        <q-tabs
          class="text-primary row"
        >
          <q-route-tab name="log in" label="Вход" to="/login"/>
          <q-route-tab name="registration" label="Регистрация" to="/registration"/>
        </q-tabs>
      </div>
    </div>
  </header>
</template>

<script>

import Tokens from "src/mixins/Tokens";
import axios from "axios";
import Constants from "src/mixins/Constants";
import {ref} from "vue";

export default {
  name: "MainHeader",
  mixins: [
    Tokens,
    Constants
  ],
  data() {
    return {
      userName: "",
      tab: ref('')
    }
  },
  mounted() {
    if (this.getToken()) {
      axios.get(this.serverIp + "api/auth/user/", {
        headers: {
          Authorization: "Token " + this.getToken()
        }
      })
        .then(response => {
          console.log(response)
          this.userName = response.data.email
        })
    }
  },
  methods: {
    exit() {
      this.clearToken()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.logo{
  font-size:calc(30px + 2vw);
}
header {
  .user_name {

  }

  .user_photo {
    img {
      height: calc(30px + 2vw);
      width: auto;
    }

  }
}
</style>
