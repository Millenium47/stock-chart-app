<template>
  <div class="container mt-5">
    <div class="row mb-3 d-flex justify-content-between">
      <div class="col d-flex flex-wrap align-items-center gap-2">
         <button v-for="interval in intervals" :key="interval"
                class="btn btn-outline-dark"
                :class="{ 'active': datePeriod === interval }"
                @click="setDatePeriod(interval)">
          {{ interval.charAt(0).toUpperCase() + interval.slice(1) }}
        </button>
      </div>
      <div class="col">
        <v-select 
          v-model="stockSymbol" 
          :options="stockNames" 
          label="label"
          :reduce="stock => stock.value" 
          @input="onSelectStock" 
          placeholder="Select Stock Symbol">
        </v-select>
      </div>
    </div>
    <LoadingSpinner v-if="isLoading" />
    <RetryAlert @retry="fetchData" v-if="isError" />
    <LineChart :data="data" v-if="!isLoading && !isError"/>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import VSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import LineChart from './components/LineChart.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import RetryAlert from './components/RetryAlert.vue';
import { useFetchData } from './composables/useFetchData.js';

export default {
  name: 'App',
  components: {
    LineChart,
    LoadingSpinner,
    RetryAlert,
    VSelect
  },
  setup() {
    const intervals = ['daily', 'weekly', 'monthly'];
    const datePeriod = ref('daily');
    const stockSymbol = ref('IBM');
    const stockNames = ref([
      { label: "IBM", value: "IBM" },
      { label: "Apple Inc", value: "AAPL" },
      { label: "Microsoft Corporation", value: "MSFT" },
      { label: "Tesla", value: "TSLA" },
      { label: "Amazon", value: "AMZN" },
      { label: "Google", value: "GOOGL" },
      { label: "Facebook", value: "FB" },
      { label: "NVIDIA Corporation", value: "NVDA" },
      { label: "Intel Corporation", value: "INTC" },
    ]);

    const API_URL = computed(() => `http://localhost:8080/v1/stocks/${stockSymbol.value}?interval=${datePeriod.value}`);
    const { data, isLoading, isError, fetchData } = useFetchData(API_URL);

    const onSelectStock = (selectedOption) => {
      stockSymbol.value = selectedOption.symbol;
    };

    const setDatePeriod = (period) => {
      datePeriod.value = period;
    };

    watch([datePeriod, stockSymbol], () => {
      if(stockSymbol.value != undefined)
      fetchData(API_URL);
    }, { immediate: true });

    return {
      data,
      intervals,
      isLoading,
      isError,
      datePeriod,
      stockSymbol,
      stockNames,
      fetchData,
      setDatePeriod,
      onSelectStock,
    };
  },
};
</script>

<style>
</style>
