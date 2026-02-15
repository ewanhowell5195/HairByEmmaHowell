<script setup>
  import { processImages, processImageLists } from "@/js/admin.js"
  import RichTextEditor from "@c/snippets/RichTextEditor.vue"
  import ImageList from "@c/snippets/admin/ImageList.vue"
  import EditPage from "@c/sections/admin/EditPage.vue"
  import Image from "@c/snippets/admin/Image.vue"
  import CustomForm from "@c/snippets/Form.vue"

  let imageSet

  function load(data) {
    imageSet = new Set(data.gallery_carousel)
  }

  async function save(data) {
    const tree = await processImages(data, ["banner", "banner_mobile", "fixed_background_image"], "public/assets/images/home") ?? []
    const tree2 = await processImageLists([data.gallery_carousel], imageSet, "public/assets/images/home/gallery_carousel") ?? []
    return tree.concat(tree2)
  }
</script>

<template>
  <EditPage path="src/assets/json/home.json" label="Home" :load="load" :save="save">
    <template #default="{ data }">
      <h1>Banner</h1>
      <CustomForm boxed action empty>
        <Image title="Banner Image" v-model="data.banner" dir="home" />
        <Image title="Mobile Banner Image" v-model="data.banner_mobile" dir="home" />
      </CustomForm>
      <h1>Gallery Carousel</h1>
      <CustomForm boxed action empty>
        <ImageList :images="data.gallery_carousel" dir="home/gallery_carousel" title="Gallery Carousel Images" />
      </CustomForm>
      <h1>Fixed Background</h1>
      <CustomForm boxed action empty>
        <RichTextEditor v-model="data.fixed_background_content" />
        <Image title="Fixed Background Image" v-model="data.fixed_background_image" dir="home" />
      </CustomForm>
    </template>
  </EditPage>
</template>