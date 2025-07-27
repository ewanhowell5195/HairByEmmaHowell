<script setup>
  import { reactive, ref, watch, onMounted, onBeforeUnmount } from "vue"
  import { getJSON, updateFile, hashDataUrl, getExtension, prepareFileUpdate, prepareImageChanges, makeCommit } from "@/js/github.js"
  import CustomForm from "../../../snippets/Form.vue"
  import RichTextEditor from "../../../snippets/RichTextEditor.vue"

  const data = reactive({})
  const state = ref("loading")
  const hasUnsavedChanges = ref(false)
  let sha
  let lastSaved = ""
  let originalImage

  async function loadData() {
    const res = await getJSON("src/assets/json/services/hairdressing.json")
    Object.assign(data, res.data)
    sha = res.sha
    lastSaved = JSON.stringify(data)
    originalImage = data.image
    state.value = "ready"
  }

  function handleImageInput(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      data.image = reader.result
    }
    reader.readAsDataURL(file)
  }

  async function saveUpdates() {
    if (state.value === "saving") return
    if (!confirm("Are you sure you want to save the hairdressing changes?")) return
    state.value = "saving"

    if (data.image !== originalImage) {
      // const newImages = new Map

      // if (data.image.startsWith("data:")) {
      //   const hash = await hashDataUrl(data.image)
      //   const ext = getExtension(data.image)
      //   newImages.set(data.image, `${hash}${ext}`)
      //   data.image = `${hash}${ext}`
      // }

      // const tree = await prepareImageChanges("public/assets/images/about", newImages, [data.image])
      
      // const fileUpdate = await prepareFileUpdate("src/assets/json/services/hairdressing.json", JSON.stringify(about, null, 2))
      // sha = fileUpdate.sha
      // tree.push(fileUpdate)

      // await makeCommit(tree, "Update hairdressing")
    } else {
      sha = await updateFile("src/assets/json/services/hairdressing.json", JSON.stringify(data, null, 2), sha, "Update hairdressing")
    }

    lastSaved = JSON.stringify(data)
    originalImage = data.image
    updateUnsavedStatus()
    state.value = "ready"
    alert("Changes saved")
  }

  function updateUnsavedStatus() {
    hasUnsavedChanges.value = JSON.stringify(data) !== lastSaved
  }

  watch(data, updateUnsavedStatus, { deep: true })

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

  loadData()
</script>

<template>
  <div class="container">
    <div class="row">
      <div>
        <h1>Manage Hairdressing</h1>
        <p>After saving, changes may take a couple minutes to appear.</p>
      </div>
      <button @click="saveUpdates" :disabled="!hasUnsavedChanges || state === 'saving'"><span class="icon">save</span>Save Updates</button>
    </div>

    <p v-if="state === 'loading'">Loading data...</p>
    <p v-else-if="state === 'saving'">Saving data... Do not close the page!</p>
    <template v-else>
      <CustomForm boxed action empty>
        <label>Description</label>
        <RichTextEditor v-model="data.description" />
      </CustomForm>
    </template>
  </div>
</template>

<style scoped>
  .row {
    justify-content: space-between;
    align-items: flex-end;
  }

  .upload-image {
    flex: 1 1 0px;
    aspect-ratio: 1 / 1;
    position: relative;
    transition: box-shadow .15s ease;
    max-width: 256px;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      cursor: pointer;
    }
  }

  .upload-image-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #0004;
    display: flex;
    justify-content: center;

    .icon {
      color: #fff;
      font-size: 32px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      position: relative;
      overflow: hidden !important;
      border-radius: 0;

      &:nth-child(2) {
        font-size: 24px;
      }

      & input {
        position: absolute;
        inset: 0;
        width: 100%;
        max-height: 32px;
        opacity: 0;
      }
    }
  }

  @media (max-width: 768px) {
    .row {
      flex-direction: column;
      align-items: flex-start;

      & button {
        align-self: flex-end;
      }
    }
  }
</style>