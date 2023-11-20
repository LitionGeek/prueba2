import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { userRepository } from "../services/index.js";

export const userPremium = async (req, res) => {
  try {
    const id = req.params.uid;
    const user = await userRepository.getUserById(id);
    if (user) {
      if (user.rol === "admin") {
        CustomError.createError({
          message: "No authorized",
          code: EErrors.USER_NOT_AUTHORIZED,
          status: 401,
          info: generateCartErrorInfo({ pid }),
        });
      }
      if (user.rol === "user") {
        user.rol = "premium";
        await userRepository.updateUser(user._id, user);
        return res.render("profile", user);
      }
      user.rol = "user";
      await userRepository.updateUser(user._id, user);
      return res.render("profile", user);
    } else {
      CustomError.createError({
        message: "User not found",
        code: EErrors.USER_NOT_EXISTS,
        status: 404,
        info: generateCartErrorInfo({ pid }),
      });
    }
  } catch (error) {
    req.logger.fatal("Error al cambiar a usuario premium");
    res.status(500).json({ error: error.message });
  }
};
