<template>
<div class="content">
<Form form-type="create-event"/>
</div>
</template>

<script>
import Form from "components/Form";
import axios from "axios";
export default {
  name: "CreateEvent",
  components:{
    Form,
  }
}
</script>

<style scoped>

</style>
