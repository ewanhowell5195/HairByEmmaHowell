<script setup>
  defineProps({
    pricelist: Object
  })
</script>

<template>
  <section>
    <h2>Price List</h2>
    <div id="price-list">
      <div v-for="category in pricelist" class="price-list-category">
        <h3>{{ category.title }}</h3>
        <div class="price-list-category-items">
          <template v-for="item in category.values" :key="item.name">
            <div class="item-name">{{ item.name }}</div>
            <div v-if="item.price" class="item-price">{{ item.price }}</div>
            <div v-if="item.description" class="item-description" :colspan="2">{{ item.description }}</div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  h2 {
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;

    &::before,
    &::after {
      content: "";
      height: 1px;
      background-color: var(--color-primary);
      flex: 1;
    }
  }

  #price-list {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 24px;
    margin-top: 12px;
  }

  .price-list-category {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & h3 {
      border-bottom: 1px solid var(--color-primary);
    }
  }

  .price-list-category-items {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.5rem 1rem;
    align-items: start;
  }

  .item-name,
  .item-price {
    font-weight: 600;
    font-size: 20px;
  }

  .item-description {
    grid-column: span 2;
    font-size: 18px;
    opacity: .75;
    margin-top: -12px;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    .item-name,
    .item-price {
      font-size: 16px;
    }

    .item-description {
      font-size: 14px;
      margin-top: -10px;
    }
  }
</style>