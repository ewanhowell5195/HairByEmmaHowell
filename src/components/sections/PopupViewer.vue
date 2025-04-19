<template>
  <div class="popup" :class="{ 'popup-visible': visible }" @click="closePopup" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <div class="popup-container">
      <img class="popup-image" :src="image.dataset?.popupSrc ?? image.getAttribute?.('src')" ref="popupImage" />
    </div>
    <div id="popup-image-prev" ref="prev" class="icon" @click="prevImage">navigate_before</div>
    <div id="popup-image-next" ref="next" class="icon" @click="nextImage">navigate_next</div>
    <div id="popup-image-count" ref="count">{{ current }} / {{ total }}</div>
    <div id="popup-image-close" class="icon" @click="closePopup">close</div>
    <a id="popup-image-open" class="icon" :href="image.dataset?.popupSrc ?? image.getAttribute?.('src')" target="_blank">open_in_new</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        image: "",
        images: [],
        touchStartX: 0,
        touchStartY: 0,
        touchEndX: 0,
        touchEndY: 0,
        current: 0,
        total: 0
      }
    },
    mounted() {
      document.addEventListener("click", this.click)
    },
    unmounted() {
      document.removeEventListener("click", this.click)
    },
    methods: {
      click(e) {
        let element = e.target
        while (element && !element.hasAttribute("popupable")) {
          if (["BUTTON", "A"].includes(element.tagName)) return
          element = element.parentElement
        }
        if (!element) return
        const value = element.getAttribute("popupable")
        this.images = Array.from(document.querySelectorAll(`[popupable="${value}"]`))
        if (this.images.length === 1) {
          this.$refs.prev.hidden = true
          this.$refs.next.hidden = true
          this.$refs.count.hidden = true
        } else {
          this.$refs.prev.hidden = false
          this.$refs.next.hidden = false
          this.$refs.count.hidden = false
          this.total = this.images.length
        }
        this.loadImage(element)
        this.visible = true
      },
      loadImage(img) {
        this.image = img
        const index = this.images.indexOf(img)
        this.current = index + 1
        if (index) {
          this.$refs.prev.classList.remove("inactive")
        } else {
          this.$refs.prev.classList.add("inactive")
        }
        if (index === this.images.length - 1) {
          this.$refs.next.classList.add("inactive")
        } else {
          this.$refs.next.classList.remove("inactive")
        }
      },
      closePopup(e) {
        if (e.target === e.currentTarget) {
          this.visible = false
        }
      },
      nextImage() {
        if (!this.$refs.next.classList.contains("inactive")) {
          this.loadImage(this.images[this.images.indexOf(this.image) + 1])
        }
      },
      prevImage() {
        if (!this.$refs.prev.classList.contains("inactive")) {
          this.loadImage(this.images[this.images.indexOf(this.image) - 1])
        }
      },
      handleTouchStart(e) {
        this.touchStartX = e.touches[0].screenX
        this.touchStartY = e.touches[0].screenY
      },
      handleTouchEnd(e) {
        const endX = e.changedTouches[0].screenX
        const endY = e.changedTouches[0].screenY
        const deltaX = endX - this.touchStartX
        const deltaY = endY - this.touchStartY

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (Math.abs(deltaX) < 50) return
          const index = this.images.indexOf(this.image)
          if (deltaX > 0 && index > 0) {
            this.prevImage()
          } else if (deltaX < 0 && index < this.images.length - 1) {
            this.nextImage()
          }
        } else {
          if (Math.abs(deltaY) < 50) return
          const index = this.images.indexOf(this.image)
          if (deltaY > 0 && index > 0) {
            this.prevImage()
          } else if (deltaY < 0 && index < this.images.length - 1) {
            this.nextImage()
          }
        }
      }
    }
  }
</script>

<style>
  [popupable] {
    cursor: pointer;
    transition: box-shadow .15s ease;

    &:hover {
      box-shadow: var(--box-shadow);
    }
  }
</style>

<style scoped>
  .popup {
    position: fixed;
    inset: 0;
    background-color: #000000C0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity .2s;
    pointer-events: none;
    backdrop-filter: blur(4px);
  }

  .popup-container {
    position: relative;
    user-select: none;
    box-shadow: 0 8px 16px #000;
    max-width: calc(100vw - 92px * 2);
    max-height: calc(100dvh - 92px * 2);
    overflow: hidden;
    scale: .85;
    transition: scale .15s ease;
  }

  .popup-visible {
    opacity: 1;
    pointer-events: initial;
    touch-action: none;

    .popup-container {
      scale: 1;
    }
  }

  .popup-image {
    max-width: calc(100vw - 92px * 2);
    max-height: calc(100dvh - 92px * 2);
    display: block;
    background-image: var(--transparency);
    image-rendering: pixelated;
    object-fit: contain;
  }

  #popup-image-count {
    color: #fff;
    position: absolute;
    top: 46px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
  }

  .icon {
    color: #fff;
    position: absolute;
    cursor: pointer;
    width: 60px;
    height: 60px;
    font-size: 40px;
    background-color: #0006;
    transition: background-color .15s ease, box-shadow .15s ease;
    user-select: none;

    &:hover {
      background: #000B;
      box-shadow: var(--box-shadow);
    }

    &.inactive {
      background-color: #0006;
      box-shadow: initial;
      opacity: .25;
      cursor: not-allowed;
    }
  }

  #popup-image-close, #popup-image-open {
    top: 16px;
    right: 16px;
  }

  #popup-image-open {
    right: 92px;
    font-size: 32px;
  }

  #popup-image-prev {
    left: 16px;
    font-size: 48px;
  }

  #popup-image-next {
    right: 16px;
    font-size: 48px;
  }

  @media (max-width: 768px) {
    .popup-container {
      max-width: calc(100vw - 14px * 2);
      max-height: calc(100dvh - 56px * 2);
    }

    .popup-image {
      max-width: calc(100vw - 14px * 2);
      max-height: calc(100dvh - 56px * 2);
    }

    #popup-image-count {
      top: 28px;
      font-size: 16px;
    }

    .icon {
      width: 40px;
      height: 40px;
      font-size: 24px;
    }

    #popup-image-close, #popup-image-open {
      top: 8px;
      right: 8px;
    }

    #popup-image-open {
      right: 56px;
      font-size: 22px;
    }

    #popup-image-prev {
      left: 50%;
      transform: translateX(calc(-100% - 4px));
      font-size: 32px;
      bottom: 8px;
    }

    #popup-image-next {
      left: calc(50% + 4px);
      right: initial;
      font-size: 32px;
      bottom: 8px;
    }
  }
</style>