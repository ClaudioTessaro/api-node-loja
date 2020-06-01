import jwt from "jsonwebtoken";

import UserDAO from "../Repositories/UserRepository";
import UserService from "./UserService";

import authConfig from "../config/auth";

class SessionService {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await UserDAO.findUserByEmail(email);
      UserService.checkUserExist(user, res);

      const valido = await user.checkPassword(password);

      if (!valido) {
        throw res.status(401).json({ error: "Password invalido" });
      }

      const { id, name, admin } = user;

      return res.json({
        user: {
          id,
          name,
          email,
          admin,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      throw Error(err);
    }
  }
}

export default new SessionService();
