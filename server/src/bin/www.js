import app from '../app';
import dbSync from './dbSync';

const { force } = process.env;
const port = process.env.PORT || 3000;

dbSync({ force }).then(() => {
  app.listen(port, () => {
    console.log('Server start');
  });
});
