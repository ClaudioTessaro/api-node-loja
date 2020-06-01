import TipoProduto from "../models/TipoProduto";

class TipoProdutoRepository {
  async buscarTodos() {
    try {
      return await TipoProduto.findAll();
    } catch (error) {
      throw new Error("Problema na base de dados");
    }
  }

  async inserir(body) {
    try {
      return TipoProduto.create(body);
    } catch (error) {
      throw new Error("Problema na base de dados. Não foi inserido");
    }
  }

  async buscarPorPk(id) {
    try {
      return TipoProduto.findByPk(id);
    } catch (error) {
      throw new Error("Problema na base de dados. Não foi inserido");
    }
  }
}

export default new TipoProdutoRepository();
