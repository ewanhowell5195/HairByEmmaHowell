<script setup>
  import RichTextEditor from "@c/snippets/RichTextEditor.vue"
  import ImageList from "@c/snippets/admin/ImageList.vue"
  import ItemList from "@c/snippets/admin/ItemList.vue"
  import EditPage from "@c/sections/admin/EditPage.vue"
  import { processImageLists } from "@/js/admin.js"
  import CustomForm from "@c/snippets/Form.vue"

  let imageSet

  function load(data) {
    imageSet = new Set([data.images, data.gallery].flat())
  }

  async function save(data) {
    const imageLists = [data.images, data.gallery]
    const tree = await processImageLists(imageLists, imageSet, "public/assets/images/services/bridal_hair")
    return tree
  }
</script>

<template>
  <EditPage path="src/assets/json/services/bridal_hair.json" label="Bridal Hair" :load="load" :save="save">
    <template #default="{ data }">
      <CustomForm boxed action empty>
        <label>Description</label>
        <RichTextEditor v-model="data.description" />
        <ImageList :images="data.images" dir="services/bridal_hair" title="Main Images" />
        <ImageList :images="data.gallery" dir="services/bridal_hair" title="Gallery Images" />
      </CustomForm>
      <h1>Price Lists</h1>
      <ItemList :items="data.price_list" :create="() => ({ title: 'New Section', values: [{ name: 'Name', price: '', description: '' }] })" type="Price Section">
        <template #default="{ item: section, index: sectionIndex }">
          <label :for="`section_title_${sectionIndex}`">Price List Title</label>
          <input :id="`section_title_${sectionIndex}`" type="text" v-model="section.title" placeholder="Title" />
          <ItemList :items="section.values" :create="() => ({ name: 'Name', price: '', description: '' })" type="Price Item">
            <template #default="{ item, index }">
              <div class="form-row">
                <div class="form-col">
                  <label :for="`name_${sectionIndex}_${index}`">Name</label>
                  <input :id="`name_${sectionIndex}_${index}`" type="text" v-model="item.name" placeholder="Service name" />
                </div>
                <div class="form-col">
                  <label :for="`price_${sectionIndex}_${index}`">Price</label>
                  <input :id="`price_${sectionIndex}_${index}`" type="text" v-model="item.price" placeholder="£40" />
                </div>
              </div>
              <label :for="`desc_${sectionIndex}_${index}`">Description</label>
              <textarea :id="`desc_${sectionIndex}_${index}`" v-model="item.description" rows="2" placeholder="Extra details" />
            </template>
          </ItemList>
        </template>
      </ItemList>
    </template>
  </EditPage>
</template>
