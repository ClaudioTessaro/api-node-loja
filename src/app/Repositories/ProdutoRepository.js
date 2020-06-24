import { Op } from "sequelize";
import { parseISO, startOfDay, endOfDay } from "date-fns";
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
    quantidadeDeEstoque,
    porcentagemLucro,
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
        quantidadeDeEstoque,
        porcentagemLucro,
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

  async buscarTodos({ dataFim, dataInicio, nome, tipo, limit, page }) {
    try {
      const filtro = [];
      if (nome) {
        filtro.push({
          nome: {
            [Op.like]: `%${nome}%`,
          },
        });
      }
      if (tipo) {
        filtro.push({
          id_tipo_produto: tipo,
        });
      }
      if (
        dataInicio !== undefined &&
        dataInicio &&
        dataFim !== undefined &&
        dataFim
      ) {
        const fim = parseISO(dataFim);
        const inicio = parseISO(dataInicio);
        filtro.push({
          data_da_compra: {
            [Op.between]: [startOfDay(inicio), endOfDay(fim)],
          },
        });
      }

      const response = await Produto.findAll({
        where: filtro,
        include: [
          {
            model: TipoProduto,
            as: "tipo",
            attributes: ["nome"],
          },
        ],
        order: ["data_da_compra"],
        limit,
        offset: (page - 1) * limit,
      });
      const produtos = await Produto.findAll({
        where: filtro,
        include: [
          {
            model: TipoProduto,
            as: "tipo",
            attributes: ["nome"],
          },
        ],
      });
      return { response, produtos };
    } catch (error) {
      throw new Error("Problema na base de dados. Não foi inserido");
    }
  }

  async buscarTodosProdutos() {
    try {
      return await Produto.findAll({
        include: [
          {
            model: TipoProduto,
            as: "tipo",
            attributes: ["nome"],
          },
        ],
        order: ["nome"],
      });
    } catch (error) {
      throw new Error("Problema na base de dados. Não foi inserido");
    }
  }

  async buscarProdutoPorNome(nome) {
    try {
      return await Produto.findOne({ where: { nome } });
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }

  async verificarSeExisteVinculoComProduto(tipoProduto) {
    const response = await Produto.findOne({ where: { tipoProduto } });
    return response;
  }
}

export default new ProdutoRepository();
