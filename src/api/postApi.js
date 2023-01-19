import axios from 'axios';

const postApi = axios.create({
  baseURL: 'http://43.201.103.199/',
});

postApi.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default postApi;
