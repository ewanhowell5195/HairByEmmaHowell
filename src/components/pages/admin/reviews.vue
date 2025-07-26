<script setup>
  import { reactive, ref, watch, onMounted, onBeforeUnmount } from "vue"
  import { getJSON, updateFile, hashDataUrl, getExtension, prepareFileUpdate, prepareImageChanges, makeCommit } from "@/js/github.js"
  import CustomForm from "../../snippets/Form.vue"

  const reviews = reactive([])
  const state = ref("loading")
  const hasUnsavedChanges = ref(false)
  let sha
  let lastSaved = ""
  let originalImageSet = new Set()

  async function loadReviews() {
    const res = await getJSON("src/assets/json/reviews.json")
    reviews.push(...res.data)
    sha = res.sha
    lastSaved = JSON.stringify(reviews)
    originalImageSet = new Set(reviews.flatMap(r => r.images ?? []))
    state.value = "ready"
  }

  function addReview() {
    const now = new Date()
    const formatted = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getFullYear())}`
    reviews.push({
      service: "hairdressing",
      heading: "New Review",
      review: "This is a new review.",
      name: "Name",
      date: formatted
    })
  }

  function movePrev(index) {
    if (index <= 0) return
    const item = reviews.splice(index, 1)[0]
    reviews.splice(index - 1, 0, item)
  }

  function moveNext(index) {
    if (index >= reviews.length - 1) return
    const item = reviews.splice(index, 1)[0]
    reviews.splice(index + 1, 0, item)
  }

  function deleteReview(index) {
    if (confirm(`Are you sure you want to delete the review "${reviews[index].heading}" by "${reviews[index].name}"?`)) {
      reviews.splice(index, 1)
    }
  }

  function moveImagePrev(reviewIndex, imageIndex) {
    if (imageIndex <= 0) return
    const images = reviews[reviewIndex].images
    const temp = images[imageIndex - 1]
    images[imageIndex - 1] = images[imageIndex]
    images[imageIndex] = temp
  }

  function moveImageNext(reviewIndex, imageIndex) {
    const images = reviews[reviewIndex].images
    if (imageIndex >= images.length - 1) return
    const temp = images[imageIndex + 1]
    images[imageIndex + 1] = images[imageIndex]
    images[imageIndex] = temp
  }

  function handleImageInput(e, review) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (!review.images) review.images = []
      review.images.push(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function deleteImage(reviewIndex, imageIndex) {
    if (confirm(`Are you sure you want to delete image "${imageIndex + 1}" from the review "${reviews[reviewIndex].heading}" by "${reviews[reviewIndex].name}"?`)) {
      reviews[reviewIndex].images.splice(imageIndex, 1)
      if (!reviews[reviewIndex].images.length) {
        delete reviews[reviewIndex].images
      }
    }
  }

  async function saveReviews() {
    if (state.value === "saving") return
    if (!confirm("Are you sure you want to save the review changes?")) return
    state.value = "saving"

    let imageNames = reviews.flatMap(r => r.images ?? [])

    if (imageNames.length !== originalImageSet.size || imageNames.some(name => !originalImageSet.has(name))) {
      let newImages = new Map

      for (const review of reviews) {
        if (review.images) {
          for (const [i, image] of review.images.entries()) {
            if (image.startsWith("data:")) {
              if (!newImages.has(image)) {
                const hash = await hashDataUrl(image)
                const ext = getExtension(image)
                newImages.set(image, `${hash}${ext}`)
              }
              review.images[i] = newImages.get(image)
            }
          }
        }
      }

      imageNames = reviews.flatMap(r => r.images ?? [])

      const tree = await prepareImageChanges("public/assets/images/reviews", newImages, imageNames)
      
      const fileUpdate = await prepareFileUpdate("src/assets/json/reviews.json", JSON.stringify(reviews, null, 2))
      sha = fileUpdate.sha
      tree.push(fileUpdate)

      await makeCommit(tree, "Update reviews")
    } else {
      sha = await updateFile("src/assets/json/reviews.json", JSON.stringify(reviews, null, 2), sha, "Update reviews")
    }

    lastSaved = JSON.stringify(reviews)
    originalImageSet = new Set(imageNames)
    updateUnsavedStatus()
    state.value = "ready"
    alert("Changes saved")
  }

  function updateUnsavedStatus() {
    hasUnsavedChanges.value = JSON.stringify(reviews) !== lastSaved
  }

  watch(reviews, updateUnsavedStatus, { deep: true })

  function handleBeforeUnload(e) {
    if (hasUnsavedChanges.value) {
      e.preventDefault()
      e.returnValue = ""
    }
  }

  onMounted(() => {
    window.addEventListener("beforeunload", handleBeforeUnload)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", handleBeforeUnload)
  })

  loadReviews()
</script>

<template>
  <div class="container">
    <div class="row">
      <div>
        <h1>Manage Reviews</h1>
        <p>After saving, changes may take a couple minutes to appear.</p>
      </div>
      <button @click="saveReviews" :disabled="!hasUnsavedChanges || state === 'saving'"><span class="icon">save</span>Save Reviews</button>
    </div>

    <div id="reviews">
      <p v-if="state === 'loading'">Loading reviews...</p>
      <p v-else-if="state === 'saving'">Saving reviews... Do not close the page!</p>
      <template v-else>
        <CustomForm v-for="(review, index) in reviews" :key="index" class="review" boxed action empty>
          <div class="form-row">
            <div class="form-col">
              <div class="form-row">
                <div class="form-col">
                  <label for="heading">Heading</label>
                  <input id="heading" type="text" v-model="review.heading" placeholder="Review heading" required />
                </div>
                <div class="form-col">
                  <label for="service">Service</label>
                  <select id="service" v-model="review.service" required>
                    <option value="hairdressing">Hairdressing</option>
                    <option value="bridalhair">Bridal Hair</option>
                  </select>
                </div>
              </div>

              <label for="review">Review</label>
              <textarea id="review" v-model="review.review" placeholder="Full review text" required rows="5"></textarea>

              <div class="form-row">
                <div class="form-col">
                  <label for="name">Name</label>
                  <input id="name" type="text" v-model="review.name" placeholder="Customer name" required />
                </div>
                <div class="form-col">
                  <label for="date">Date</label>
                  <input id="date" name="date" type="text" v-model="review.date" placeholder="Select a date…" required />
                </div>
              </div>

              <label>Images</label>
              <div class="review-images">
                <div v-for="i in [0, 1, 2, 3]" :key="i" :class="['review-image', { last: review.images?.[i] && i === review.images.findLastIndex(img => !!img), input: !review.images?.[i] && i > (review.images?.findLastIndex(img => !!img) ?? -1) }]">
                  <template v-if="review.images?.[i]">
                    <img :popupable="`review-${index}`" :src="review.images[i]?.startsWith('data:') ? review.images[i] : `https://raw.githubusercontent.com/ewanhowell5195/HairByEmmaHowell/master/public/assets/images/reviews/${review.images[i]}`" alt="Review Image" />
                    <div class="review-image-footer">
                      <span class="icon" @click="moveImagePrev(index, i)">keyboard_arrow_left</span>
                      <span class="icon" @click="deleteImage(index, i)">delete</span>
                      <span class="icon" @click="moveImageNext(index, i)">keyboard_arrow_right</span>
                    </div>
                  </template>
                  <template v-else>
                    <input type="file" accept="image/webp,image/jpeg,image/png" @change="e => handleImageInput(e, review)" />
                    <div class="icon new-review-image">add</div>
                  </template>
                </div>
              </div>
            </div>
            <div class="review-controls">
              <button type="button" class="icon" @click="movePrev(index)">keyboard_arrow_up</button>
              <button type="button" class="icon" @click="deleteReview(index)">delete</button>
              <button type="button" class="icon" @click="moveNext(index)">keyboard_arrow_down</button>
              <div class="spacer"></div>
            </div>
          </div>
        </CustomForm>

        <button @click="addReview"><span class="icon">add</span>Add Review</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
  .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  #reviews {
    padding: 16px;
    border: 2px solid var(--color-primary);
  }

  .review-controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;

    .icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      border-radius: 0;
      padding: 0;
      color: #000 !important;
      background-color: #fff;

      &:nth-child(2) {
        font-size: 24px;
      }
    }

    .spacer {
      display: none;
    }

    @media (max-width: 768px) {
      flex-direction: row;
      justify-content: flex-start;

      :nth-child(2) {
        order: 1;
      }

      .spacer {
        display: initial;
      }
    }
  }

  .review:first-child .review-controls :first-child,
  .review:nth-last-child(2) .review-controls :last-child {
    pointer-events: none;
    opacity: .35;
  }

  .review-images {
    display: flex;
    gap: 16px;
    user-select: none;
    max-width: 100%;
    flex-wrap: wrap;
  }

  .review-image {
    flex: 1 1 0px;
    aspect-ratio: 1 / 1;
    position: relative;
    transition: box-shadow .15s ease;

    &.input:first-child {
      max-height: 64px;

      .icon {
        font-size: 48px;
      }

      ~ .review-image {
        max-height: 64px;

        .icon {
          font-size: 48px;
        }
      }
    }

    @media (max-width: 768px) {
      min-width: calc(50% - 8px);
      max-width: calc(50% - 8px);

      &.input:nth-child(2) ~ .review-image {
        display: none;
      }

      &.input:nth-child(3) {
        max-height: 64px;

        .icon {
          font-size: 48px;
        }

        ~ .review-image {
          max-height: 64px;

          .icon {
            font-size: 48px;
          }
        }
      }
    }

    & img, input {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      cursor: pointer;
    }
  }

  .review-image-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #0004;
    display: flex;
    justify-content: space-between;

    .icon {
      color: #fff;
      font-size: 32px;
      width: 32px;
      height: 32px;
      cursor: pointer;

      &:nth-child(2) {
        font-size: 24px;
      }
    }
  }

  .review-image:first-child .review-image-footer .icon:first-child,
  .review-image.last .review-image-footer .icon:last-child {
    pointer-events: none;
    opacity: .35;
  }

  .review-image.input:hover {
    box-shadow: var(--box-shadow);
  }

  .new-review-image {
    position: absolute;
    inset: 0;
    background-color: #fff;
    border-radius: 0;
    pointer-events: none;
    font-size: 64px;
  }

  @media (max-width: 768px) {
    .review > .form-row {
      flex-direction: column-reverse;
    }
  }
</style>