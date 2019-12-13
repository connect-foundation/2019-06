import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from '../contexts';

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
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link href="/static/date.css" rel="stylesheet" />
          <link href="/static/react-datepicker.css" rel="stylesheet" />
          <style>
            {' '}
            {`body {
              margin: 0;
              padding: 0;
            }`}
          </style>
        </Head>
        <ThemeProvider theme={theme}>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </ThemeProvider>
      </>
    );
  }
}
