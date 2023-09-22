<template>
  <nav :class="{ 'dark-mode': isDarkMode }" class="navbar navbar-expand-lg navbar-light bg-light shadow header">
    <div class="container-fluid p-0 m-0">
      <a href="/">
        <h6 class="fw-bolder">Where in the world?</h6>
      </a>
      <div>
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
        <button :class="{ 'dark-mode-words': isDarkMode }"  class="header__button" type="button" @click="toggleDarkMode">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</button>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapFields} from "vuex-map-fields";

export default {
  data() {
    return {

    };
  },
  computed:{
    ...mapFields(['isDarkMode'])
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
  },
};
</script>

<style scoped>
@import "@/assets/main.css";


</style>

