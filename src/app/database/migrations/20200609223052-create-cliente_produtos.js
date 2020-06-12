module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("cliente_produtos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quantidade_de_compra: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      valor_venda: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_da_compra: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "produtos", key: "id" },
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "clientes", key: "id" },
        onDelete: "CASCADE",
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
    return queryInterface.dropTable("cliente_produtos");
  },
};
