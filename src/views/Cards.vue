<template>
  <div>
    <SearchFilter></SearchFilter>
    <div class="cards">
      <div v-for="country in countries" :key="country.cca3" class="cards__infos my-5" data-testid="cards__infos">
        <RouterLink :to="'/country/' + country.cca3">
          <div class="cards__flag">
            <img :src="country.flags.png" :alt="`${country.name.common} flag`" aria-label="Country flag">
          </div>
          <div :class="{ 'dark-mode': isDarkMode }" class="cards__content">
            <h6 class="cards__content--title">{{ country.name.common }}</h6>
            <div class="cards__content--details">
              <p><span>Population: </span>{{ country.population }}</p>
              <p><span>Region: </span>{{ country.region }}</p>
              <p><span>Capital: </span>{{ country.capital[0] }}</p>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import SearchFilter from "@/components/SearchFilter.vue";
import { RouterLink } from 'vue-router'
import { mapFields } from "vuex-map-fields";

export default {
  name: "Cards",
  components: { SearchFilter },
  computed: {
    ...mapFields(['isDarkMode', 'countries'])
  },
  mounted() {
    this.$store.dispatch('fetchCountries');
  },
  beforeUnmount() {
    this.$store.commit('resetState')
  }
}
</script>

<style scoped>
@import "@/assets/main.css";
</style>
