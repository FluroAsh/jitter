/**
 * DOCS:
 * - https://axios-http.com/docs
 * - https://axios-http.com/docs/interceptors
 */

// information from the backend URL
import Axios from 'axios';

const jitterAPI = Axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: 'https://jitter-api-at2022.herokuapp.com',
});

jitterAPI.interceptors.request.use((req) => {
  // send the token in the request
  const token = sessionStorage.getItem('token');

  // Authorization -> Bearer token -> paste the token
  if (token) req.headers['Authorization'] = `Bearer ${token}`;

  return req;
});

export default jitterAPI;
