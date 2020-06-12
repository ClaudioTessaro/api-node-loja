import Sequelize, { Model } from "sequelize";

class ClienteProduto extends Model {
  static init(sequelize) {
    super.init(
      {
        idCliente: {
          type: Sequelize.INTEGER,
          field: "id_cliente",
        },
        idProduto: {
          type: Sequelize.INTEGER,
          field: "id_produto",
        },
        quantidadeDeCompra: {
          type: Sequelize.INTEGER,
          field: "quantidade_de_compra",
        },
        valorVenda: {
          type: Sequelize.FLOAT,
          field: "valor_venda",
        },
        status: {
          type: Sequelize.STRING,
          field: "status",
        },
        dataDaCompra: {
          type: Sequelize.DATE,
          field: "data_da_compra",
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cliente, {
      foreignKey: "id_cliente",
      as: "cliente",
    });
    this.belongsTo(models.Produto, {
      foreignKey: "id_produto",
      as: "produto",
    });
  }
}

export default ClienteProduto;
