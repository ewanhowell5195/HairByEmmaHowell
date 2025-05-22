<script setup>
  defineProps({
    images: {
      type: Array,
      required: true
    }
  })

  const componentId = Math.random()
</script>

<template>
  <section class="container">
    <h1>Gallery</h1>
    <div class="grid">
      <img v-for="src in images" :src="src" class="image" :popupable="componentId" />
    </div>
  </section>
</template>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    border-radius: 12px;
  }
</style>