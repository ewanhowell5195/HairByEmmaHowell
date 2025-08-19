<script setup>
  import "@splidejs/splide/dist/css/splide.min.css"
  import Splide from "@splidejs/splide"
  import { onMounted, ref } from "vue"

  const props = defineProps({
    image: {
      type: [String, Array],
      required: true,
      validator: value => {
        if (typeof value === "string") return true
        if (Array.isArray(value)) return value.every(v => typeof v === "string")
        return false
      }
    },
    heading: {
      type: String
    },
    content: {
      type: String,
      validator: value => value === "left" || value === "right"
    },
    interval: {
      type: Number,
      default: 3000
    },
    delay: {
      type: Number,
      default: 0
    }
  })

  const componentId = Math.random()
  const splide = ref(null)

  if (Array.isArray(props.image) && props.image.length > 1) {
    onMounted(() => {
      const instance = new Splide(splide.value, {
        autoWidth: true,
        arrows: false,
        autoplay: true,
        interval: props.interval,
        type: "loop",
        pauseOnHover: false
      }).mount()

      instance.Components.Autoplay.pause()

      setTimeout(() => {
        instance.Components.Autoplay.play()
      }, props.delay)

      let isInteracting = false

      const pause = () => {
        isInteracting = true
        instance.Components.Autoplay.pause()
      }

      const resume = () => {
        if (isInteracting) {
          isInteracting = false
          instance.Components.Autoplay.play()
        }
      }

      splide.value.addEventListener("mousedown", pause)
      splide.value.addEventListener("touchstart", pause)

      document.addEventListener("mouseup", resume)
      document.addEventListener("touchend", resume)
    })
  }
</script>

<template>
  <section class="content-with-image">
    <div class="container" :class="{ reverse: content === 'left' }">
      <h2 v-if="heading">{{ heading }}</h2>
      <div class="section-image">
        <img v-if="typeof image === 'string'" :src="image" popupable />
        <img v-else-if="image.length === 1" :src="image[0]" popupable />
        <div ref="splide" class="splide">
          <div class="splide__track">
            <ul class="splide__list">
              <li v-for="img of image" class="splide__slide">
                <img :src="img" :popupable="componentId" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content">
        <h2 v-if="heading">{{ heading }}</h2>
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<style scoped>
  section > div {
    flex-direction: row;

    > * {
      width: calc(50% - 12px);
    }

    &.reverse {
      flex-direction: row-reverse;
    }

    > h2 {
      display: none;
    }
  }

  .section-image {
    position: relative;
    display: flex;
    justify-content: center;

    > * {
      max-width: min(100%, 500px);
      aspect-ratio: 4 / 3;
    }

    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .splide__track, .splide__list, .splide__slide {
    height: 100%;
  }

  .splide__slide {
    width: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
  }

  :deep(h2) {
    text-align: center;
  }

  :deep(.button) {
    width: 256px;
    align-self: center;
  }

  @media (max-width: 768px) {
    section > div {
      flex-direction: column !important;

      > * {
        width: 100%;
      }

      > h2 {
        display: initial;
        text-align: left;
      }
    }

    .content {
      padding-bottom: 0;

      h2 {
        display: none;
      }
    }
  }
</style>