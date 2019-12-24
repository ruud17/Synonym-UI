<template>
  <div id="app">
    <div>
      <HomePage />
    </div>
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";

export default {
  name: "app",
  components: {
    HomePage
  }
};
</script>

<style lang="scss">
@import '../node_modules/@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css';
</style>
