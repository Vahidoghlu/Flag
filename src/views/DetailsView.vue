<template>
  <div class="country">
    <button @click="goBack" :class="{ 'dark-mode': isDarkMode }" class="country__button" type="button">
      <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 20 20"
          class="country__button--icon"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            fill-rule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
        ></path>
      </svg>
      <span>Back</span>
    </button>
    <div class="country__section">
      <div class="country__flag">
        <img :src="countryFlag" :alt="`${countries[0].name.common} flag`">
      </div>
      <div class="country__details">
        <h3 class="country__details--title">{{ countries[0].name.common }}</h3>
        <div class="country__details--elements">
          <div>
            <p><span>Native Name: </span>{{ nativeName }}</p>
            <p><span>Population: </span>{{ countries[0].population }}</p>
            <p><span>Region: </span>{{ countries[0].region }}</p>
            <p><span>Sub Region: </span>{{ countries[0].subregion || '--'}}</p>
            <p><span>Capital: </span>{{ capital }}</p>
          </div>
          <div>
            <p><span>Top Level Domain: </span>{{ topLevelDomain }}</p>
            <p><span>Currencies: </span>{{ formattedCurrencies || '--'}}</p>
            <p><span>Languages: </span>{{ formattedLanguages }}</p>
          </div>
        </div>

        <div v-if="countries[0].borders" class="country__details--list flex-column">
          <div>
            <p><span>Border Countries: </span></p>
          </div>
          <br>
          <div>
            <router-link v-for="border in countries[0].borders" :to="'/country/' + border" :key="border">
              <button :class="{ 'dark-mode': isDarkMode }" class="country__details--button" type="button" data-testid="border">{{ border }}</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {mapFields} from "vuex-map-fields";

export default {
  name: "DetailsView",
  computed: {
    ...mapFields(['isDarkMode', 'countries']),
    countryFlag() {
      return this.countries[0]?.flags?.png || '';
    },
    nativeName() {
      return this.countries[0]?.name?.nativeName?.nld?.official || '--';
    },
    capital() {
      return this.countries[0]?.capital?.toString() || '--';
    },
    topLevelDomain() {
      return this.countries[0]?.tld?.toString() || '--';
    },
    currencies() {
      return JSON.stringify(this.countries[0]?.currencies || {});
    },
    languages() {
      return JSON.stringify(this.countries[0]?.languages || {});
    },
    formattedCurrencies() {
      const currenciesObj = this.countries[0]?.currencies || {};
      const formattedCurrencies = [];

      for (const code in currenciesObj) {
        if (currenciesObj.hasOwnProperty(code)) {
          const currency = currenciesObj[code];
          formattedCurrencies.push(`${currency.name} - ${currency.symbol}`);
        }
      }

      return formattedCurrencies.join(", ");
    },

    formattedLanguages() {
      const languagesObj = this.countries[0]?.languages || {};
      const languageNames = Object.values(languagesObj);
      return languageNames.join(", ");
    },
  },
  methods: {
    ...mapActions(['fetchSelectedCountry']),
    async goBack() {
      await this.$router.go(-1);
    },
  },
  async created() {
    const userId = this.$route.params.id;
    try {
      await this.fetchSelectedCountry(userId);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  },
  beforeUnmount() {
    this.$store.commit('resetState')
  }
};
</script>

<style scoped>
@import "@/assets/main.css";
</style>
