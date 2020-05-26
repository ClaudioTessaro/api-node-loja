const TipoProduto = require("../models/TipoProduto");

class TipoProdutoDAO {
  async buscarTodos() {
    try {
      const tipos = await TipoProduto.findAll({ attributes: ["id", "nome"] });
      return tipos;
    } catch (error) {
      throw new Error("Problema na base de dados");
    }
  }

  async inserir(nome) {
    try {
      return TipoProduto.create({ nome });
    } catch (error) {
      throw new Error("Problema na base de dados. Não foi inserido");
    }
  }
}
module.exports = new TipoProdutoDAO();
