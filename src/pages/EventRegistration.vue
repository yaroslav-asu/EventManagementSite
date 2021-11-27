<template>
  <div>
    <EventRegistrationLayout :event-registration="this.getEventUser"/>
  </div>

</template>

<script>
import Tokens from "src/mixins/Tokens";
import EventRegistrationLayout from "layouts/EventRegistrationLayout";
export default {
  name: "EventRegistration",
  components: {EventRegistrationLayout},
  mixins: {
    Tokens
  }
}
</script>

<style scoped>

</style>
