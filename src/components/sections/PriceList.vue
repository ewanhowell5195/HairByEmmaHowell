<script setup>
  defineProps({
    pricelist: Array
  })
</script>

<template>
  <section class="contrast">
    <div class="container row">
      <div id="price-list-heading">
        <h1>PRICE LIST</h1>
      </div>
      <div id="price-list">
        <div v-for="(items, category) in pricelist" class="price-list-category">
          <h2>{{ category }}</h2>
          <div class="price-list-category-items">
            <template v-for="item in items" :key="item.name">
              <div class="item-name">{{ item.name }}</div>
              <div v-if="item.price" class="item-price">{{ item.price }}</div>
              <div v-if="item.description" class="item-description" :colspan="2">{{ item.description }}</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  #price-list-heading {
    background-image: url("/assets/images/services/price_list.webp");
    background-position: center;
    background-size: cover;
    padding: 40px;
    width: 256px;
    min-height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24px;

    & h1 {
      font-size: 128px;
      font-weight: 300;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
    }
  }

  #price-list {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 24px;
  }

  .price-list-category {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & h2 {
      border-bottom: 1px solid #fff;
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
    font-size: 24px;
  }

  .item-description {
    grid-column: span 2;
    font-size: 20px;
    opacity: .75;
    margin-top: -12px;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    #price-list-heading {
      width: 100%;
      min-height: initial;
      padding: 10px;

      & h1 {
        writing-mode: initial;
        transform: initial;
      }
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

  @media (max-width: 620px) {
    #price-list-heading h1 {
      font-size: 100px;
    }
  }

  @media (max-width: 540px) {
    #price-list-heading h1 {
      font-size: 80px;
    }
  }

  @media (max-width: 440px) {
    #price-list-heading h1 {
      font-size: 60px;
    }
  }
</style>