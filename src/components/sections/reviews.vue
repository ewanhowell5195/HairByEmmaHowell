<script setup>
  import { ref, onMounted, getCurrentInstance, nextTick } from "vue"
  import "@splidejs/splide/dist/css/splide.min.css"
  import Splide from "@splidejs/splide"
  import Papa from "papaparse"

  // Store parsed reviews
  const { $reviews } = getCurrentInstance().appContext.config.globalProperties

  const reviews = ref($reviews.data)

  async function fetchReviews() {
    if ($reviews.data) {
      return
    }
    try {
      const csv = await fetch($settings.reviews).then(res => res.text())
      $reviews.data = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true
      }).data
      reviews.value = $reviews.data
    } catch (error) {
      console.error("Error fetching reviews:", error)
    }
  }

  onMounted(async () => {
    await fetchReviews()
    nextTick(() => {
      new Splide(".splide", {
        gap: "32px",
        autoWidth: true,
        arrows: false
      }).mount()
    })
  })
</script>

<template>
  <section class="container">
    <h1>Customer Reviews</h1>
    <div class="splide">
      <div class="splide__track">
        <ul class="splide__list">
          <li v-for="review in reviews" class="splide__slide">
            <div class="review-heading">{{ review.Heading }}</div>
            <div class="review-content">{{ review.Review }}</div>
            <p>{{ review.Name }} - {{ review.Date }}</p>
            <img v-if="review.Avatar" :src="'drive.usercontent.google.com/download?export=view&id=' + review.Avatar.split('/')[5]" alt="Avatar" class="avatar">
            <i v-else class="avatar-fallback icon">person</i>
            <div class="review-images">
              <img v-if="review['Image 1']" :src="'drive.usercontent.google.com/download?export=view&id=' + review['Image 1'].split('/')[5]" alt="Review Image">
              <img v-if="review['Image 2']" :src="'drive.usercontent.google.com/download?export=view&id=' + review['Image 2'].split('/')[5]" alt="Review Image">
              <img v-if="review['Image 3']" :src="'drive.usercontent.google.com/download?export=view&id=' + review['Image 3'].split('/')[5]" alt="Review Image">
              <img v-if="review['Image 4']" :src="'drive.usercontent.google.com/download?export=view&id=' + review['Image 4'].split('/')[5]" alt="Review Image">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .splide__slide {
    width: calc(33% - 32px * 2 / 3);
    border-radius: 16px;
    background-color: #fff;
    padding: 16px 24px;
    display: flex;
    gap: 8px;
    flex-direction: column;
  }

  .review-heading {
    font-weight: 700;
    font-size: 24px;
  }
</style>