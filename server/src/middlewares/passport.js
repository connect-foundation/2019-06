import passport from 'passport';
import { Strategy } from 'passport-local';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new Strategy(
    {
      usernameField: 'id',
      passwordField: 'password',
      session: true,
      passReqToCallback: false,
    },
    async (id, password, done) => {
      let user;
      try {
        // user = await loginService.localLogin({ id, pw });
      } catch (error) {
        return done(error);
      }
      return done(null, user);
    },
  ),
);
