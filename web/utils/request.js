import axios from 'axios';
import { errorParser } from './error-parser';
import HTTPResponse from './http-response';

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

const BASE_URL = 'http://localhost/v1';
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json; charset=utf-8',
  },
};

export default {
  async get(url, options = {}) {
    const fn = () => axios.get(url, { ...defaultOptions, ...options });
    const response = await execute(fn);
    return response;
  },

  async post(url, body, options) {
    const fn = () => axios.post(url, body, { ...defaultOptions, ...options });
    const response = await execute(fn);
    return response;
  },

  async put(url, body, options) {
    const fn = () => axios.put(url, { ...defaultOptions, ...options });
    const response = await execute(fn);
    return response;
  },

  async delete(url, options) {
    const fn = () => axios.delete(url, { ...defaultOptions, ...options });
    const response = await execute(fn);
    return response;
  },

  async patch(url, body, options) {
    const fn = () => axios.patch(url, { ...defaultOptions, ...options });
    const response = await execute(fn);
    return response;
  },
};
