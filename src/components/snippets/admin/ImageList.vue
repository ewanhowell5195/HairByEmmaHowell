<script setup>
  const props = defineProps({
    images: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: "Images"
    },
    max: {
      type: Number,
      default: Infinity
    },
    dir: {
      type: String,
      default: ""
    }
  })

  const componentId = Math.random()

  function handleInput(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      props.images.push(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function deleteImage(i) {
    if (confirm("Are you sure you want to delete this image?")) {
      props.images.splice(i, 1)
    }
  }

  function moveImagePrev(i) {
    if (i === 0) return
    const temp = props.images[i]
    props.images[i] = props.images[i - 1]
    props.images[i - 1] = temp
  }

  function moveImageNext(i) {
    if (i >= props.images.length - 1) return
    const temp = props.images[i]
    props.images[i] = props.images[i + 1]
    props.images[i + 1] = temp
  }

  function resolveUrl(img) {
    return img.startsWith("data:") ? img : `https://raw.githubusercontent.com/ewanhowell5195/HairByEmmaHowell/master/public/assets/images/${props.dir}/${img}`
  }
</script>

<template>
  <label>{{ title }}</label>
  <div class="image-list">
    <div
      v-for="i in Math.min(images.findLastIndex(img => !!img) + 2, max)"
      :key="i - 1"
      :class="[
        'image-list-item',
        {
          last: images?.[i - 1] && (i - 1) === images.findLastIndex(img => !!img),
          input: !images?.[i - 1] && (i - 1) > (images?.findLastIndex(img => !!img) ?? -1)
        }
      ]"
    >
      <template v-if="images?.[i - 1]">
        <img :src="resolveUrl(images[i - 1])" :popupable="componentId" />
        <div class="image-list-footer">
          <span data-tooltip="Move Previous" class="icon" @click="moveImagePrev(i - 1)">keyboard_arrow_left</span>
          <span data-tooltip="Delete Image" class="icon" @click="deleteImage(i - 1)">delete</span>
          <span data-tooltip="Move Next" class="icon" @click="moveImageNext(i - 1)">keyboard_arrow_right</span>
        </div>
      </template>
      <template v-else>
        <input
          type="file"
          title=""
          accept="image/webp,image/jpeg,image/png"
          @change="handleInput"
        />
        <div class="icon new-image">add</div>
      </template>
    </div>
  </div>
</template>

<style scoped>
  .image-list {
    display: flex;
    gap: 16px;
    user-select: none;
    max-width: 100%;
    flex-wrap: wrap;
  }

  .image-list-item {
    flex: 1 1 0px;
    aspect-ratio: 1 / 1;
    position: relative;
    transition: box-shadow .15s;
    min-width: calc(25% - 12px);
    max-width: calc(25% - 12px);

    &.input:nth-child(4n + 1) {
      max-height: 64px;

      .icon {
        font-size: 48px;
      }
    }

    @media (max-width: 768px) {
      min-width: calc(50% - 8px);
      max-width: calc(50% - 8px);

      &.input:nth-child(2n + 1) {
        max-height: 64px;

        .icon {
          font-size: 48px;
        }
      }
    }

    & img, input {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      cursor: pointer;
    }
  }

  .image-list-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #0004;
    display: flex;
    justify-content: space-between;

    .icon {
      color: #fff;
      font-size: 32px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      border-radius: 0;

      &:nth-child(2) {
        font-size: 24px;
      }
    }
  }

  .image-list-item:first-child .image-list-footer .icon:first-child,
  .image-list-item.last .image-list-footer .icon:last-child {
    pointer-events: none;
    opacity: .35;
  }

  .image-list-item.input:hover {
    box-shadow: var(--box-shadow);
  }

  .new-image {
    position: absolute;
    inset: 0;
    background-color: var(--color-background);
    border-radius: 0;
    pointer-events: none;
    font-size: 64px;
  }
</style>