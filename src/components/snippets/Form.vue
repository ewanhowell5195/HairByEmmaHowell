<script setup>
  import "@/assets/styles/flatpickr.css"
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
    if (input) {
      flatpickr(input, {
        enableTime: true,
        minDate: new Date().fp_incr(1),
        dateFormat: "d/m/Y at H:i",
        time_24hr: true,
        minTime: "09:00",
        maxTime: "18:00",
        disable: [
          date => date.getDay() === 0
        ]
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
    <div class="form-row">
      <div class="form-col">
        <label for="phone">Phone Number</label>
        <input id="phone" type="tel" name="phone" placeholder="07123 456789" required />
      </div>
      <div class="form-col">
        <label for="email">Email</label>
        <input id="email" type="email" name="email" placeholder="name@example.com" required />
      </div>
    </div>
    <slot ref="slot" />
    <button type="submit">Submit</button>
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
      background-color: var(--color-background-primary);
      margin-bottom: 20px;
    }

    & label,
    &:deep(label) {
      margin-bottom: -8px;
      font-weight: 700;
      font-size: 18px;
    }
  }

  .form-col, .form-row {
    display: flex;
    gap: 16px;
  }

  .form-row {
    flex-direction: row;
  }

  .form-col {
    flex-direction: column;
    flex: 1;
  }

  @media (max-width: 500px) {
    .form-row {
      flex-direction: column;
    }
  }
</style>