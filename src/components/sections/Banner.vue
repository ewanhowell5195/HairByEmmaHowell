<script setup>
  import { defineProps } from 'vue'

  defineProps({
    image: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <section :style="{ backgroundImage: `url(${image})` }">
    <div class="banner-content container">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
  section {
    background-size: cover;
    background-position: center;
    position: relative;
    height: 512px;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: #0004;
      backdrop-filter: blur(4px);
    }
  }

  .banner-content {
    align-items: center;
    justify-content: center;
    color: #fff;
    height: 100%;
    margin: 0 auto;
    padding: 40px;
    position: relative;
    text-align: center;
    text-shadow: 0 2px 2px #0008;
  }

  ::v-deep .banner-title {
    font-family: var(--font-heading) !important;
    font-size: 92px;
      line-height: 1;
  }

  ::v-deep p {
    max-width: 512px;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    ::v-deep .banner-title {
      font-family: var(--font-heading) !important;
      font-size: 64px;
    }

    ::v-deep p {
      font-size: 18px;
    }
  }
</style>