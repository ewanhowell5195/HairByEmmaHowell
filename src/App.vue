<script setup>
  import Footer from "./components/sections/footer.vue"
</script>

<template>
  <div>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
  <Footer />
</template>

<style>
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>