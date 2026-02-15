<script>
  export default {
    title: "Contact",
    description: "Get in touch with Emma Howell."
  }
</script>

<script setup>
  import { onMounted, ref } from "vue"
  import CustomForm from "@c/snippets/Form.vue"

  const redirect = ref(null)

  onMounted(() => {
    redirect.value = `${window.location.origin}/submitted`
  })
</script>

<template>
  <div class="container">
    <h1>Contact</h1>
    <p>
      Want to get in touch or learn more?  Use the form below, reach out directly, or connect on social media.
    </p>

    <CustomForm boxed>
      <label for="message">Message</label>
      <textarea id="message" name="message" placeholder="Your Message" required></textarea>
    </CustomForm>

    <div id="contact-links">
      <div class="contact-links">
        <h2>Direct Contact</h2>
        <p>
          <span class="icon">call</span>
          <a href="tel:+447791697744">+44 7791 697744</a>
        </p>
        <p>
          <span class="icon">mail</span>
          <a href="mailto:contact@hairbyemmahowell.co.uk">contact@hairbyemmahowell.co.uk</a>
        </p>
      </div>

      <div class="contact-links">
        <h2>Social Media</h2>
        <p>
          <span class="fa fa-instagram"></span>
          <a href="https://www.instagram.com/hairby_emmahowell_/" target="_blank">@hairby_emmahowell_</a>
        </p>
        <p>
          <span class="fa fa-instagram"></span>
          <a href="https://www.instagram.com/bridalhairby_emmahowell/" target="_blank">@bridalhairby_emmahowell</a>
        </p>
        <p>
          <span class="fa fa-facebook"></span>
          <a href="https://www.facebook.com/people/Hair-by-Emma-Howell/61559965659213/" target="_blank">Hair by Emma Howell</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  p {
    display: flex;
    align-items: center;
    gap: 8px;
    
  }

  a {
    font-size: 18px;
  }

  span {
    font-size: 28px;
  }

  #contact-links {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 8px;

    & h2 {
      margin-bottom: 0;
    }
  }
</style>