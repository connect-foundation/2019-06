import app from '../app';
import dbSync from './dbSync';

const env = process.env.NODE_ENV || 'development';
const force = env === 'development';
const port = process.env.PORT || 3000;

dbSync({ force }).then(() => {
  app.listen(port, () => {
    console.log('Server start');
  });
});
