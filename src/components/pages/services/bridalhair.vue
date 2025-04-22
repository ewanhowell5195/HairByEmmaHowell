<script setup>
  import service from "@/assets/json/services/bridal_hair.json"
  import ServiceInfo from "../../sections/ServiceInfo.vue"

  service.heading = "Bridal Hair"
  service.id = "bridal_hair"
</script>

<template>
  <ServiceInfo :service="service" />
</template>

<style scoped>
</style>