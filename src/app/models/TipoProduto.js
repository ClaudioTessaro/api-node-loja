import Sequelize, { Model } from "sequelize";

class TipoProduto extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.BIGINT, primaryKey: true },
        nome: { type: Sequelize.STRING },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default TipoProduto;
