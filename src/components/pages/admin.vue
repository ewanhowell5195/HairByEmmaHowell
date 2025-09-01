<template>
  <div class="container">
    <h1>Admin</h1>
    <p>Manage the site content and images.</p>
    <router-link to="/admin/colours" class="button">Manage Colours</router-link>
    <h3>Pages</h3>
    <router-link to="/admin/about" class="button">Manage About</router-link>
    <router-link to="/admin/reviews" class="button">Manage Reviews</router-link>
    <h3>Services</h3>
    <div class="row">
      <router-link to="/admin/services/hairdressing" class="button">Manage Hairdressing</router-link>
      <router-link to="/admin/services/bridalhair" class="button">Manage Bridal Hair</router-link>
    </div>
  </div>
</template>

<style scoped>
</style>