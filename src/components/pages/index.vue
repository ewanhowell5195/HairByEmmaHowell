<script setup>
  import hairdressing from "@/assets/json/services/hairdressing.json"
  import bridalHair from "@/assets/json/services/bridal_hair.json"
  import ContentWithImage from "../sections/ContentWithImage.vue"
  import Reviews from "../sections/Reviews.vue"
  import Banner from "../sections/Banner.vue"
  import About from "../sections/About.vue"

  function scrollToServices() {
    document.getElementById("services").scrollIntoView({ behavior: "smooth" })
  }
</script>

<template>
  <Banner image="/assets/images/home/banner.webp" mobileimage="/assets/images/home/banner_mobile.jpg">
    <img class="banner-logo" src="/assets/images/logo/transparent_light.webp">
    <p>Hairdresser with 15 years experience, based in Row Town. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget nisl vel quam dapibus tempus.</p>
    <button @click="scrollToServices" class="white">View Services</button>
  </Banner>
  <About heading="About Me" image="/assets/images/about/emma.webp">
    <p>I’m Emma, and I am a hairdresser based in my home salon in Row Town! I have been a hairdresser for 15 years with 10 of those years in a salon.</p>
    <router-link to="/about" class="button">Learn More</router-link>
  </About>
  <div id="services">
    <h1 class="container">My Services</h1>
    <hr>
    <ContentWithImage heading="Hairdressing" :image="hairdressing.images.map(e => `/assets/images/services/hairdressing/${e}`)">
      <p>{{ hairdressing.description }}</p>
      <div class="spacer"></div>
      <router-link to="/services/hairdressing" class="button white">Learn More</router-link>
    </ContentWithImage>
    <hr>
    <ContentWithImage content="left" heading="Bridal Hair" :image="bridalHair.images.map(e => `/assets/images/services/bridal_hair/${e}`)" :delay="1500">
      <p>{{ bridalHair.description }}</p>
      <div class="spacer"></div>
      <router-link to="/services/bridalhair" class="button white">Learn More</router-link>
    </ContentWithImage>
  </div>
  <Reviews />
</template>

<style scoped>
  #services {
    background-color: var(--color-background-primary);

    * {
      color: #fff;
    }

    > h1 {
      text-align: center;
      margin-bottom: 30px;
    }
  }
</style>