<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'LineChart',
  props: {
    data: Array,
  },
  setup(props) {
    const chartInstance = ref(null); 
    const chartCanvas = ref(null);

    const drawChart = () => {
      if (!chartCanvas.value) return;

      const ctx = chartCanvas.value.getContext('2d');
      const chartData = {
        labels: props?.data?.map(item => item.date).reverse(),
        datasets: [{
          label: 'Price ($)',
          data: props?.data?.map(item => item.value).reverse(),
          fill: true,
          borderColor: '#0dcaf0',
          tension: 0.1
        }]
      };

      if (chartInstance.value) {
        chartInstance.value.data = chartData;
        chartInstance.value.update();
      } else {
          chartInstance.value = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
        },
        });
      } 
    };

    onMounted(() => {
      drawChart();
    });

     watch(() => props.data, () => {
      drawChart();
    });

    return {
      chartCanvas
    };
  }
};
</script>
