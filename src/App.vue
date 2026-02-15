<script setup>
  import PopupViewer from "./components/sections/PopupViewer.vue"
  import Header from "./components/sections/Header.vue"
  import Footer from "./components/sections/Footer.vue"
  import { refreshFadeIns } from "@/js/fadeIn"
  import { nextTick, onMounted } from "vue"
  import settings from "./settings.json"

  function scrollToTop() {
    window.scrollTo(0, 0)
  }

  async function onAfterEnter() {
    await nextTick()
    requestAnimationFrame(() => {
      refreshFadeIns()
    })
  }

  onMounted(() => {
    const root = document.documentElement
    Object.entries(settings.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
  })
</script>

<template>
  <Header />
  <div id="page">
    <router-view v-slot="{ Component }">
      <transition name="page-transition" mode="out-in" @before-enter="scrollToTop" @after-enter="onAfterEnter">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <Footer />
  <PopupViewer />
</template>

<style>
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #page, .page {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: clip;
  }

  #page > .container:first-child,
  .page > .container:first-child,
  #page > section:first-child > .container:first-child,
  .page > section:first-child > .container:first-child {
    padding-top: 20px;
  }

  .page-transition-enter-active,
  .page-transition-leave-active {
    transition: opacity .2s;
  }

  .page-transition-enter-from,
  .page-transition-leave-to {
    opacity: 0;
  }
</style>