<template >
    <div :class="{ 'dark-mode2': isDarkMode }"  class="wrapper appBg container-fluid p-0 transition__main vh-100">
      <header-main></header-main>


      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" :key="$route.path"  />
        </transition>
      </router-view>
    </div>

</template>

<script>
import headerMain from "@/components/HeaderMain.vue";
import {mapFields} from "vuex-map-fields";

export default {
  components: {
    headerMain
  },
  computed:{
    ...mapFields(['isDarkMode'])
  }
};
</script>
<style scoped>
@import "@/assets/main.css";
.slide-enter-active,
.slide-leave-active {
  transition: opacity .5s, transform .5s;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
