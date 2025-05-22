<script setup>
  import MarkdownIt from "markdown-it"
  import { ref } from "vue"

  const props = defineProps({
    content: {
      type: String,
      required: true
    }
  })

  const rendered = ref("")
  const md = new MarkdownIt()
  rendered.value = md.render(props.content)
</script>

<template>
  <div class="markdown" v-html="rendered"></div>
</template>

<style scoped>
  :deep(p) {
    margin: 24px 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
</style>