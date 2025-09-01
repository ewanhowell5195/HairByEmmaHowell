<script setup>
  import EditPage from "@c/sections/admin/EditPage.vue"
  import Image from "@c/snippets/admin/Image.vue"
  import CustomForm from "@c/snippets/Form.vue"
  import { processImages, processImage } from "@/js/admin.js"

  async function save(data) {
    return await processImages(data, ["banner", "banner_mobile"], "public/assets/images/home")
  }
</script>

<template>
  <EditPage path="src/assets/json/home.json" label="Home" :save="save">
    <template #default="{ data }">
      <CustomForm boxed action empty>
        <Image title="Banner Image" v-model="data.banner" dir="home" />
        <Image title="Mobile Banner Image" v-model="data.banner_mobile" dir="home" />
      </CustomForm>
    </template>
  </EditPage>
</template>