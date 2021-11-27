<template>
  <div class="person_list column justify-between items-center shadow-2 q-pa-md q-my-md text-center">
    <h5 class="q-mt-sm">{{ name }}</h5>
    <q-list>
      <q-item
        v-for="person in perList"
        :key="person"
      >
        {{ person }}
      </q-item>
    </q-list>
    <!--    <q-input borderless :v-model="text" label="email"/>-->
    <q-input borderless v-model="text" label="Email" :rules="[
            val => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val) || 'Формат почты: a@b.c'
          ]">

      <template v-slot:append>
        <q-icon
          v-if="/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(text)"
          name="add" @click="onClick" class="cursor-pointer"/>
      </template>
    </q-input>
  </div>
</template>

<script>
import {ref} from "vue";
import {mapMutations, mapGetters} from "vuex";

export default {
  name: "PersonsList",
  props: [
    'personsList',
    'name',
  ],
  methods: {
    onClick() {
      this.addPersons("moderators", this.text)

      this.text = ''
    },
    ...mapMutations(['addPersons']),
    ...mapGetters(['getPersons']),
  },
  data() {

    return {
      perList: this.getPersons()
      ,
      text: ref('')
    }
  }
}
</script>

<style lang="scss" scoped>
.person_list {
  border-radius: 15px;
}
</style>
