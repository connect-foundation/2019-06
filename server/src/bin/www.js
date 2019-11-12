import app from '../app';
import dbSync from './dbSync';

const env = process.env.NODE_ENV || 'development';
const force = env === 'development';

dbSync({ force }).then(() => {
  app.listen(3000, () => {
    console.log('Server start');
  });
});
