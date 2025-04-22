<script setup>
  import "flatpickr/dist/flatpickr.css"
  import { ref, onMounted } from "vue"
  import flatpickr from "flatpickr"

  const redirect = ref(null)
  const form = ref(null)

  defineProps({
    boxed: {
      type: Boolean,
      default: false
    }
  })

  function updateRedirect(e) {
    if (e.target.name === "name") {
      redirect.value.value = `${window.location.origin}/submitted?name=${encodeURIComponent(e.target.value.trim().split(" ")[0])}`
    }
  }

  onMounted(() => {
    const input = form.value.querySelector("#datetime")
    console.log(form)
    if (input) {
      flatpickr(input, {
        enableTime: true,
        minDate: "today",
        // defaultDate,
        dateFormat: "H:i d/m/Y",
        time_24hr: true,
        // onChange: validateDates
      })
    }
  })
</script>

<template>
  <form action="https://api.web3forms.com/submit" method="POST" @input="updateRedirect" :class="{ boxed }" ref="form">
    <input type="hidden" name="access_key" :value="$settings.formKey" />
    <input type="hidden" name="redirect" ref="redirect" />
    <label for="name">Name</label>
    <input id="name" type="text" name="name" placeholder="Your Name" required @input="updateRedirect" />
    <label for="email">Email</label>
    <input id="email" type="email" name="email" placeholder="name@example.com" required />
    <slot ref="slot" />
    <button type="submit" :class="{ white: boxed }">Submit</button>
  </form>
</template>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &.boxed {
      outline: 2px solid var(--color-primary);
      padding: 16px;
      border-radius: 24px;
      background-color: var(--color-background-primary);
      color: #fff;
      margin-bottom: 20px;
    }

    & label,
    &:deep(label) {
      margin-bottom: -8px;
      font-weight: 700;
      font-size: 18px;
    }
  }
</style>