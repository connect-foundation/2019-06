// next.config.js
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');

module.exports = withImages(withCSS());
