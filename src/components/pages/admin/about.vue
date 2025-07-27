<script setup>
  import { reactive, ref, watch, onMounted, onBeforeUnmount } from "vue"
  import { getJSON, updateFile, hashDataUrl, getExtension, prepareFileUpdate, prepareImageChanges, makeCommit } from "@/js/github.js"
  import CustomForm from "../../snippets/Form.vue"
  import RichTextEditor from "../../snippets/RichTextEditor.vue"

  const about = reactive({})
  const state = ref("loading")
  const hasUnsavedChanges = ref(false)
  let sha
  let lastSaved = ""
  let originalImage

  async function loadAbout() {
    const res = await getJSON("src/assets/json/about.json")
    Object.assign(about, res.data)
    sha = res.sha
    lastSaved = JSON.stringify(about)
    originalImage = about.image
    state.value = "ready"
  }

  function handleImageInput(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      about.image = reader.result
    }
    reader.readAsDataURL(file)
  }

  async function saveUpdates() {
    if (state.value === "saving") return
    if (!confirm("Are you sure you want to save the about changes?")) return
    state.value = "saving"

    if (about.image !== originalImage) {
      const newImages = new Map

      if (about.image.startsWith("data:")) {
        const hash = await hashDataUrl(about.image)
        const ext = getExtension(about.image)
        newImages.set(about.image, `${hash}${ext}`)
        about.image = `${hash}${ext}`
      }

      const tree = await prepareImageChanges("public/assets/images/about", newImages, [about.image])
      
      const fileUpdate = await prepareFileUpdate("src/assets/json/about.json", JSON.stringify(about, null, 2))
      sha = fileUpdate.sha
      tree.push(fileUpdate)

      await makeCommit(tree, "Update about")
    } else {
      sha = await updateFile("src/assets/json/about.json", JSON.stringify(about, null, 2), sha, "Update about")
    }

    lastSaved = JSON.stringify(about)
    originalImage = about.image
    updateUnsavedStatus()
    state.value = "ready"
    alert("Changes saved")
  }

  function updateUnsavedStatus() {
    hasUnsavedChanges.value = JSON.stringify(about) !== lastSaved
  }

  watch(about, updateUnsavedStatus, { deep: true })

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

  loadAbout()
</script>

<template>
  <div class="container">
    <div class="row">
      <div>
        <h1>Manage About</h1>
        <p>After saving, changes may take a couple minutes to appear.</p>
      </div>
      <button @click="saveUpdates" :disabled="!hasUnsavedChanges || state === 'saving'"><span class="icon">save</span>Save Updates</button>
    </div>

    <p v-if="state === 'loading'">Loading about...</p>
    <p v-else-if="state === 'saving'">Saving about... Do not close the page!</p>
    <template v-else>
      <CustomForm boxed action empty>
        <label>Intro <span>Always shown</span></label>
        <RichTextEditor v-model="about.intro" />
        <label>Extra <span>Only shown on the about page</span></label>
        <RichTextEditor v-model="about.extra" />
        <label>Image</label>
        <div class="upload-image">
          <img popupable="upload-image" :src="about.image.startsWith('data:') ? about.image : `https://raw.githubusercontent.com/ewanhowell5195/HairByEmmaHowell/master/public/assets/images/about/${about.image}`" />
          <div class="upload-image-footer">
            <span class="icon" data-tooltip="Replace Image">
              <span>upload</span>
              <input type="file" title="" accept="image/webp,image/jpeg,image/png" @change="handleImageInput" />
            </span>
          </div>
        </div>
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