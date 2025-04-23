<script setup>
  import PriceList from "../sections/PriceList.vue"
  import "@splidejs/splide/dist/css/splide.min.css"
  import Splide from "@splidejs/splide"
  import { onMounted, ref } from "vue"

  defineProps({
    service: Object
  })

  const componentId = Math.random()
  const splide = ref(null)
  const thumbnails = ref(null)

  onMounted(() => {
    const mainSplide = new Splide(splide.value, {
      autoWidth: true,
      arrows: true,
      pagination: false
    }).mount()

    const thumbnailSplide = new Splide(thumbnails.value, {
      autoWidth: true,
      arrows: false,
      pagination: false,
      isNavigation: true,
      gap: 12
    }).mount()

    mainSplide.sync(thumbnailSplide)
  })
</script>

<template>
  <section class="container">
    <div id="service-info-left">
      <div ref="splide" class="splide" id="service-info-carousel">
        <div class="splide__track">
          <ul class="splide__list">
            <li v-for="image of service.images" class="splide__slide">
              <img :src="`/assets/images/services/${service.id}/${image}`" :popupable="componentId" />
            </li>
          </ul>
        </div>
      </div>
      <div ref="thumbnails" class="splide" id="service-info-thumbnails">
        <div class="splide__track">
          <ul class="splide__list">
            <li v-for="image of service.images" class="splide__slide">
              <img :src="`/assets/images/services/${service.id}/${image}`" height="96" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="service-info-right">
      <h1>{{ service.heading }}</h1>
      <p>{{ service.description }}</p>
      <PriceList :pricelist="service.price_list" />
    </div>
  </section>
</template>

<style scoped>
  .container {
    flex-direction: row;
    gap: 32px;
    align-items: flex-start;
  }

  #service-info-left {
    overflow: hidden;
    flex: 1;
    position: sticky;
    top: calc(var(--header-height) + 20px);
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 100%;
  }

  .splide {
    overflow: hidden;
  }

  #service-info-carousel {
    border-radius: 24px;
    
    .splide__slide {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;

      & img {
        max-width: 100%;
      }
    } 
  }

  #service-info-thumbnails {
    max-width: 100%;

    .splide__slide {
      border-radius: 12px;
      overflow: hidden;
      border: 2px solid transparent;
      transition: border .15s ease;

      &.is-active {
        border: 2px solid var(--color-primary);
      }
    }
  }

  #service-info-right {
    display: flex;
    flex-direction: column;
    width: 600px;
    gap: 16px;

    & h1 {
      margin-bottom: -12px;
    }
  }

  @media (max-width: 1100px) {
    #service-info-right {
      width: 512px;
    }
  }

  @media (max-width: 950px) {
    #service-info-right {
      width: 400px;
    }
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    #service-info-left {
      position: initial;
    }

    #service-info-thumbnails img {
      height: 64px;
    }

    #service-info-right {
      width: 100%;
    }
  }
</style>