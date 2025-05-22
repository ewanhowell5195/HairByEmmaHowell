<script setup>
  import service from "@/assets/json/services/hairdressing.json"
  import ServiceInfo from "../../sections/ServiceInfo.vue"
  import CustomForm from "../../snippets/Form.vue"
  import Gallery from "../../sections/Gallery.vue"

  service.heading = "Hairdressing"
  service.id = "hairdressing"
</script>

<template>
  <ServiceInfo :service="service" />
  <section class="contrast">
    <div class="container">
      <h1>Make a Booking</h1>
      <p>Provide your details below to make a booking. Your preferred date and time is only a preference and is subject to availability.</p>
      <CustomForm boxed>
        <label for="date">Preferred Date</label>
        <input id="datetime" name="datetime" type="text" placeholder="Select a date and time…" required />
        <label for="how-many">What would you like done?</label>
        <textarea data-v-60103730="" id="details" name="details" placeholder="e.g. Cut and blow-dry, highlights, colour…" required=""></textarea>
      </CustomForm>
    </div>
  </section>
  <Gallery :images="[
    '/assets/images/services/hairdressing/blonde.jpg',
    '/assets/images/services/hairdressing/brown.jpg',
    '/assets/images/services/hairdressing/outside.webp',
    '/assets/images/services/hairdressing/red.jpg',
    '/assets/images/services/hairdressing/blonde.jpg',
    '/assets/images/services/hairdressing/brown.jpg',
    '/assets/images/services/hairdressing/outside.webp',
    '/assets/images/services/hairdressing/red.jpg',
    '/assets/images/services/hairdressing/blonde.jpg',
    '/assets/images/services/hairdressing/brown.jpg',
    '/assets/images/services/hairdressing/outside.webp',
    '/assets/images/services/hairdressing/red.jpg'
  ]" />
</template>

<style scoped>
  :deep(.boxed) {
    outline: none !important;
    padding: 0 !important;
  }
</style>