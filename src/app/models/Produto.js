import Sequelize, { Model } from "sequelize";

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,

        marcaProduto: { type: Sequelize.STRING, field: "marca_produto" },

        quantidade: { type: Sequelize.INTEGER, field: "quantidade_de_compra" },

        quantidadeDeEstoque: {
          type: Sequelize.INTEGER,
          field: "quantidade_de_estoque",
        },

        valorVenda: { type: Sequelize.DOUBLE, field: "valor_venda" },

        valorCompra: { type: Sequelize.DOUBLE, field: "valor_compra" },

        dataDaCompra: { type: Sequelize.DATE, field: "data_da_compra" },

        tipoProduto: { type: Sequelize.INTEGER, field: "id_tipo_produto" },
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
      as: "tipo",
    });
  }
}

export default Produto;
