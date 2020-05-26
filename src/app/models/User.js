import Sequelize, { Model } from "sequelize";
import bycrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        admin: Sequelize.BOOLEAN,
      },
      { sequelize }
    );
    // eslint-disable-next-line prettier/prettier
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bycrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bycrypt.compare(password, this.password_hash);
  }
}

export default User;
