<script setup>
  import { ref, nextTick, onMounted, onBeforeUnmount } from "vue"
  import reviewsList from "@/assets/json/reviews.json"
  import "@splidejs/splide/dist/css/splide.min.css"
  import Image from "@c/snippets/Image.vue"
  import Splide from "@splidejs/splide"

  const props = defineProps({
    service: {
      type: String
    }
  })

  let reviews = reviewsList
  if (props.service) {
    reviews = reviews.filter(e => e.service === props.service)
  }

  const componentId = Math.random()
  const splide = ref(null)

  const containers = ref([])
  const overflowing = ref(Array.from({ length: reviews.length }, () => false))
  const expanded = ref(Array.from({ length: reviews.length }, () => false))

  let ro

  function formatDate(str) {
    const date = new Date(str.split("/").reverse().join("-"))
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  function measureContainer(el, index) {
    const wrapper = el?.querySelector(".review-content-wrapper")
    if (!wrapper) return

    const h = Math.ceil(wrapper.scrollHeight)
    el.style.setProperty("--height", `${h}px`)

    const isOverflowing = h > 166
    overflowing.value[index] = isOverflowing
    if (!isOverflowing) expanded.value[index] = false
  }

  function measureAll() {
    for (let i = 0; i < containers.value.length; i++) {
      const el = containers.value[i]
      if (!el) continue
      measureContainer(el, i)
    }

    overflowing.value = overflowing.value.slice()
    expanded.value = expanded.value.slice()
  }

  function toggleExpanded(i) {
    expanded.value[i] = !expanded.value[i]
    expanded.value = expanded.value.slice()
  }

  onMounted(async () => {
    if (splide.value) {
      new Splide(splide.value, {
        gap: "24px",
        autoWidth: true,
        arrows: false,
        flickPower: 75,
        flickMaxPages: 0.3,
        omitEnd: true,
        focus: 0
      }).mount()
    }

    await nextTick()
    measureAll()

    ro = new ResizeObserver(() => {
      measureAll()
    })

    containers.value.forEach(el => {
      if (el) ro.observe(el)
    })
  })

  onBeforeUnmount(() => {
    if (ro) ro.disconnect()
  })
</script>

<template>
  <section>
    <div class="container">
      <div class="review-row">
        <h1>Customer Reviews</h1>
        <a class="button desktop" :href="'https://search.google.com/local/reviews?placeid=' + $settings.placeId" target="_blank"><i class="icon">edit</i> Write a review</a>
      </div>
      <div v-if="reviews.length" ref="splide" class="splide pagination-below">
        <div class="splide__track">
          <ul class="splide__list">
            <li
              v-for="(review, index) in reviews"
              :key="index"
              class="splide__slide fade-in"
              :delay="index * 300"
            >
              <div v-if="!service" class="review-service">{{ review.service.replaceAll("_", " ") }}</div>
              <h3>{{ review.heading }}</h3>
              <div
                class="review-content-container"
                :class="{ overflowing: overflowing[index], expanded: expanded[index] }"
                :ref="el => containers[index] = el"
              >
                <div class="review-content-wrapper">
                  <p class="review-content">{{ review.review }}</p>
                  <div v-if="overflowing[index]" class="show-more"><i class="icon">add</i>Show More</div>
                  <div v-if="overflowing[index]" class="show-more" @click="toggleExpanded(index)">
                    <i class="icon">add</i>
                    {{ expanded[index] ? "Show Less" : "Show More" }}
                  </div>
                </div>
              </div>
              <div class="review-user">
                <Image
                  v-if="review.image1"
                  :src="'/assets/images/reviews/' + review.image1"
                  alt="Avatar"
                  class="avatar"
                  width="56"
                  height="56"
                  :delay="index * 300"
                />
                <i v-else class="avatar-fallback icon">person</i>
                <div class="review-user-details">
                  <div>{{ review.name }}</div>
                  <div>{{ formatDate(review.date) }}</div>
                </div>
              </div>
              <div v-if="review.images.length" :class="['review-images', `review-images-${review.images.length}`, `review-image-rows-${reviews.some(r => r.images?.length === 3) ? 2 : 1}`]">
                <Image
                  v-for="(img, i) in review.images"
                  :key="i"
                  :popupable="componentId + '-' + index"
                  :src="'/assets/images/reviews/' + img"
                  alt="Review Image"
                  :delay="index * 300 + i * 150"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="service">There are currently no reviews for the {{ service }} service, but you can be the first!</div>
      <div v-else>There are currently no reviews, but you can be the first!</div>
      <a class="button mobile" :href="'https://search.google.com/local/reviews?placeid=' + $settings.placeId" target="_blank"><i class="icon">edit</i> Write a review</a>
    </div>
  </section>
</template>

<style scoped>
  .review-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .splide__track {
    overflow: visible;
  }

  .splide__list {
    align-items: flex-start;
  }

  .splide__slide {
    width: calc(100% / 3 - 24px * 2 / 3);
    background-color: var(--color-background-primary);
    padding: 24px;
    display: flex;
    gap: 16px;
    flex-direction: column;
  }

  .review-service {
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: -20px;
    font-size: 14px;
  }

  .review-content-container {
    font-weight: 600;
    white-space: pre-wrap;
    flex: 1;
    max-height: 166px;
    min-height: 166px;
    overflow: hidden;
    position: relative;
    transition: max-height .5s ease-in-out;
  }

  .review-content-container.expanded {
    max-height: var(--height);
  }

  @property --review-gradient-start {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: 102px;
  }

  @property --review-gradient-end {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: 135px;
  }


  .review-content-container.overflowing .review-content {
    transition: --review-gradient-start .5s ease-in-out, --review-gradient-end .5s ease-in-out;
    mask-image: linear-gradient(to bottom, black var(--review-gradient-start), transparent var(--review-gradient-end));
  }

  .review-content-container.expanded .review-content {
    --review-gradient-start: 100%;
    --review-gradient-end: 100%;
  }

  .review-content {
    margin-bottom: 12px;
  }

  .show-more {
    position: absolute;
    bottom: 0;
    display: flex;
    cursor: pointer;
    width: 100%;
  }

  .show-more:nth-last-child(2) {
    position: initial;
    visibility: hidden;
  }

  h3 {
    margin-bottom: -8px;

    &:first-child {
      margin-top: -4px;
    }
  }

  .review-user {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .review-user-details {
    display: flex;
    flex-direction: column;
    justify-content: center;

    :first-child {
      font-weight: 700;
      font-size: 24px;
    }

    :last-child {
      margin-top: -4px;
    }
  }

  .avatar {
    border-radius: 50%;
    width: 40px;
    object-fit: cover;
  }

  .avatar-fallback {
    width: 40px;
    height: 40px;
    color: #fff;
    background: #0008;
    font-size: 28px;
  }

  .review-images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 136px;
    gap: 12px;

    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }

  .review-images-1 {
    grid-template-columns: 1fr;
  }

  .review-image-rows-2.review-images-1,
  .review-image-rows-2.review-images-2 {
    grid-auto-rows: 284px;
  }

  .review-images-3 :last-child {
    grid-column: span 2;
  }

  @media (max-width: 1024px) {
    .splide__slide {
      width: calc(50% - 24px / 2);
    }
  }

  @media (max-width: 768px) {
    h3:first-child {
      margin-top: -2px;
    }

    .splide__slide {
      width: 100%;
      padding: 16px;
    }

    .avatar, .avatar-fallback {
      width: 36px;
      height: 36px;
      font-size: 24px;
    }

    .review-user {
      gap: 8px;
    }

    .review-user-details :first-child {
      font-size: 20px;
    }

    .button {
      width: 256px;
      align-self: center;
    }
  }
</style>