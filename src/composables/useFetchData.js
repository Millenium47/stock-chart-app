import { ref } from 'vue';
import axios from 'axios';

export function useFetchData(apiUrl) {
  const data = ref(null);
  const isLoading = ref(false);
  const isError = ref(null);

  const fetchData = async () => {
    isLoading.value = true;
    isError.value = null;
    try {
      const response = await axios.get(apiUrl.value);
      data.value = response.data;
    } catch (err) {
      isError.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, isError, fetchData };
}
