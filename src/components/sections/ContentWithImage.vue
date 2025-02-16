<script setup>
  import { defineProps } from 'vue'

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
  <section class="container" :class="{ reverse: content === 'left' }">
    <h1 v-if="heading">{{ heading }}</h1>
    <div class="section-image">
      <img :src="image" popupable />
    </div>
    <div class="content">
      <h1 v-if="heading">{{ heading }}</h1>
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
  section {
    flex-direction: row;

    > * {
      width: calc(50% - 12px);
    }

    &.reverse {
      flex-direction: row-reverse;
    }

    > h1 {
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

  ::v-deep h1 {
    text-align: center;
  }

  ::v-deep .button {
    width: 256px;
    align-self: center;
  }

  @media (max-width: 768px) {
    section {
      flex-direction: column !important;

      > * {
        width: 100%;
      }

      > h1 {
        display: initial;
        text-align: left;
      }
    }

    .content {
      padding-bottom: 0;

      h1 {
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