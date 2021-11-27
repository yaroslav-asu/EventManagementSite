<template>
  <HeaderLayout/>
  <router-view class="limiter" />
</template>
<script>
import { defineComponent } from 'vue';
import HeaderLayout from "layouts/HeaderLayout";

export default defineComponent({
  name: 'App',
  components:{
    HeaderLayout,
  },
})
</script>
