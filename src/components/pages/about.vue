<script>
  export default {
    title: "About Me",
    description: "Find out about me on this page!"
  }
</script>

<script setup>
  import AboutSection from "../sections/About.vue"
  import Location from "../sections/Location.vue"
  import about from "@/assets/json/about.json"
</script>

<template>
  <div class="page">
    <AboutSection :content="about.intro" :more="about.extra" />
    <Location id="location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155.70192252757315!2d-0.5140978637040393!3d51.36205433094912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876770026376bab%3A0xfaf9f687a4a77cad!2sHair%20by%20Emma%20Howell!5e0!3m2!1sen!2suk!4v1745087440083!5m2!1sen!2suk">
      <h1>Where to Find Me</h1>
      <p style="margin-bottom: 16px;">I am based in Row Town in Addlestone. Get in touch to book an appointment or ask any questions.</p>
      <router-link to="/contact" class="button">Contact Me</router-link>
    </Location>
  </div>
</template>

<style scoped>
  #location {
    background-color: var(--color-background-primary);
  }
</style>