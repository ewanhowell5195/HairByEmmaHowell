<script setup>
  import hairdressing from "@/assets/json/services/hairdressing.json"
  import bridalHair from "@/assets/json/services/bridal_hair.json"
  import ContentWithImage from "@c/sections/ContentWithImage.vue"
  import AboutSection from "@c/sections/About.vue"
  import Reviews from "@c/sections/Reviews.vue"
  import Banner from "@c/sections/Banner.vue"
  import home from "@/assets/json/home.json"

  function scrollToServices() {
    document.getElementById("services").scrollIntoView({ behavior: "smooth" })
  }
</script>

<template>
  <div class="page">
    <Banner :image="'/assets/images/home/' + home.banner" :mobileimage="'/assets/images/home/' + home.banner_mobile">
      <img class="banner-logo" src="/assets/images/logo/transparent.webp">
      <p>Hairdresser and Bridal Stylist based in Row Town, Surrey</p>
      <button @click="scrollToServices" class="white">View Services</button>
    </Banner>
    <AboutSection :link="true" />
    <div id="services">
      <h1 class="container">Services</h1>
      <hr>
      <ContentWithImage heading="Hairdressing" :image="hairdressing.images.map(e => `/assets/images/services/hairdressing/${e}`)">
        <p>{{ hairdressing.description }}</p>
        <div class="spacer"></div>
        <router-link to="/services/hairdressing" class="button">Learn More</router-link>
      </ContentWithImage>
      <hr>
      <ContentWithImage content="left" heading="Bridal Hair" :image="bridalHair.images.map(e => `/assets/images/services/bridal_hair/${e}`)" :delay="1500">
        <p>{{ bridalHair.description }}</p>
        <div class="spacer"></div>
        <router-link to="/services/bridalhair" class="button">Learn More</router-link>
      </ContentWithImage>
    </div>
    <Reviews />
  </div>
</template>

<style scoped>
  .banner-logo {
    filter: invert();
  }

  #services {
    background-color: var(--color-background-primary);

    > h1 {
      text-align: center;
      margin-bottom: 30px;
    }
  }
</style>