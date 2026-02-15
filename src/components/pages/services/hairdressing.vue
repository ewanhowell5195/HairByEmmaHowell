<script setup>
  import service from "@/assets/json/services/hairdressing.json"
  import ServiceInfo from "@c/sections/ServiceInfo.vue"
  import CustomForm from "@c/snippets/Form.vue"
  import Reviews from "@c/sections/Reviews.vue"
  import Gallery from "@c/sections/Gallery.vue"

  service.heading = "Hairdressing"
  service.id = "hairdressing"
</script>

<template>
  <div class="page">
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
    <Reviews service="hairdressing" />
    <Gallery title="Gallery" :images="service.gallery.map(e => `/assets/images/services/hairdressing/${e}`)" />
  </div>
</template>

<style scoped>
  :deep(.boxed) {
    outline: none !important;
    padding: 0 !important;
  }
</style>