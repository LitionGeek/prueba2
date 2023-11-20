import passport from "passport";
import GitHubStrategy from "passport-github";
import { generateToken } from "../utils.js";
import GoogleStrategy from "passport-google-oauth20";
import jwt from "passport-jwt";
import config from "../config/config.js";
import { userRepository } from "../services/index.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const validarUser = async (user, profile) => {
  if (user) {
    const token = generateToken(user);
    user.token = token;
    return user;
  }
  const newUser = {
    first_name: profile._json.name,
    last_name: "",
    email: profile._json.email,
    age: "",
    password: "",
    cartId: [],
    rol: "user",
  };
  const result = await userRepository.createUser(newUser);
  const token = generateToken(result);
  result.token = token;
};

const cookieExtractor = (req) =>
  req && req.cookies ? req.cookies["keyCookieForJWT"] : null;

debugger;
const initializatePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "secretForJWT",
      },
      async (jwt_payload, done) => {
        try {
          done(null, jwt_payload);
        } catch (e) {
          return done(e);
        }
      }
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_callbackURL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const email = profile._json.email;
          const user = await userRepository.getUserByEmail(email);
          const result = await validarUser(user, profile);
          return cb(null, result);
        } catch (e) {
          return cb("Error to login wuth google: " + e);
        }
      }
    )
  );
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: config.GITHUB_callbackurl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile._json.email;
          const user = await userRepository.getUserByEmail(email);
          const result = await validarUser(user, profile);
          return done(null, result);
        } catch (e) {
          return done("Error to login wuth github: " + e);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let user = await userRepository.getUserByEmail(id);
    done(null, user);
  });
};
export default initializatePassport;
