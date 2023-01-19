import axios from 'axios';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/photos/random',
  headers: { Authorization: 'Client-ID 1eN_29BT8sX_Ixgn7-T5KZnRM5EAI8m8aOgl5q2eul8' },
});

unsplashApi.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default unsplashApi;
