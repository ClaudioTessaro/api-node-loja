'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produtos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      peso: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      tipo_produto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'tipo_produtos', key: 'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('produtos');
  }
};
