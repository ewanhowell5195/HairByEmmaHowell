<template>
  <img
    ref="imgEl"
    :src="src"
    :class="{ loaded: loaded && inView }"
    loading="lazy"
    @load="onLoad"
  />
</template>

<script setup>
  import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue"

  const props = defineProps({
    src: String,
    delay: {
      type: Number,
      default: 0
    }
  })

  const imgEl = ref(null)
  const loaded = ref(false)
  const inView = ref(false)

  let raf
  let delayTimer

  function computeInView() {
    const el = imgEl.value
    if (!el) return false

    const r = el.getBoundingClientRect()
    if (r.height <= 0 || r.width <= 0) return false

    const vh = window.innerHeight

    const intersectsViewport = r.top < vh && r.bottom > 0
    if (!intersectsViewport) return false

    if (r.top < 0) return true
    return r.top <= vh * 0.85
  }

  function applyInView() {
    if (inView.value) return
    inView.value = true
    stopWatching()
  }

  function updateInView() {
    if (inView.value) return
    if (!computeInView()) return

    const d = Number(props.delay) || 0
    if (d <= 0) {
      applyInView()
      return
    }

    if (delayTimer) return
    delayTimer = setTimeout(() => {
      delayTimer = null
      applyInView()
    }, d)
  }

  function onLoad() {
    loaded.value = true
  }

  function onScroll() {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(updateInView)
  }

  function startWatching() {
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    updateInView()
  }

  function stopWatching() {
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", onScroll)
    cancelAnimationFrame(raf)
    if (delayTimer) {
      clearTimeout(delayTimer)
      delayTimer = null
    }
  }

  onMounted(() => {
    startWatching()
  })

  onBeforeUnmount(() => {
    stopWatching()
  })

  watch(() => props.src, async () => {
    loaded.value = false
    inView.value = false
    stopWatching()
    await nextTick()
    startWatching()
  })
</script>

<style scoped>
  img {
    opacity: 0;
    transition: opacity 0.5s, box-shadow .15s;
  }

  img.loaded {
    opacity: 1;
  }
</style>