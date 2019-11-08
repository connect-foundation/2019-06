import app from '../app';
import dbSync from './dbSync';

dbSync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log('Server start');
  });
});
