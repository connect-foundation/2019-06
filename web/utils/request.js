import axios from 'axios';

const BASE_URL = 'http://localhost/v1';

const instance = axios.create({
  baseURL: BASE_URL,
});

export default {
  async get(url) {
    let data;
    try {
      data = await instance.get(url);
    } catch (error) {
      console.log(error);
    }
    return data;
  },
  async post(url, body) {
    let data;
    try {
      data = await instance.post(url, body);
    } catch (error) {
      console.log(error);
    }
    return data;
  },
  async delete(url) {
    let data;
    try {
      data = await instance.delete(url, body);
    } catch (error) {
      console.log(error);
    }
    return data;
  },
};
