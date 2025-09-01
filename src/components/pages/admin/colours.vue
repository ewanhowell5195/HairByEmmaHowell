<script setup>
  import EditPage from "@c/sections/admin/EditPage.vue"
  import CustomForm from "@c/snippets/Form.vue"

  function toTitleCase(str) {
    return str
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase())
  }

  function isDark(hex) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance < 0.5
  }
</script>

<template>
  <EditPage path="src/settings.json" label="Colours">
    <template #default="{ data }">
      <CustomForm boxed action empty>
        <div class="row colours">
          <template v-for="(value, key) in data.colors" :key="key">
            <div class="col colour">
              <label :for="key">{{ toTitleCase(key) }}</label>
              <div class="picker">
                <input :id="key" type="color" v-model="data.colors[key]" />
                <div class="icon" :class="{ light: isDark(data.colors[key]) }">colorize</div>
              </div>
            </div>
          </template>
        </div>
      </CustomForm>
    </template>
  </EditPage>
</template>

<style scoped>
  .colours {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
    }
  }

  .colour {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: space-between;
  }

  .picker {
    position: relative;

    input {
      width: 100%;
      height: 128px;
    }
  }

  .icon {
    position: absolute;
    top: calc(12px + 8px);
    left: calc(16px + 8px);
    font-size: 24px;
    color: black;

    &.light {
      color: #fff;
    }
  }
</style>