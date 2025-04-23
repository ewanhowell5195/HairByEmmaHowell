<script setup>
  import service from "@/assets/json/services/bridal_hair.json"
  import ServiceInfo from "../../sections/ServiceInfo.vue"
  import CustomForm from "../../snippets/Form.vue"

  service.heading = "Bridal Hair"
  service.id = "bridal_hair"
</script>

<template>
  <ServiceInfo :service="service" />
  <section class="contrast">
    <div class="container">
      <h1>Enquire About Bridal Hair Booking</h1>
      <p>Fill out the form below to enquire about a bridal hair booking. While I aim to accommodate your wedding date, availability cannot be guaranteed as existing bookings are not displayed.</p>
      <CustomForm boxed>
        <label for="date">Wedding Date</label>
        <input id="datetime" name="datetime" type="text" placeholder="Select wedding date…" required />
        <label for="how-many">How many people require hair styling on your wedding day?</label>
        <input id="how-many" name="how-many" placeholder="How many people?" type="number" min="1" required>
        <label for="location">Wedding location?</label>
        <input id="location" name="location" placeholder="Location" type="text" required>
      </CustomForm>
    </div>
  </section>
</template>

<style scoped>
  :deep(.boxed) {
    outline: none !important;
    padding: 0 !important;
  }
</style>