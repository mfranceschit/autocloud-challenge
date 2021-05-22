import passport from 'passport';
import passportJWT, { VerifiedCallback } from 'passport-jwt';
import JWTStrategy = passportJWT.Strategy;
import ExtractJWT = passportJWT.ExtractJwt;
import userModel from '@models/users.model';
import { DataStoredInToken } from '@/interfaces/auth.interface';
import config from 'config';

const authMiddleware = () => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get('secretKey'),
      },
      (token: DataStoredInToken, done: VerifiedCallback) => {
        const findUser = userModel.find(user => user.id === token.id);

        if (findUser) {
          return done(null, findUser);
        }

        return done(null, false);
      },
    ),
  );
};

export default authMiddleware;
