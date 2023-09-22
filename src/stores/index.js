import { createStore } from 'vuex';
import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios';

export default createStore({
    state: {
        isError: false,
        isDarkMode: false,
        countries: [],
    },
    getters: {
        getField
    },
    mutations: {
        updateField,
        setCountries(state, countries) {
            state.countries = countries;
        },
        resetState(state) {
            state.countries = {};
        },
        selectCountry(state, select) {
            state.countries = select;
        },
    },
    actions:{
      async  fetchCountries({ commit }) {
         await   axios
                .get('https://restcountries.com/v3.1/all?fields=name,region,flags,population,capital,nativeName,subregion,capital,tld,currencies,languages,borders,cca3')
                .then((response) => {
                    commit('setCountries', response.data);
                })
                .catch((error) => {
                    console.error('Error fetching countries:', error);
                });
        },
       async fetchCountriesByRegion({ commit }, payload) {
         await  axios
                .get(`https://restcountries.com/v3.1/region/${payload}`)
                .then((response) => {
                    commit('setCountries', response.data);
                })
                .catch((error) => {
                    console.error('Error fetching countries:', error);
                });
        },
       async fetchCountriesBySearch({ commit }, payload) {
         await  axios
                .get(`https://restcountries.com/v3.1/alpha/${payload}`)
                .then((response) => {
                    commit('setCountries', response.data);
                })
                .catch((error) => {
                    console.error('Error fetching countries:', error);
                });
        },
       async fetchSelectedCountry({ commit }, payload) {
         await  axios
                .get(`https://restcountries.com/v3.1/alpha/${payload}`)
                .then((response) => {
                    commit('selectCountry', response.data);
                })
                .catch((error) => {
                    console.error('Error fetching countries:', error);
                });
        },
    },
})
