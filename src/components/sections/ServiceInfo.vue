<script setup>
  import PriceList from "@c/sections/PriceList.vue"
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
      pagination: false,
      flickPower: 75,
      flickMaxPages: 0.3
    }).mount()

    const thumbnailSplide = new Splide(thumbnails.value, {
      autoWidth: true,
      arrows: false,
      pagination: false,
      isNavigation: true,
      gap: 12,
      flickPower: 75,
      flickMaxPages: 0.3
    }).mount()

    mainSplide.sync(thumbnailSplide)
  })
</script>

<template>
  <section>
    <div class="container">
      <div id="service-info-left">
        <div ref="splide" class="splide" id="service-info-carousel">
          <div class="splide__track">
            <ul class="splide__list">
              <li v-for="image of service.images" class="splide__slide">
                <img :src="`/assets/images/services/${service.id}/${image}`" :popupable="componentId" loading="lazy" />
              </li>
            </ul>
          </div>
        </div>
        <div ref="thumbnails" class="splide" id="service-info-thumbnails">
          <div class="splide__track">
            <ul class="splide__list">
              <li v-for="image of service.images" class="splide__slide">
                <img :src="`/assets/images/services/${service.id}/${image}`" loading="lazy" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="service-info-right">
        <h1>{{ service.heading }}</h1>
        <div v-html="service.description" />
        <PriceList :pricelist="service.price_list" />
      </div>
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

  #service-info-carousel .splide__slide {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;

    & img {
      max-width: 100%;
      aspect-ratio: 3 / 4;
      object-fit: cover;
    }
  }

  #service-info-thumbnails {
    max-width: 100%;

    .splide__slide {
      border: 2px solid transparent;
      transition: border .15s;
      width: calc(100% / 6 - (12px * 5) / 6);

      &:hover {
        border: 2px solid #ccc;
      }

      &.is-active {
        border: 2px solid #000;
      }
    }

    img {
      aspect-ratio: 1;
      object-fit: cover;
      width: 100%;
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

    #service-info-right {
      width: 100%;
    }

    #service-info-carousel .splide__slide img {
      aspect-ratio: 1;
    }

    #service-info-thumbnails .splide__slide {
      width: calc(100% / 5 - (12px * 4) / 5);
    }
  }
</style>