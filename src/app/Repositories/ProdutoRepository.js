import { Op, Sequelize } from "sequelize";
import { parseISO } from "date-fns";
import Produto from "../models/Produto";
import TipoProduto from "../models/TipoProduto";

class ProdutoRepository {
  async cadastrarProduto({
    nome,
    marcaProduto,
    quantidade,
    valorCompra,
    tipoProduto,
    dataDaCompra,
    valorVenda,
  }) {
    try {
      return Produto.create({
        nome,
        marcaProduto,
        quantidade,
        valorCompra,
        tipoProduto,
        dataDaCompra,
        valorVenda,
      });
    } catch (error) {
      throw new Error("Problema na base de dados. Não foi inserido");
    }
  }

  async buscarProdutoPorId(id) {
    try {
      return Produto.findByPk(id);
    } catch (error) {
      throw new Error("Problema na base de dados. Não foi inserido");
    }
  }

  async deleteProduto(produto) {
    try {
      return produto.destroy({ truncate: true, restartIdentity: true });
    } catch (error) {
      throw new Error("Problema na base de dados. Não foi inserido");
    }
  }

  async buscarTodos() {
    try {
      const response = await Produto.findAll({
        include: [
          {
            model: TipoProduto,
            as: "tipo",
            attributes: ["nome"],
          },
        ],
      });

      return response;
    } catch (error) {
      throw new Error("Problema na base de dados. Não foi inserido");
    }
  }
}

export default new ProdutoRepository();
