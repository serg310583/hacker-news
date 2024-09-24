import axios from 'axios';

export const baseApi = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
