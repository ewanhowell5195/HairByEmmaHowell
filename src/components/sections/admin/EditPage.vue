<script setup>
  import { ref, watch, onMounted, onBeforeUnmount } from "vue"
  import { getJSON, updateFile, prepareFileUpdate, makeCommit } from "@/js/github.js"

  const props = defineProps({
    path: {
      type: String,
      required: true
    },
    load: {
      type: Function
    },
    save: {
      type: Function,
      required: true
    },
    label: {
      type: String,
      default: "Page"
    }
  })

  const state = ref("loading")
  const data = ref(null)
  const hasUnsavedChanges = ref(false)

  let sha
  let lastSaved = ""

  async function load() {
    state.value = "loading"
    const res = await getJSON(props.path)
    data.value = res.data
    sha = res.sha
    lastSaved = JSON.stringify(data.value)

    if (props.load) {
      await props.load(res.data)
    }

    state.value = "ready"
  }

  async function saveChanges() {
    if (state.value === "saving") return
    if (!confirm(`Are you sure you want to save ${props.label.toLowerCase()} changes?`)) return
    state.value = "saving"

    let tree = null
    if (props.save) {
      tree = await props.save(data.value)
    }

    if (tree && tree.length) {
      const fileUpdate = await prepareFileUpdate(props.path, JSON.stringify(data.value, null, 2))
      sha = fileUpdate.sha
      tree.push(fileUpdate)
      await makeCommit(tree, `Update ${props.label.toLowerCase()}`)
    } else {
      sha = await updateFile(props.path, JSON.stringify(data.value, null, 2), sha, `Update ${props.label.toLowerCase()}`)
    }

    lastSaved = JSON.stringify(data.value)
    updateUnsavedStatus()
    state.value = "ready"
    alert("Changes saved")
  }

  function updateUnsavedStatus() {
    hasUnsavedChanges.value = JSON.stringify(data.value) !== lastSaved
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
    load()
  })

  onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", handleBeforeUnload)
  })
</script>

<template>
  <div class="container">
    <div class="row">
      <div>
        <h1>Manage {{ label }}</h1>
        <p>After saving, changes may take a couple minutes to appear.</p>
      </div>
      <button @click="saveChanges" :disabled="!hasUnsavedChanges || state === 'saving'">
        <span class="icon">save</span>Save Updates
      </button>
    </div>

    <p v-if="state === 'loading'">Loading {{ label.toLowerCase() }}...</p>
    <p v-else-if="state === 'saving'">Saving {{ label.toLowerCase() }}... Do not close the page!</p>
    <template v-else>
      <slot :data="data" />
    </template>
  </div>
</template>

<style scoped>
  .row {
    justify-content: space-between;
    align-items: flex-end;
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
