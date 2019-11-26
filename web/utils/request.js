import axios from 'axios';
import { errorParser } from './error-parser';
import HTTPResponse from './http-response';

const BASE_URL = 'http://localhost/v1';

const instance = axios.create({
  baseURL: BASE_URL,
});

const execute = async fn => {
  let response;

  try {
    const { data } = await fn();
    response = new HTTPResponse(false, data);
  } catch (err) {
    const error = errorParser(err);
    response = new HTTPResponse(true, error);
  }
  return response;
};

export default {
  async get(url) {
    const fn = () => instance.get(url);
    const response = await execute(fn);
    return response;
  },

  async post(url, body) {
    const fn = () => instance.post(url, body);
    const response = await execute(fn);
    return response;
  },

  async put(url, body) {
    const fn = () => instance.put(url, body);
    const response = await execute(fn);
    return response;
  },

  async delete(url) {
    const fn = () => instance.delete(url);
    const response = await execute(fn);
    return response;
  },

  async patch(url, body) {
    const fn = () => instance.patch(url, body);
    const response = await execute(fn);
    return response;
  },
};
