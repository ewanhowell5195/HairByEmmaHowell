<script setup>
  defineProps({
    image: {
      type: String,
      required: true
    },
    heading: {
      type: String
    }
  })
</script>

<template>
  <section class="container">
    <h1 v-if="heading">{{ heading }}</h1>
    <img :src="image" popupable width="256" height="256" />
    <div class="content">
      <h1 v-if="heading">{{ heading }}</h1>
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
  section {
    flex-direction: row;
    justify-content: center;
    text-align: center;

    > h1 {
      display: none;
    }
  }

  img {
    display: block;
    max-width: 256px;
    height: 256px;
    border-radius: 50%;
    box-shadow: 0 5px 10px #0004;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    max-width: 512px;
  }

  :deep(p) {
    font-family: Oooh Baby, Arial, serif;
    font-size: 24px;
  }

  :deep(.button) {
    width: 256px;
    align-self: center;
  }

  @media (max-width: 768px) {
    section {
      flex-direction: column !important;
      align-items: center;

      > * {
        width: 100%;
      }

      > h1 {
        display: initial;
      }
    }

    img {
      display: block;
      max-width: 200px;
      height: 200px;
    }

    .content {
      padding-bottom: 0;
      padding-top: 0;

      h1 {
        display: none;
      }
    }
  }
</style>