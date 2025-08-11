<script setup>
  import ImageList from "@c/snippets/admin/ImageList.vue"
  import EditPage from "@c/sections/admin/EditPage.vue"
  import ItemList from "@c/snippets/admin/ItemList.vue"
  import { processImageLists } from "@/js/admin.js"

  let imageSet

  async function load(data) {
    imageSet = new Set(data.flatMap(r => r.images))
  }

  async function save(data) {
    const imageLists = data.map(r => r.images)
    const tree = await processImageLists(imageLists, imageSet, "public/assets/images/reviews")
    return tree
  }

  function createReview() {
    const now = new Date()
    return {
      service: "hairdressing",
      heading: "New Review",
      review: "This is a new review.",
      name: "Name",
      date: `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`,
      images: []
    }
  }
</script>

<template>
  <EditPage path="src/assets/json/reviews.json" label="Reviews" :load="load" :save="save">
    <template #default="{ data }">
      <ItemList :items="data" :create="createReview" type="Review">
        <template #default="{ item, index }">
          <div class="form-row">
            <div class="form-col">
              <label for="heading">Heading</label>
              <input :id="'heading_' + index" type="text" v-model="item.heading" placeholder="Review heading" />
            </div>
            <div class="form-col">
              <label for="service">Service</label>
              <select :id="'service_' + index" v-model="item.service">
                <option value="hairdressing">Hairdressing</option>
                <option value="bridal_hair">Bridal Hair</option>
              </select>
            </div>
          </div>

          <label for="review">Review</label>
          <textarea :id="'review_' + index" v-model="item.review" placeholder="Full review text" rows="5"></textarea>

          <div class="form-row">
            <div class="form-col">
              <label for="name">Name</label>
              <input :id="'name_' + index" type="text" v-model="item.name" placeholder="Customer name" />
            </div>
            <div class="form-col">
              <label for="date">Date</label>
              <input :id="'date_' + index" name="date" type="text" v-model="item.date" placeholder="Select a date…" />
            </div>
          </div>

          <ImageList :images="item.images" dir="reviews" :max="4" />
        </template>
      </ItemList>
    </template>
  </EditPage>
</template>