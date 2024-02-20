<template>
    <button @click="setDatePeriod('daily')">1W - daily</button>
    <button @click="setDatePeriod('weekly')">1M - weekly</button>
    <button @click="setDatePeriod('monthly')">3M - monthly</button>
    <button @click="setDatePeriod('1Y')">1Y</button>

    <input type="text" v-model="stockSymbol" placeholder="Enter Stock Symbol" />
    <div v-if="isError">error</div>
    <div>
      <div v-if="isLoading">Loading...</div>
      <LineChart :data="data" />
    </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import LineChart from './components/LineChart.vue';
import { useFetchData } from './composables/useFetchData.js';

export default {
  name: 'App',
  components: {
    LineChart,
  },
  setup() {
    const datePeriod = ref('daily'); 
    const stockSymbol = ref('IBM'); 

    const API_URL = computed(() => (`http://localhost:8080/v1/stocks/${datePeriod.value}/${stockSymbol.value}`));

    const { data, isLoading, isError, fetchData } = useFetchData(API_URL);

    const setDatePeriod = (period) => {
      datePeriod.value = period;
    }

    watch([datePeriod, stockSymbol], () => {
      fetchData(API_URL);
    }, { immediate: true });

    return {
      data,
      isLoading,
      isError,
      datePeriod,
      stockSymbol,
      setDatePeriod,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
