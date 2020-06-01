import Sequelize from "sequelize";
import databaseConfig from "../config/database-config";
import User from "../models/User";
import TipoProduto from "../models/TipoProduto";
import Produto from "../models/Produto";

const models = [User, TipoProduto, Produto];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      // eslint-disable-next-line prettier/prettier
      .map(model => {
        model.init(this.connection);
        return model;
      })
      // eslint-disable-next-line prettier/prettier
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
