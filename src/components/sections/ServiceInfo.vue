<script setup>
  import "@splidejs/splide/dist/css/splide.min.css"
  import Splide from "@splidejs/splide"
  import { onMounted, ref } from "vue"

  defineProps({
    service: Object
  })

  const componentId = Math.random()
  const splide = ref(null)

  onMounted(() => {
    new Splide(splide.value, {
      autoWidth: true,
      arrows: true,
      pagination: false
    }).mount()
  })
</script>

<template>
  <section class="container">
    <div id="service-info-left">
      <div ref="splide" class="splide">
        <div class="splide__track">
          <ul class="splide__list">
            <li v-for="image of service.images" class="splide__slide">
              <img :src="`/assets/images/services/${service.id}/${image}`" :popupable="componentId" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="service-info-right">
      <h1>{{ service.heading }}</h1>
      <p>{{ service.description }}</p>
    </div>
  </section>
</template>

<style scoped>
  .container {
    flex-direction: row;
    gap: 32px;
  }

  #service-info-left {
    overflow: hidden;
    flex: 1;
  }

  .splide {
    border-radius: 24px;
    overflow: hidden;
  }

  .splide__slide {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;

    & img {
      max-width: 100%;
    }
  }

  #service-info-right {
    display: flex;
    flex-direction: column;
    width: 600px;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    #service-info-right {
      width: 100%;
    }
  }
</style>