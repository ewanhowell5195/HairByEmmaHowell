<script>
  export default {
    title: "Message Sent",
    description: "Confirmation page after contact form submission.",
    data() {
      return {
        firstName: ""
      }
    },
    mounted() {
      const params = new URLSearchParams(window.location.search)
      this.firstName = params.get("name") || ""
    }
  }
</script>

<template>
  <div class="container">
    <h1 v-if="firstName">Thank You {{ firstName }}!</h1>
    <h1 v-else>Thank You!</h1>
    <p>Your message has been sent. I’ll be in touch soon.</p>
    <router-link to="/" class="button">Back to Home</router-link>
  </div>
</template>

<style scoped>
  .container {
    align-items: center;
    text-align: center;
    justify-content: center;
    flex: 1;
  }
</style>