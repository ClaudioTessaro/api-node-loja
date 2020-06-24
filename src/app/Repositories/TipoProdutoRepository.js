import TipoProduto from "../models/TipoProduto";

class TipoProdutoRepository {
  async buscarTodos({ limit = 100, page = 1 }) {
    try {
      return await TipoProduto.findAll({
        attributes: ["id", "nome"],
        limit,
        offset: (page - 1) * limit,
      });
    } catch (error) {
      throw new Error("Problema na base de dados");
    }
  }

  async totalTipo() {
    try {
      return await TipoProduto.findAll({
        attributes: ["id", "nome"],
      });
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

  async deletarProduto(body) {
    try {
      return body.destroy({ truncate: true, restartIdentity: true });
    } catch (error) {
      throw new Error("Problema na base de dados. Não foi inserido");
    }
  }
}

export default new TipoProdutoRepository();
