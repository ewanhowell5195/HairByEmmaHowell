<script setup>
  import reviewsList from "@/assets/json/reviews.json"
  import "@splidejs/splide/dist/css/splide.min.css"
  import Splide from "@splidejs/splide"
  import { onMounted, ref } from "vue"

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

  function formatDate(str) {
    const date = new Date(str.split("/").reverse().join("-"))
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  onMounted(() => {
    if (splide.value) {
      new Splide(splide.value, {
        gap: "24px",
        autoWidth: true,
        arrows: false
      }).mount()
    }
  })
</script>

<template>
  <section class="container">
    <div class="review-row">
      <h1>Customer Reviews</h1>
      <a class="button desktop" :href="'https://search.google.com/local/reviews?placeid=' + $settings.placeId" target="_blank"><i class="icon">edit</i> Write a review</a>
    </div>
    <div v-if="reviews.length" ref="splide" class="splide pagination-below">
      <div class="splide__track">
        <ul class="splide__list">
          <li v-for="(review, index) in reviews" :key="index" class="splide__slide">
            <div v-if="!service" class="review-service">{{ review.service.replaceAll("_", " ") }}</div>
            <h2>{{ review.heading }}</h2>
            <p class="review-content">{{ review.review }}</p>
            <div class="review-user">
              <img v-if="review.image1" :src="'/assets/images/reviews/' + review.image1" alt="Avatar" class="avatar" with="56" height="56">
              <i v-else class="avatar-fallback icon">person</i>
              <div class="review-user-details">
                <div>{{ review.name }}</div>
                <div>{{ formatDate(review.date) }}</div>
              </div>
            </div>
            <div v-if="review.images.length" :class="['review-images', `review-images-${review.images.length}`, `review-image-rows-${reviews.some(r => r.images?.length === 3) ? 2 : 1}`]">
              <img v-for="(img, i) in review.images" :key="i" :popupable="componentId + '-' + index" :src="'/assets/images/reviews/' + img" alt="Review Image">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else-if="service">There are currently no reviews for the {{ service }} service, but you can be the first!</div>
    <div v-else>There are currently no reviews, but you can be the first!</div>
    <a class="button mobile" :href="'https://search.google.com/local/reviews?placeid=' + $settings.placeId" target="_blank"><i class="icon">edit</i> Write a review</a>
  </section>
</template>

<style scoped>
  .review-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
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

  .review-content {
    font-weight: 600;
    white-space: pre-wrap;
    flex: 1;
  }

  h2 {
    margin-bottom: -8px;

    &:first-child {
      margin-top: -4px;
    }
  }

  .review-user {
    display: flex;
    gap: 12px;
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
    width: 56px;
    object-fit: cover;
  }

  .avatar-fallback {
    width: 56px;
    height: 56px;
    color: #fff;
    background: #000;
    font-size: 40px;
  }

  .review-images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 128px;
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
    grid-auto-rows: 268px;
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
    h2:first-child {
      margin-top: -2px;
    }

    .splide__slide {
      width: 100%;
      padding: 16px;
    }

    .avatar, .avatar-fallback {
      width: 48px;
      height: 48px;
      font-size: 32px;
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