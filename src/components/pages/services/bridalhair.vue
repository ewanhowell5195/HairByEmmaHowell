<script setup>
  import service from "@/assets/json/services/bridal_hair.json"
  import ServiceInfo from "../../sections/ServiceInfo.vue"
  import CustomForm from "../../snippets/Form.vue"
  import Reviews from "../../sections/Reviews.vue"
  import Gallery from "../../sections/Gallery.vue"

  service.heading = "Bridal Hair"
  service.id = "bridal_hair"
</script>

<template>
  <div class="page">
    <ServiceInfo :service="service" />
    <section class="contrast">
      <div class="container">
        <h1>Bridal Enquiry Form</h1>
        <p>Contact Emma here for your bridal hairstyling and to check availability of your date.</p>
        <CustomForm boxed>
          <label for="date">Event Date</label>
          <input id="datetime" name="datetime" type="text" placeholder="Select wedding date…" required />
          <label for="how-many">How many people require hair styling on your wedding day? <span style="opacity: .5;">(Including the bride)</span></label>
          <input id="how-many" name="how-many" placeholder="How many people?" type="number" min="1" required>
          <label for="location">Event location?</label>
          <input id="location" name="location" placeholder="Location" type="text" required>
          <label for="where-ready">Where are you getting ready?</label>
          <input id="where-ready" name="where-ready" placeholder="I am getting ready at..." type="text" required>
        </CustomForm>
      </div>
    </section>
    <Reviews service="bridalhair" />
    <Gallery :images="[
      '/assets/images/services/bridal_hair/blonde.webp',
      '/assets/images/services/bridal_hair/brown.jpg',
      '/assets/images/services/bridal_hair/flowers.jpg',
      '/assets/images/services/bridal_hair/pearls.jpg',
      '/assets/images/services/bridal_hair/blonde.webp',
      '/assets/images/services/bridal_hair/brown.jpg',
      '/assets/images/services/bridal_hair/flowers.jpg',
      '/assets/images/services/bridal_hair/pearls.jpg',
      '/assets/images/services/bridal_hair/blonde.webp',
      '/assets/images/services/bridal_hair/brown.jpg',
      '/assets/images/services/bridal_hair/flowers.jpg',
      '/assets/images/services/bridal_hair/pearls.jpg'
    ]" />
  </div>
</template>

<style scoped>
  :deep(.boxed) {
    outline: none !important;
    padding: 0 !important;
  }
</style>