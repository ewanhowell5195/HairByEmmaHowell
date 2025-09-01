<script setup>
  import EditPage from "@c/sections/admin/EditPage.vue"
  import CustomForm from "@c/snippets/Form.vue"

  function toTitleCase(str) {
    return str
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase())
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
              <input :id="key" type="color" v-model="data.colors[key]" />
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
  }

  .colour {
    display: flex;
    flex-direction: column;
    gap: 16px;

    & input {
      height: 128px;
    }
  }
</style>>