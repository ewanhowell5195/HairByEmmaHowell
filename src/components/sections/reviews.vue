<script setup>
  import { onMounted, ref } from "vue"
  import "@splidejs/splide/dist/css/splide.min.css"
  import reviews from "@/assets/json/reviews.json"
  import Splide from "@splidejs/splide"

  const componentId = Math.random()
  const splide = ref(null)

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
    <h1>Customer Reviews</h1>
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
                <div>{{ review.subtext }}</div>
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
  </section>
</template>

<style scoped>
  .splide__slide {
    width: calc(33% - 24px * 2 / 3);
    border-radius: 16px;
    background-color: #fff;
    padding: 16px 24px 24px;
    display: flex;
    gap: 16px;
    flex-direction: column;
  }

  .review-content {
    font-weight: 600;
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
    background: var(--color-accent);
    font-size: 40px;
  }

  .review-images {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 128px;
    gap: 12px;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 12px;
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
</style>