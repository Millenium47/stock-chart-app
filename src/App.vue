<template>
  <div class="container mt-5">
    <div class="row mb-3 d-flex justify-content-between">
      <div class="col d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-primary" @click="setDatePeriod('daily')">Daily</button>
        <button class="btn btn-primary" @click="setDatePeriod('weekly')">Weekly</button>
        <button class="btn btn-primary" @click="setDatePeriod('monthly')">Monthly</button>
      </div>
      <div class="col">
        <input type="text" class="form-control" v-model="stockSymbol" placeholder="Enter Stock Symbol" />
        <div v-if="isError" class="alert alert-danger">error</div>
      </div>
    </div>
    <div v-if="isLoading" class="row">
      <div class="col">
        Loading...
      </div>
    </div>
    <div class="row">
      <div class="col">
        <LineChart :data="data" />
      </div>
    </div>
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

    const API_URL = computed(() => (`http://localhost:8080/v1/stocks/${stockSymbol.value}?interval=${datePeriod.value}`));

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
</style>
