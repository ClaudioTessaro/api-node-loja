import Sequelize, { Model } from "sequelize";

class Cliente extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: { type: Sequelize.STRING, field: "nome_cliente" },
        telefone: { type: Sequelize.STRING },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Cliente;
