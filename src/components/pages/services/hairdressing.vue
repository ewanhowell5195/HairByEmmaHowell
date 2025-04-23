<script setup>
  import service from "@/assets/json/services/hairdressing.json"
  import ServiceInfo from "../../sections/ServiceInfo.vue"
  import PriceList from "../../sections/PriceList.vue"

  service.heading = "Hairdressing"
  service.id = "hairdressing"
</script>

<template>
  <ServiceInfo :service="service" />
  <PriceList :pricelist="service.price_list" />
</template>

<style scoped>
</style>