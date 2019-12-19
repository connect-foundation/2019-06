import axios from 'axios';
import { errorParser } from './error-parser';
import { API_SERVER } from '../config';
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

axios.defaults.withCredentials = true;

const server = axios.create({
  baseURL: API_SERVER,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json; charset=utf-8',
  },
});

export default {
  async get(url, options = {}) {
    const fn = () => server.get(url, { ...options });
    const response = await execute(fn);
    return response;
  },

  async post(url, body, options = {}) {
    const fn = () => server.post(url, body, { ...options });
    const response = await execute(fn);
    return response;
  },

  async put(url, body, options = {}) {
    const fn = () => server.put(url, body, { ...options });
    const response = await execute(fn);
    return response;
  },

  async delete(url, body, options = {}) {
    const fn = () => server.delete(url, { data: body, headers: { ...options } });
    const response = await execute(fn);
    return response;
  },

  async patch(url, body, options = {}) {
    const fn = () => server.patch(url, body, { ...options });
    const response = await execute(fn);
    return response;
  },
};
