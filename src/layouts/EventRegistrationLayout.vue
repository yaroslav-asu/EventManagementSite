<template>
  <div>
    <Form form-type="EventRegistration" :event-registration="eventRegistration"/>
  </div>
</template>

<script>
import Form from "components/Form";

export default {
  name: "EventRegistrationLayout",
  props: {
    eventRegistration: {
      type: Object
    }
  },
  components: {
    Form
  }
}
</script>

<style scoped>

</style>
