<template>
  <footer>
    <div class="container">
      <div id="footer-upper">
        <router-link to="/" id="footer-logo">
          <img src="/assets/images/logo/transparent.webp" alt="Logo" width="128" height="128">
        </router-link>
        <div class="footer-links">
          <div>Pages</div>
          <router-link to="/services/hairdressing">Hairdressing</router-link>
          <router-link to="/services/bridalhair">Bridal Hair</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/contact">Contact</router-link>
        </div>
        <div class="footer-links">
          <div>Legal</div>
          <router-link to="/privacy">Privacy Policy</router-link>
          <router-link to="/terms">Booking Terms</router-link>
        </div>
      </div>
      <hr>
      <div id="footer-socials">
        <a href="https://www.facebook.com/profile.php?id=61559965659213" class="fa fa-facebook-f" target="_blank"></a>
        <a href="https://www.instagram.com/hairby_emmahowell_/" class="fa fa-instagram" style="font-size: 24px;" target="_blank"></a>
        <a href="https://www.instagram.com/bridalhairby_emmahowell/" class="fa fa-instagram" style="font-size: 24px;" target="_blank"></a>
        <a :href="'https://search.google.com/local/reviews?placeid=' + $settings.placeId" class="fa fa-google" target="_blank"></a>
      </div>
      <p id="footer-copyright">&copy; {{ new Date().getFullYear() }} Hair by Emma Howell. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
  footer {
    background-color: var(--color-primary);
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    margin-bottom: 40px;
  }

  #footer-upper {
    display: flex;
    justify-content: space-around;
    gap: 32px;
    width: 100%;
    flex-wrap: wrap;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 4px;

    div {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 4px;
    }
  }

  #footer-copyright {
    opacity: 0.5;
    text-align: center;
  }

  #footer-socials {
    display: flex;
    gap: 8px;

    a {
      font-size: 20px;
      border: 1px solid #000;
      width: 40px;
      height: 40px;
    }
  }

  @media (max-width: 600px) {
    #footer-logo {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
</style>