<script setup>
  import about from "@/assets/json/about.json"

  defineProps({
    extra: {
      type: Boolean
    },
    link: {
      type: Boolean
    }
  })
</script>

<template>
  <section class="container">
    <img :src="'/assets/images/about/' + about.image" popupable width="256" height="256" />
    <div class="content">
      <div v-html="about.intro"></div>
      <router-link v-if="link" to="/about" class="button">Learn More</router-link>
    </div>
  </section>
  <section v-if="extra" class="container">
    <div class="more-content" v-html="about.extra"></div>
  </section>
</template>

<style scoped>
  section {
    flex-direction: row;
    justify-content: center;
    align-items: center;

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
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    max-width: 512px;
    text-align: center;

    * {
      text-align: center;
    }
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