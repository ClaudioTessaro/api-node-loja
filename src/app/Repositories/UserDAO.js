import User from "../models/User";

class UserDAO {
  async findUserByEmail(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  async findByPk(id) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      throw new Error("Problema na base de dados");
    }
  }

  async updateUser(body) {
    await User.update(body);
  }
}

export default new UserDAO();
