import axios, { type AxiosResponse } from 'axios';

import transformPodcast from './podcast-transformer';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PODCAST_API,
});

api.interceptors.response.use((response: AxiosResponse) => {
  if (response.config.url.match(/\/podcasts/)) {
    response.data = Array.isArray(response.data)
      ? response.data.map(transformPodcast)
      : transformPodcast(response.data);
  }

  return response;
});

export default api;
