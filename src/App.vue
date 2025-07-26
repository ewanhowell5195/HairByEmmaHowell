<script setup>
  import Header from "./components/sections/Header.vue"
  import Footer from "./components/sections/Footer.vue"
  import PopupViewer from "./components/sections/PopupViewer.vue"

  function scrollToTop() {
    window.scrollTo(0, 0)
  }
</script>

<template>
  <Header />
  <div id="page">
    <router-view v-slot="{ Component }">
      <transition name="page-transition" mode="out-in" @before-enter="scrollToTop">
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

    > .container:first-child {
      margin-top: 20px;
    }
  }

  .page-transition-enter-active,
  .page-transition-leave-active {
    transition: opacity .2s ease;
  }

  .page-transition-enter-from,
  .page-transition-leave-to {
    opacity: 0;
  }
</style>