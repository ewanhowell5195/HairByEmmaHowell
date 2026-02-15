<script setup>
  import Image from "@c/snippets/Image.vue"
  import Splide from "@splidejs/splide"
  import { onMounted, ref } from "vue"

  const props = defineProps({
    title: {
      type: String
    },
    images: {
      type: Array,
      required: true
    },
    carousel: {
      type: Boolean,
      default: false
    }
  })

  const componentId = Math.random()
  const splide = ref(null)
  let desktopChunks = ref(null)
  let mobileChunks = ref(null)

  if (props.carousel) {
    onMounted(async () => {
      if (splide.value) {
        new Splide(splide.value, {
          gap: "24px",
          autoWidth: true,
          arrows: false,
          pagination: false,
          flickPower: 75,
          flickMaxPages: 0.3,
          type: "loop"
        }).mount()
      }
    })
  } else {
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

    desktopChunks.value = chunkAlternating(props.images, 3, 5, 24)
    mobileChunks.value = chunkAlternating(props.images, 2, 3, 16)
  }
</script>

<template>
  <section>
    <div class="container">
      <h1 v-if="title">{{ title }}</h1>
      <template v-if="carousel">
        <div ref="splide" class="splide fade-in fade-in-static">
          <div class="splide__track">
            <ul class="splide__list">
              <li v-for="img of images" class="splide__slide">
                <img :src="img" :popupable="componentId" loading="lazy" />
              </li>
            </ul>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="gallery desktop">
          <div v-for="(group, i) in desktopChunks" :key="i" class="row">
            <Image
              v-for="(src, j) in group.items"
              :key="src"
              :src="src"
              class="image"
              :style="group.style"
              :popupable="componentId"
              :delay="j * 150"
            />
          </div>
        </div>
        <div class="gallery mobile">
          <div v-for="(group, i) in mobileChunks" :key="i" class="row">
            <Image
              v-for="(src, j) in group.items"
              :key="src"
              :src="src"
              class="image"
              :style="group.style"
              :popupable="componentId"
              :delay="j * 150"
            />
          </div>
        </div>
      </template>
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
    aspect-ratio: 1;
  }

  .splide__track {
    overflow: visible;
  }

  .splide__slide {
    aspect-ratio: 1;
    width: calc(100% / 4 - (24px * 3) / 4);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 768px) {
    .gallery {
      gap: 16px;
    }
  }
</style>