<script setup>
  defineProps({
    image: {
      type: String,
      required: true
    },
    mobileimage: {
      type: String
    }
  })
</script>

<template>
  <section :class="{ desktop: mobileimage }" :style="{ backgroundImage: `url(${image})` }">
    <div class="banner-content container fade-in">
      <slot></slot>
    </div>
  </section>
  <section v-if="mobileimage" class="mobile" :style="{ backgroundImage: `url(${mobileimage})` }">
    <div class="banner-content container fade-in">
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
    height: 100%;
    margin: 0 auto;
    padding: 40px;
    position: relative;
    text-align: center;
    text-shadow: 0 2px 2px #0008;
  }

  :deep(.banner-title) {
    font-family: var(--font-heading) !important;
    font-size: 92px;
    line-height: 1;
  }

  :deep(.banner-logo) {
    height: 200px;
  }

  :deep(p) {
    max-width: 620px;
    font-size: 20px;
  }

  :deep(*) {
    color: #fff;
  }

  @media (max-width: 768px) {
    :deep(.banner-title) {
      font-family: var(--font-heading) !important;
      font-size: 64px;
    }

    :deep(p) {
      font-size: 18px;
    }
  }
</style>