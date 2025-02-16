<script setup>
  import Reviews from "../sections/Reviews.vue"
  import Banner from "../sections/Banner.vue"
  import ContentWithImage from "../sections/ContentWithImage.vue"

  function scrollToServices() {
    document.getElementById("services").scrollIntoView({ behavior: "smooth" })
  }
</script>

<template>
  <Banner image="/assets/images/home/banner.webp">
    <div class="banner-title">Hair by Emma Howell</div>
    <p>Hairdresser with 15 years experience, based in Row Town. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget nisl vel quam dapibus tempus.</p>
    <button @click="scrollToServices" class="white">View Services</button>
  </Banner>
  <ContentWithImage id="services" heading="Hairdressing" image="/assets/images/home/hairdressing.webp">
    <p>Hairdresser with 15 years experience, based in Row Town. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget nisl vel quam dapibus tempus.</p>
    <div class="spacer"></div>
    <router-link to="/hairdressing" class="button">Learn More</router-link>
  </ContentWithImage>
  <ContentWithImage content="left" heading="Bridal Hair" image="/assets/images/home/bridalhair.webp">
    <p>Hairdresser with 15 years experience, based in Row Town. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget nisl vel quam dapibus tempus.</p>
    <div class="spacer"></div>
    <router-link to="/bridalhair" class="button">Learn More</router-link>
  </ContentWithImage>
  <Reviews />
</template>