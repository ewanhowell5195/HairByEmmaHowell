<script>
  export default {
    title: "Contact",
    description: "Get in touch with Emma Howell."
  }
</script>

<template>
  <div class="container">
    <h1>Contact</h1>
    <p>
      Want to get in touch or learn more?  Use the form below, reach out directly, or connect on social media.
    </p>

    <form action="https://api.web3forms.com/submit" method="POST">
      <input type="hidden" name="access_key" value="918c1fad-1f80-48ec-b7e8-133784209a2b" />
      <input type="hidden" name="subject" value="New Contact form submission for Hair by Emma Howell">
      <label for="name">Name</label>
      <input id="name" type="text" name="name" placeholder="Your Name" required />
      <label for="email">Email</label>
      <input id="email" type="email" name="email" placeholder="name@example.com" required />
      <label for="message">Message</label>
      <textarea id="message" name="message" placeholder="Your Message" required></textarea>
      <button type="submit" class="white">Submit</button>
    </form>

    <h2>Direct Contact</h2>
    <p>
      <span class="icon">call</span>
      <a href="tel:+447791697744">+44 7791 697744</a>
    </p>
    <p>
      <span class="icon">mail</span>
      <a href="mailto:contact@hairbyemmahowell.co.uk">contact@hairbyemmahowell.co.uk</a>
    </p>

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

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    outline: 2px solid var(--color-primary);
    padding: 16px;
    border-radius: 24px;
    background-color: var(--color-background-primary);
    color: #fff;
    margin-bottom: 20px;

    & label {
      margin-bottom: -8px;
      font-weight: 700;
      font-size: 18px;
    }
  }
</style>