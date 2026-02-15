<script setup>
  defineProps({
    src: {
      type: String,
      required: true
    },
    zoom: {
      type: [String, Number],
      default: 15
    }
  })
</script>

<template>
  <section>
    <div class="container">
      <div class="location-map">
        <iframe :src="src" class="fade-in fade-in-static"></iframe>
      </div>
      <div class="location-content">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
  .container {
    flex-direction: row;
    align-items: flex-start;

    > * {
      width: calc(50% - 12px);
    }
  }

  .location-map {
    position: relative;
    min-height: 450px;
  }

  .location-map iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 0;
  }

  .location-content {
    padding: 24px;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column-reverse;

      > * {
        width: 100%;
      }
    }

    .location-content {
      padding: 0 0 8px;
    }

    .location-map {
      min-height: 256px;
    }

    :deep(.button) {
      margin: 0 auto;
    }
  }
</style>