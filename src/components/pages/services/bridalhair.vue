<script setup>
  import service from "@/assets/json/services/bridal_hair.json"
  import ServiceInfo from "../../sections/ServiceInfo.vue"
  import PriceList from "../../sections/PriceList.vue"

  service.heading = "Bridal Hair"
  service.id = "bridal_hair"
</script>

<template>
  <ServiceInfo :service="service" />
  <PriceList :pricelist="service.price_list" />
</template>

<style scoped>
</style>