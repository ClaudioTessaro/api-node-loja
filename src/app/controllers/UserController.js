import UserService from "../service/UserService";
import User from "../models/User";

class UserController {
  createUser(req, res) {
    UserService.createUser(req, res);
  }

  updateUser(req, res) {
    UserService.updateUser(req, res);
  }

  async recuperar(req, res) {
    const user = await User.findAll();
    return res.json(user);
  }
}

export default new UserController();
