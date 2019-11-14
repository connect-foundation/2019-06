import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import DB from '../database';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'password',
    },
    async (id, password, done) => {
      const user = await DB.User.findOneById(id);

      if (!user) {
        return done(null, false);
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false);
      }

      const { user_id, email, name, no } = user;
      return done(null, { id: user_id, email, name, no });
    },
  ),
);

export default passport;
