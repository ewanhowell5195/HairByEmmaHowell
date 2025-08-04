<script setup>
  const props = defineProps({
    modelValue: {
      type: String,
      default: ""
    },
    dir: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: "Image"
    }
  })

  const emit = defineEmits(["update:modelValue"])

  function handleInput(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      emit("update:modelValue", reader.result)
    }
    reader.readAsDataURL(file)
  }

  function resolveUrl(src) {
    return src?.startsWith("data:") ? src : `https://raw.githubusercontent.com/ewanhowell5195/HairByEmmaHowell/master/public/assets/images/${props.dir}/${src}`
  }
</script>

<template>
  <label>{{ title }}</label>
  <div class="upload-image">
    <img :popupable="Math.random()" :src="resolveUrl(modelValue)" />
    <div class="upload-image-footer">
      <span class="icon" data-tooltip="Replace Image">
        <span>upload</span>
        <input type="file" title="" accept="image/webp,image/jpeg,image/png" @change="handleInput" />
      </span>
    </div>
  </div>
</template>

<style scoped>
  .upload-image {
    aspect-ratio: 1 / 1;
    position: relative;
    min-width: calc(25% - 12px);
    max-width: calc(25% - 12px);

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
      overflow: hidden;
      border-radius: 0;

      & input {
        position: absolute;
        inset: 0;
        width: 100%;
        max-height: 32px;
        opacity: 0;
      }
    }
  }
</style>
