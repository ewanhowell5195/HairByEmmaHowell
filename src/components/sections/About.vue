<script setup>
  import about from "@/assets/json/about.json"
  import Image from "@c/snippets/Image.vue"

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
  <section>
    <div class="container">
      <Image :src="'/assets/images/about/' + about.image" data-popupable width="256" height="256" />
      <div class="content">
        <div v-html="about.intro" class="fade-in"></div>
        <router-link v-if="link" to="/about" class="button fade-in">Learn More</router-link>
      </div>
    </div>
    <div v-if="extra" class="container">
      <div class="more-content fade-in fade-in-left" v-html="about.extra"></div>
    </div>
  </section>
</template>

<style scoped>
  .container {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  img {
    display: block;
    max-width: 256px;
    min-width: 256px;
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
    .container {
      flex-direction: column;
    }

    img {
      display: block;
      max-width: 200px;
      min-width: 200px;
      height: 200px;
    }

    .content {
      display: contents;
    }

    .more-content {
      text-align: center;
      margin-top: calc(-40px + 1lh);
    }

    .button {
      order: 2;
    }
  }
</style>