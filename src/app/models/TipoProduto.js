import Sequelize, { Model } from "sequelize";

class TipoProduto extends Model {
  static init(sequelize) {
    super.init(
      {
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
