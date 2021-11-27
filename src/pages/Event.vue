<template>
  <EventLayout :event-id="eventId"/>
</template>

<script>
import EventLayout from "layouts/EventLayout";
export default {
  name: "Event",
  components: {EventLayout},
  props: {
    eventId: {
      default: 0
    }
  }
}
</script>

<style scoped>

</style>
