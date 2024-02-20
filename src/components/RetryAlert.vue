<template>
      <div class="row justify-content-center pt-5">
      <div class="alert alert-danger d-flex justify-content-between align-items-baseline p-3 pb-2" role="alert">
        <p>Error loading data. Please try again. </p>
        <button class="btn btn-danger" @click="retry">Retry</button>
      </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RetryAlert',
  setup(props, { emit }) {
    const retry = () => {
      emit('retry');
    };

    return {
      retry,
    };
  },
});
</script>

<style>
</style>
