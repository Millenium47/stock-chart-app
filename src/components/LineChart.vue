<template>
  <div class="lineChart">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

let stockMarketHistoryDates = [];
let stockMarketHistoryPrices = [];


export default {
  name: 'LineChart',
  setup() {
    let chartInstance = null; 
    const stockSymbol = ref('IBM');
    const datePeriod = ref('daily');
    
    const API_URL = ref(`http://localhost:8080/v1/stocks/${datePeriod.value}/${stockSymbol.value}`);

    const updateStockChart = () => {
      const ctx = document.getElementById('myChart').getContext('2d');
      const data = {
        labels: stockMarketHistoryDates,
        datasets: [
          {
            label: 'Price',
            data: stockMarketHistoryPrices,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };

      const options = {
        responsive: true,
        maintainAspectRatio: true,
      };

      if (chartInstance) {
        chartInstance.data = data;
        chartInstance.update();
      } else {
        chartInstance = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
        });
      } 
    };

    const fetchStockData = () => {
      axios.get(API_URL.value).then(res => {

        res.data.forEach(r => {
          stockMarketHistoryDates.unshift(r.date);
          stockMarketHistoryPrices.unshift(r.value);
        });
        updateStockChart();
      }).catch(error => {
        console.error("Error fetching stock data:", error);
      });
    };

    onMounted(() => {
      fetchStockData();
      updateStockChart();
    });

    return {
      updateStockChart,
      fetchStockData
    };
  }
}
</script>

<style scoped>

</style>
