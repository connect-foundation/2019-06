import passport from 'passport';
import { Strategy } from 'passport-local';

passport.use(
  new Strategy(
    {
      usernameField: 'id',
      passwordField: 'pw',
      session: true,
      passReqToCallback: false,
    },
    async (id, pw, done) => {
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
