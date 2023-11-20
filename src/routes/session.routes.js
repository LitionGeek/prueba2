import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUserCurrent,
  verificarUser,
  resetearPassword,
  resetPasswordForm,
  restart,
  validPassword,
  getProfile,
} from "../controllers/session.controllers.js";
import passport from "passport";
const router = Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/login", (req, res) => {
  if (Object.keys(req.cookies).length != 0) return res.redirect("/profile");
  res.render("login", {});
});

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("keyCookieForJWT").redirect("/api/session/login");
  }
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);

router.get("/verify/:token", verificarUser);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getUserCurrent
);

router.get("/resetPassword", resetearPassword);

router.post("/restart", restart);

router.get("/resetPasswordForm/:token", resetPasswordForm);

router.post("/validPassword", validPassword);

export default router;
