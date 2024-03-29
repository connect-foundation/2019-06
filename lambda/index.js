require("dotenv").config();

const axios = require("axios");

const { API_SERVER_URL, ADMIN_KEY } = process.env;

axios.defaults.baseURL = API_SERVER_URL;

const main = () => {
  return new Promise((resolve, reject) => {
    axios
      .post("/admin/mail", {
        key: ADMIN_KEY
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

exports.main = main;
