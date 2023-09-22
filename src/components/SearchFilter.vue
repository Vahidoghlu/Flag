<template>
  <div class="search-bar" >
    <form class="search-bar__form">
      <input @input.prevent="getCountriesBySearch(searchCountry)" v-model="searchCountry" :class="{ 'dark-mode': isDarkMode }" class="search-bar__form--input form-control" type="text"
             placeholder="Search for a country...">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="search-bar__form--icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"></path></svg>
    </form>
    <div>
      <div @click="filterSelect =! filterSelect" :class="{ 'dark-mode': isDarkMode }" class="filter d-flex align-items-center">
        <span>{{selectedRegion}}</span>
        <svg :class="{ 'rotate': filterSelect }"  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="filter__icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg>
      </div>
      <div
          :class="['filter__select', { 'open': filterSelect }, { 'dark-mode': isDarkMode }]"
            class="filter__select">
        <ul  class="mt-3">
          <li  v-for="region in capitalizedRegions" :key="region" id="region"
              class="filter__select--region">
            <a :class="{'active' : selectedRegion === region}" href=""
               @click.prevent="getCountriesByRegion(region)">
              {{region}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapFields} from "vuex-map-fields";
import {regions} from "@/lib/const/regions";

export default {
  name: "searchFilter",
  data(){
    return{
      filterSelect: false,
      regions,
      selectedRegion : 'All',
      isActive: false,
      searchCountry:''
    }
  },
  computed:{
    ...mapFields(['isDarkMode', 'countries']),
    capitalizedRegions() {
      return this.regions.map(region => region.charAt(0).toUpperCase() + region.slice(1));
    },
  },
  watch:{
    searchCountry(event){
      if(event==''){
        this.$store.dispatch('fetchCountries');
      }
    }
  },
  methods: {
      getCountriesByRegion(region) {
        this.isActive = !this.isActive;
        if (region === "All") {
          this.selectedRegion = "All";
          this.$store.dispatch('fetchCountries');
        } else {
          this.$store.dispatch('fetchCountriesByRegion', region).then(() => {
            this.selectedRegion = this.countries[0]?.region || "";
          });
        }
        this.filterSelect = !this.filterSelect;
      },

      getCountriesBySearch(searchCountry) {
          this.$store.dispatch('fetchCountriesBySearch', searchCountry)
      }
  }
}
</script>

<style scoped>
@import "@/assets/main.css";
</style>