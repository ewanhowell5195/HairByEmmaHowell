<script setup>
  defineProps({
    image: {
      type: String,
      required: true
    },
    heading: {
      type: String
    },
    content: {
      type: String,
      validator: value => value === "left" || value === "right"
    }
  })
</script>

<template>
  <section class="content-with-image">
    <div class="container" :class="{ reverse: content === 'left' }">
      <h2 v-if="heading">{{ heading }}</h2>
      <div class="section-image">
        <img :src="image" popupable />
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
    min-height: 320px;

    & img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 24px;
    }
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

  @media (max-width: 512px) {
    .section-image {
      position: relative;
      min-height: 256px;
    }
  }
</style>