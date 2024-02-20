<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'LineChart',
  props: {
    data: Array,
  },
  setup(props) {
    let chartInstance = null;
    const chartRef = ref(null);

    const drawChart = () => {
      const ctx = chartRef.value.getContext('2d');
      const chartData = {
        labels: props.data?.map(item => item.date).reverse(),
        datasets: [{
          label: 'Price',
          data: props.data?.map(item => item.value).reverse(),
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

      if (chartInstance) {
        chartInstance.data = chartData;
        chartInstance.update();
      } else {
          chartInstance = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: true,
        },
        });
      } 
    };

    onMounted(() => {
      chartRef.value = document.getElementById('myChart');
      drawChart();
    });

    watchEffect(() => {
      if (chartRef.value && props.data?.length) {
        drawChart();
      }
    });

    return {};
  }
};
</script>
