<script setup>
  import HamburgerButton from "../snippets/HamburgerButton.vue"
  import { ref, onMounted, onUnmounted, watch } from "vue"
  import Sidebar from "../sections/Sidebar.vue"

  const isScrolled = ref(false)
  const sidebarOpen = ref(false)

  function handleScroll() {
    isScrolled.value = window.scrollY > 0 || sidebarOpen.value
  }

  function handleResize() {
    if (window.innerWidth > 800) {
      sidebarOpen.value = false
    }
  }

  onMounted(() => {
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
    window.removeEventListener("resize", handleResize)
  })

  watch(sidebarOpen, handleScroll)
</script>

<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="header container">
      <HamburgerButton v-model="sidebarOpen" />
      <router-link to="/" id="header-logo-link">
        <img src="/assets/images/logo/transparent.webp" width="64" height="64">
        <img src="/assets/images/logo/transparent_light.webp" width="64" height="64">
        <span>Hair by Emma Howell</span>
      </router-link>
      <nav>
        <router-link to="/hairdressing">Hairdressing</router-link>
        <router-link to="/bridalhair">Bridal Hair</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </div>
  </header>
  <Sidebar v-model="sidebarOpen" />
</template>

<style>
  :root {
    --header-height: 112px;
    scroll-padding-top: calc(var(--header-height) + 40px);
  }

  @media (max-width: 768px) {
    :root {
      --header-height: 64px;
    }
  }
</style>

<style scoped>
  header {
    background-color: var(--color-background);
    position: sticky;
    top: 0;
    z-index: 50;
    transition: background-color .25s ease;

    * {
      color: #000;
      transition: color .25s ease, background-color .25s ease;
    }

    &:not(.scrolled) + #sidebar {
      background-color: var(--color-background);

      & * {
        color: #000 !important;
      }
    }
  }

  .header {
    margin: 24px auto;
    flex-direction: row;
    align-items: center;
    gap: 32px;
    justify-content: space-between;
  }

  #header-logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 16px;

    & img {
      transition: opacity .25s ease;
    }

    & img:nth-child(2) {
      margin-left: -80px;
      opacity: 0;
    }

    & span {
      font-family: var(--font-heading) !important;
      font-size: 32px;
    }
  }

  header.scrolled {
    background-color: var(--color-primary);

    * {
      color: #fff;
    }

    & a::before {
      background-color: #fff;
    }

    #header-logo-link img {
      opacity: 0;
    }

    #header-logo-link img:nth-child(2) {
      opacity: 1;
    }
  }

  nav {
    display: flex;
    gap: 16px;

    & a {
      font-size: 20px;
      text-decoration: none;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        bottom: 2px;
        height: 2px;
        background-color: #000;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        transition: width .15s ease;
      }

      &:hover::before {
        width: 100%;
      }
    }
  }

  .hamburger-menu {
    display: none;
  }

  @media (max-width: 800px) {
    nav {
      display: none;
    }

    .hamburger-menu {
      display: flex;
    }

    #header-logo-link {
      flex: 1;
      justify-content: center;
      margin-right: calc(32px + 35px);
    }
  }

  @media (max-width: 768px) {
    .header {
      gap: 16px;
      padding: 0 16px;
      margin: 12px 0;
    }

    #header-logo-link {
      margin-right: calc(16px + 35px);
      gap: 12px;

      & img {
        width: 40px;
        height: 40px;

        &:nth-child(2) {
          margin-left: -52px;
        }
      }

      & span {
        font-size: 24px;
      }
    }
  }
</style>