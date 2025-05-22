<script setup>
  import "@splidejs/splide/dist/css/splide.min.css"
  import reviews from "@/assets/json/reviews.json"
  import Splide from "@splidejs/splide"
  import { onMounted, ref } from "vue"

  const componentId = Math.random()
  const splide = ref(null)

  function formatDate(str) {
    let date
    if (/^\d{2}\/\d{2}\/\d{2,4}$/.test(str)) {
      date = new Date(str.split("/").reverse().join("-"))
    } else {
      date = new Date(str)
    }
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  onMounted(() => {
    new Splide(splide.value, {
      gap: "24px",
      autoWidth: true,
      arrows: false
    }).mount()
  })
</script>

<template>
  <section class="container">
    <div class="review-row">
      <h1>Customer Reviews</h1>
      <a class="button desktop" :href="'https://search.google.com/local/reviews?placeid=' + $settings.placeId" target="_blank"><i class="icon">edit</i> Write a review</a>
    </div>
    <div ref="splide" class="splide pagination-below">
      <div class="splide__track">
        <ul class="splide__list">
          <li v-for="(review, index) in reviews" :key="index" class="splide__slide">
            <h2>{{ review.heading }}</h2>
            <p class="review-content">{{ review.review }}</p>
            <div class="review-user">
              <img v-if="review.avatar" :src="'/assets/images/reviews/' + review.avatar" alt="Avatar" class="avatar" with="56" height="56">
              <i v-else class="avatar-fallback icon">person</i>
              <div class="review-user-details">
                <div>{{ review.name }}</div>
                <div>{{ formatDate(review.date) }}</div>
              </div>
            </div>
            <div :class="['review-images', `review-images-${['image1', 'image2', 'image3', 'image4'].filter(key => review[key]).length}`, `review-image-rows-${reviews.some(r => ['image1', 'image2', 'image3', 'image4'].filter(key => r[key]).length === 3) ? 2 : 1}`]">
              <img v-if="review.image1" :popupable="componentId + '-' + index" :src="'/assets/images/reviews/' + review.image1" alt="Review Image">
              <img v-if="review.image2" :popupable="componentId + '-' + index" :src="'/assets/images/reviews/' + review.image2" alt="Review Image">
              <img v-if="review.image3" :popupable="componentId + '-' + index" :src="'/assets/images/reviews/' + review.image3" alt="Review Image">
              <img v-if="review.image4" :popupable="componentId + '-' + index" :src="'/assets/images/reviews/' + review.image4" alt="Review Image">
            </div>
          </li>
        </ul>
      </div>
    </div>
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
    padding: 16px 24px 24px;
    display: flex;
    gap: 16px;
    flex-direction: column;
  }

  .review-content {
    font-weight: 600;
    white-space: pre-wrap;
    flex: 1;
  }

  h2 {
    margin-bottom: -8px;
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
    .splide__slide {
      width: 100%;
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