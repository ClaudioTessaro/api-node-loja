module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("produtos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      marca_produto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quantidade_de_compra: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidade_de_estoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      valor_venda: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      valor_compra: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      lucro: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      data_da_compra: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      id_tipo_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "tipo_produtos", key: "id" },
        onUpdate: "CASCADE",
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("produtos");
  },
};
