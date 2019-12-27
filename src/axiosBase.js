import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'https://base-konovalov.firebaseio.com/'
})

export default axiosBase;
