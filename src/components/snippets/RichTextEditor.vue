<script setup>
  import { ref, watch, onMounted, onBeforeUnmount, watchEffect } from "vue"
  import { Editor, EditorContent } from "@tiptap/vue-3"
  import StarterKit from "@tiptap/starter-kit"

  const modelValue = defineModel("modelValue", { type: String })

  const editor = ref(null)

  watch(modelValue, value => {
    if (editor.value && editor.value.getHTML() !== value) {
      editor.value.commands.setContent(value)
    }
  })

  onMounted(() => {
    editor.value = new Editor({
      extensions: [StarterKit],
      content: modelValue.value,
      onUpdate: ({ editor }) => {
        modelValue.value = editor.getHTML().replace(/(?:<p><\/p>)+$/, "")
      }
    })
  })

  onBeforeUnmount(() => {
    editor.value?.destroy()
  })

  function setHeading(value) {
    if (!editor.value) return
    const chain = editor.value.chain().focus()
    value === "paragraph" ? chain.setParagraph().run() : chain.toggleHeading({ level: parseInt(value) }).run()
  }

  function run(cmd) {
    if (!editor.value) return
    editor.value.chain().focus()[cmd]().run()
  }

  function active(name) {
    return editor.value?.isActive(name)
  }

  const headingLevel = ref("paragraph")

  watchEffect(() => {
    if (!editor.value) return
    if (editor.value.isActive("heading", { level: 1 })) headingLevel.value = "1"
    else if (editor.value.isActive("heading", { level: 2 })) headingLevel.value = "2"
    else if (editor.value.isActive("heading", { level: 3 })) headingLevel.value = "3"
    else headingLevel.value = "paragraph"
  })
</script>

<template>
  <div class="editor" tabindex="0">
    <div class="toolbar">
      <select data-tooltip="Text Size" v-model="headingLevel" @change="setHeading($event.target.value)">
        <option value="paragraph">Paragraph</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>
      <div data-tooltip="Bold" class="icon" @click="run('toggleBold')" :class="{ active: active('bold') }">format_bold</div>
      <div data-tooltip="Italic" class="icon" @click="run('toggleItalic')" :class="{ active: active('italic') }">format_italic</div>
      <div data-tooltip="Bullet List" class="icon" @click="run('toggleBulletList')" :class="{ active: active('bulletList') }">format_list_bulleted</div>
      <div data-tooltip="Ordered List" class="icon" @click="run('toggleOrderedList')" :class="{ active: active('orderedList') }">format_list_numbered</div>
      <div data-tooltip="Blockquote" class="icon" @click="run('toggleBlockquote')" :class="{ active: active('blockquote') }">format_quote</div>
      <div data-tooltip="Undo" class="icon" @click="run('undo')">undo</div>
      <div data-tooltip="Redo" class="icon" @click="run('redo')">redo</div>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<style scoped>
  .editor {
    outline: 2px solid transparent;
    transition: outline .15s;
    background-color: var(--color-background);

    &:focus-within {
      outline: 2px solid var(--color-primary);
    }
  }

  .toolbar {
    display: flex;
    border-bottom: 2px solid var(--color-primary);
    padding: 6px 16px;
    gap: 8px;
    user-select: none;
    align-items: center;
    flex-wrap: wrap;
  }

  .icon {
    cursor: pointer;
    font-size: 24px;
    border-bottom: 2px solid transparent;
  }

  :deep([contenteditable="true"]) {
    padding: 12px 16px;
    outline: none;
  }

  .icon {
    border-radius: 0;
    width: 32px;
    height: 32px;
    box-sizing: border-box;
  }

  select {
    outline: 0;
    padding: 0 28px 0 8px;
    background-position: right center;
    min-height: 32px;

    &:hover {
      filter: invert();
    }
  }

  .icon:hover {
    background-color: #000;
    color: #fff;
  }

  .icon.active {
    border-bottom: 2px solid #000;
  }
</style>