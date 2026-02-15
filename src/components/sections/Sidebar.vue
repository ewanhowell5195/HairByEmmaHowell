<script setup>
  import { useRouter } from "vue-router"
  import { ref, watch } from "vue"

  const props = defineProps({
    modelValue: Boolean
  })

  const emit = defineEmits(["update:modelValue"])
  const router = useRouter()

  const hasToken = ref(!!localStorage.getItem("gh_token"))

  watch(
    () => props.modelValue,
    open => {
      if (open) hasToken.value = !!localStorage.getItem("gh_token")
    }
  )

  function closeSidebar() {
    emit("update:modelValue", false)
  }

  function logout() {
    localStorage.removeItem("gh_token")
    localStorage.removeItem("gh_token_expiry")
    closeSidebar()
    router.push("/")
    hasToken.value = false
  }
</script>

<template>
  <div id="sidebar" :class="{ open: modelValue }">
    <router-link to="/" @click="closeSidebar">Home</router-link>
    <router-link to="/services/hairdressing" @click="closeSidebar">Hairdressing</router-link>
    <router-link to="/services/bridalhair" @click="closeSidebar">Bridal Hair</router-link>
    <router-link to="/about" @click="closeSidebar">About</router-link>
    <router-link to="/reviews" @click="closeSidebar">Reviews</router-link>
    <router-link to="/contact" @click="closeSidebar">Contact</router-link>
    <div class="spacer"></div>
    <router-link to="/admin" @click="closeSidebar">Admin</router-link>
    <a v-if="hasToken" @click="logout">Logout</a>
  </div>
  <div id="sidebar-content-overlay" :class="{ visible: modelValue }" @click="closeSidebar"></div>
</template>

<style scoped>
  #sidebar-content-overlay {
    position: fixed;
    inset: 0;
    background-color: #0008;
    z-index: 49;
    opacity: 0;
    pointer-events: none;
    transition: opacity .25s;
    backdrop-filter: blur(4px);

    &.visible {
      pointer-events: initial;
      opacity: 1;
    }
  }

  #sidebar {
    position: fixed;
    left: 0;
    top: var(--header-height);
    bottom: 0;
    background-color: var(--color-background);
    width: 256px;
    z-index: 51;
    transform: translateX(-100%);
    transition: transform .25s;
    display: flex;
    flex-direction: column;
    padding: 0 32px 32px;
    gap: 8px;
    align-items: flex-start;

    &.open {
      transform: initial;
    }
  }

  a {
    font-size: 24px;
    text-decoration: none;
    position: relative;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      bottom: 2px;
      height: 2px;
      background-color: currentColor;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      transition: width .15s;
    }

    &:hover::before {
      width: 100%;
    }
  }

  .spacer {
    margin-top: -8px;
  }

  @media (max-width: 768px) {
    #sidebar {
      padding: 10px 20px 20px;
    }

    a {
      font-size: 18px;

      &::before {
        bottom: 1px;
      }
    } 
  }
</style>