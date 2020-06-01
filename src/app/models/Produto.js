import Sequelize, { Model } from "sequelize";

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,

        marca_produto: Sequelize.STRING,

        quantidade: Sequelize.INTEGER,

        valor_venda: Sequelize.DOUBLE,

        valor_compra: Sequelize.DOUBLE,

        data_da_compra: Sequelize.DATE,

        quantidade_estoque: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.TipoProduto, {
      foreignKey: "id_tipo_produto",
      as: "produto",
    });
  }
}

export default Produto;
