<script setup>
  import { onMounted, onBeforeUnmount, ref } from "vue"

  const props = defineProps({
    image: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  })

  const section = ref(null)
  const showImage = ref(false)

  let raf = 0

  function computeShow() {
    const el = section.value
    if (!el) return

    const r = el.getBoundingClientRect()
    const vh = window.innerHeight

    const nearOrInView = r.top < vh + 40 && r.bottom > -40
    showImage.value = nearOrInView
  }

  function onScroll() {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(computeShow)
  }

  onMounted(() => {
    computeShow()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", onScroll)
  })
</script>

<template>
  <section ref="section">
    <div class="container">
      <img :src="image" v-show="showImage">
      <div v-html="content" class="content fade-in"></div>
    </div>
  </section>
</template>

<style scoped>
  :deep(*) {
    color: #fff;
  }

  :deep(p) {
    font-size: 32px;
    min-height: 1lh;
  }

  section {
    background: initial;
    min-height: 700px;
  }

  img {
    position: fixed;
    inset: -12px;
    z-index: -1;
    width: calc(100% + 24px);
    height: calc(100% + 24px);
    object-fit: cover;
    filter: blur(6px) saturate(0.75) brightness(0.8);
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .content {
    position: relative;
    text-align: center;
    max-width: 750px;
  }

  .content::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background-color: #0004;
    filter: blur(40px);
    z-index: -1;
  }

  @media (max-width: 768px) {
    section {
      min-height: 600px;
    }

    :deep(p) {
      font-size: 24px;
    }
  }
</style>