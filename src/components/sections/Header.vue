<script setup>
  import HamburgerButton from "@c/snippets/HamburgerButton.vue"
  import { ref, onMounted, onUnmounted, watch } from "vue"
  import Sidebar from "@c/sections/Sidebar.vue"

  const isScrolled = ref(false)
  const sidebarOpen = ref(false)

  function handleScroll() {
    isScrolled.value = window.scrollY > 0 || sidebarOpen.value
  }

  onMounted(() => {
    window.addEventListener("scroll", handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
  })

  watch(sidebarOpen, handleScroll)
</script>

<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="header container">
      <HamburgerButton v-model="sidebarOpen" />
      <router-link to="/" id="header-logo-link" @click="sidebarOpen = false">
        <img src="/assets/images/logo/transparent.webp" width="64" height="64">
        <span>Hair by Emma Howell</span>
      </router-link>
      <div class="spacer"></div>
      <nav>
        <router-link to="/services/hairdressing">Hairdressing</router-link>
        <router-link to="/services/bridalhair">Bridal Hair</router-link>
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
    scroll-padding-top: var(--header-height);
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
    transition: box-shadow .25s ease;
  }

  .header {
    margin: 24px auto;
    flex-direction: row;
    align-items: center;
    gap: 32px;
  }

  #header-logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 16px;

    & span {
      font-family: var(--font-heading) !important;
      font-size: 40px;
      margin-top: 7px;
    }
  }

  header.scrolled {
    box-shadow: var(--box-shadow);
  }

  .spacer {
    margin-right: -32px;
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

  @media (max-width: 1000px) {
    #header-logo-link span {
      font-size: 32px;
    }
  }

  @media (max-width: 900px) {
    nav {
      display: none;
    }

    #header-logo-link {
      flex: 1;
      justify-content: center;
      margin-right: calc(32px + 35px);

      & span {
        font-size: 40px;
      }
    }

    .spacer {
      display: none;
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