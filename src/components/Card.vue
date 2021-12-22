<template>
  <q-card class="text-center q-pa-md br q-ma-md">
    <h5>{{ name }}</h5>
    <p>{{ location }}</p>
    {{ info }}
    <br>
    {{ time }}
  </q-card>
</template>

<script>
export default {
  name: "Card",
  props: [
    'name',
    'location',
    'time',
    'info',
  ],

}
</script>

<style scoped>
.q-card{
  border-radius: 15px;
  width: 30%;
}
</style>
