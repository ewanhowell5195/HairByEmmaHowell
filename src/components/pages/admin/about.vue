<script setup>
  import RichTextEditor from "@c/snippets/RichTextEditor.vue"
  import EditPage from "@c/sections/admin/EditPage.vue"
  import Image from "@c/snippets/admin/Image.vue"
  import CustomForm from "@c/snippets/Form.vue"
  import { processImage } from "@/js/admin.js"

  function save(data) {
    return processImage(data, "image", "public/assets/images/about")
  }
</script>

<template>
  <EditPage path="src/assets/json/about.json" label="About" :save="save">
    <template #default="{ data }">
      <CustomForm boxed action empty>
        <label>Intro <span>Always shown</span></label>
        <RichTextEditor v-model="data.intro" />
        <label>Extra <span>Only shown on the about page</span></label>
        <RichTextEditor v-model="data.extra" />
        <Image v-model="data.image" dir="about" />
      </CustomForm>
    </template>
  </EditPage>
</template>