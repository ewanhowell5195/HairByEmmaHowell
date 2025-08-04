<script setup>
  import CustomForm from "../../snippets/Form.vue"

  const props = defineProps({
    items: {
      type: Array,
      required: true
    },
    create: {
      type: Function,
      required: true
    },
    type: {
      type: String,
      default: "item"
    }
  })

  function addItem() {
    props.items.push(props.create())
  }

  function movePrev(i) {
    if (i <= 0) return
    const item = props.items.splice(i, 1)[0]
    props.items.splice(i - 1, 0, item)
  }

  function moveNext(i) {
    if (i >= props.items.length - 1) return
    const item = props.items.splice(i, 1)[0]
    props.items.splice(i + 1, 0, item)
  }

  function remove(i) {
    if (confirm(`Are you sure you want to delete this ${props.type.toLowerCase()}?`)) {
      props.items.splice(i, 1)
    }
  }
</script>

<template>
  <div class="item-list">
    <CustomForm v-for="(item, index) in items" :key="index" class="item-wrapper" boxed action empty>
      <div class="form-row">
        <div class="form-col">
          <slot :item="item" :index="index" />
        </div>
        <div class="item-controls">
          <button type="button" class="icon" @click="movePrev(index)" data-tooltip="Move Previous">keyboard_arrow_up</button>
          <button type="button" class="icon" @click="remove(index)" :data-tooltip="'Delete ' + type">delete</button>
          <button type="button" class="icon" @click="moveNext(index)" data-tooltip="Move Next">keyboard_arrow_down</button>
          <div class="spacer"></div>
        </div>
      </div>
    </CustomForm>
    <button type="button" @click="addItem"><span class="icon">add</span>Add {{ type }}</button>
  </div>
</template>

<style scoped>
  .item-list {
    padding: 16px;
    border: 2px solid var(--color-primary);
    background-color: var(--color-background);
  }

  .item-controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;

    .icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      border-radius: 0;
      padding: 0;
      color: #000 !important;
      background-color: #fff;

      &:nth-child(2) {
        font-size: 24px;
      }
    }

    .spacer {
      display: none;
    }

    @media (max-width: 768px) {
      flex-direction: row;
      justify-content: flex-start;

      :nth-child(2) {
        order: 1;
      }

      .spacer {
        display: initial;
      }
    }
  }

  .item-wrapper:first-child > .form-row > .item-controls :first-child,
  .item-wrapper:nth-last-child(2) > .form-row > .item-controls :nth-last-child(2) {
    pointer-events: none;
    opacity: .35;
  }

  @media (max-width: 768px) {
    .item-wrapper > .form-row {
      flex-direction: column-reverse;
    }

    .item-list {
      padding: 8px;
    }
  }
</style>