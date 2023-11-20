import { sessionRepository } from "../services/index.js";
import { generateToken } from "../utils.js";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";

export const loginUser = async (req, res) => {
  try {
    const user = await sessionRepository.loginUser(req.body);
    if (user == null) {
      req.logger.error("Error al loguear el usuario");
      return res.redirect("/login");
    }
    const access_token = generateToken(user);
    res
      .cookie("keyCookieForJWT", (user.token = access_token), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      })
      .render("profile", user);
  } catch (error) {
    req.logger.fatal("Error al loguear el usuario");
    res.status(500).json({ error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const user = await sessionRepository.registerUser(req.body);
    req.logger.info("Usuario registrado");
    res.redirect("/api/session/login");
  } catch (error) {
    req.logger.fatal("Error al registrar el usuario");
    res.status(500).json({ error: error.message });
  }
};

export const getUserCurrent = async (req, res) => {
  try {
    const user = await sessionRepository.getUserCurrent(req.user.user);
    req.logger.info("Usuario obtenido");
    return res.send({ status: "success", payload: user });
  } catch (error) {
    req.logger.fatal("Error al obtener el usuario");
    res.status(500).json({ error: error.message });
  }
};

export const verificarUser = async (req, res) => {
  try {
    const token = req.params.token;
    jwt.verify(token, "secret", async (err, decoded) => {
      if (err) {
        req.logger.fatal("Token de verificacion no válido");
        res.status(500).json({ message: "Token de verificacion no válido" });
      }
      await sessionRepository.verificarUser(decoded);
      res.render("verificar", {});
    });
  } catch (error) {
    req.logger.fatal("Error al verificar el usuario");
    res.status(500).json({ error: error.message });
  }
};

export const resetearPassword = async (req, res) => {
  try {
    res.render("resetearPassword", {});
  } catch (error) {
    req.logger.fatal("Error al resetear la contraseña");
    res.status(500).json({ error: error.message });
  }
};

export const restart = async (req, res) => {
  const email = req.body.email;
  await sessionRepository.validUserSentEmailPassword(email);
  Swal.fire({
    title: "Correo enviado",
    text: "Correo enviado con las instrucciones para restablecer la contraseña",
    icon: "success",
  });
  res.send({
    status: "success",
    message: "Email enviado con las instrucciones para cambiar la contraseña",
  });
};

export const resetPasswordForm = async (req, res) => {
  const token = req.params.token;
  jwt.verify(token, "secret", async (err, decoded) => {
    if (err) {
      req.logger.fatal("Token de verificacion no válido");
      res.status(500).render("resetearPassword");
    }
    res.status(200).render("formReset");
  });
};

export const validPassword = async (req, res) => {
  try {
    const password = req.body.newPassword;
    const email = req.body.email;
    const confirmpassword = req.body.confirmPassword;
    await sessionRepository.resetPasswordForm(email, password, confirmpassword);
    res.render("login", {});
  } catch (error) {
    req.logger.fatal("Error al validar la contraseña");
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  const { user } = req.user;
  const userDB = await sessionRepository.getUserByEmail(user.email);
  res.status(200).render("profile", userDB);
};
