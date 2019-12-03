import app from '../app';
import dbSync from './dbSync';

const { force } = process.env;
const port = process.env.PORT || 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

dbSync({ force })
  .then(() => {
    app.listen(port, () => {
      console.log('Server start');
    });
  })
  .catch(err => {
    console.log(err);
  });
