<script setup>
  const props = defineProps({
    images: {
      type: Array,
      required: true
    }
  })

  const componentId = Math.random()

  function chunkAlternating(images, bigSize, smallSize, gap) {
    const result = []
    let i = 0
    let toggle = true
    while (i < images.length) {
      const size = toggle ? bigSize : smallSize
      result.push({
        type: toggle ? "big" : "small",
        items: images.slice(i, i + size),
        style: `width: calc((100% - ${gap}px * ${size - 1}) / ${size})`
      })
      i += size
      toggle = !toggle
    }
    return result
  }

  const desktopChunks = chunkAlternating(props.images, 3, 5, 24)
  const mobileChunks = chunkAlternating(props.images, 2, 3, 16)
</script>

<template>
  <section class="container">
    <h1>Gallery</h1>

    <div class="gallery desktop">
      <div v-for="(group, i) in desktopChunks" :key="i" class="row">
        <img
          v-for="src in group.items"
          :key="src"
          :src="src"
          class="image"
          :style="group.style"
          :popupable="componentId"
        />
      </div>
    </div>

    <div class="gallery mobile">
      <div v-for="(group, i) in mobileChunks" :key="i" class="row">
        <img
          v-for="src in group.items"
          :key="src"
          :src="src"
          class="image"
          :style="group.style"
          :popupable="componentId"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
  .gallery {
    display: none;
    flex-direction: column;
    gap: 24px;
  }

  .gallery.desktop {
    display: flex;
  }

  .gallery.mobile {
    display: none;
  }

  .image {
    height: auto;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 768px) {
    .gallery {
      gap: 16px;
    }
  }
</style>