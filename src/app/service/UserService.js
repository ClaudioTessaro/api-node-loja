import UserDAO from "../Repositories/UserDAO";
import User from "../models/User";

class UserService {
  async createUser(req, res) {
    this.checkUsers(req, res);
    const { id, name, email, admin } = await User.create(req.body);
    return res.json({ id, name, email, admin });
  }

  updateUser(req, res) {
    const { email, oldPassword } = req.body;
    const user = UserDAO.findByPk(req.id);
    if (email !== user.email) {
      this.checkUsers(req, res);
    }
    this.checkPasswordExist(oldPassword, user, res);
    const { id, name, admin } = UserDAO.updateUser(req.body);
    return res.json({ id, name, email, admin });
  }

  async checkUsers(req, res) {
    const user = await UserDAO.findUserByEmail(req.body.email);
    if (user) {
      throw res.status(400).json({ error: "E-mail de usuario já cadastrado" });
    }
  }

  async checkPasswordExist(oldPassword, user, res) {
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw res.status(401).json({ error: "Password não confere" });
    }
  }

  checkUserExist(user, res) {
    if (!user) {
      throw res.status(401).json({ error: "Usario não encontrado" });
    }
  }
}

export default new UserService();
