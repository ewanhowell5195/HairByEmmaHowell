<script setup>
  import Footer from "./components/sections/Footer.vue"
  import PopupViewer from "./components/sections/PopupViewer.vue"
</script>

<template>
  <div id="page">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
    <router-view />
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

  #page {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
</style>