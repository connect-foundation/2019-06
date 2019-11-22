import App from 'next/app';
import React from 'react';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import { BASE_URL } from '../config/axios-config';
import { AppProvider } from '../contexts';

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <ThemeProvider theme={theme}>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </ThemeProvider>
      </>
    );
  }
}
