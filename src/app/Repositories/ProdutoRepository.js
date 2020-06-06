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

  async buscarTodos({ dataFim, dataInicio, nome, tipoProduto }) {
    try {
      const filtro = [];
      if (nome !== undefined) {
        filtro.push({
          nome: {
            [Op.like]: `%${nome}%`,
          },
        });
      }
      if (tipoProduto !== undefined) {
        filtro.push({
          id_tipo_produto: tipoProduto,
        });
      }
      if (dataInicio !== undefined && dataFim !== undefined) {
        const fim = parseISO(dataFim);
        const inicio = parseISO(dataInicio);
        filtro.push({
          data_da_compra: {
            [Op.between]: [startOfDay(inicio), endOfDay(fim)],
          },
        });
      }
      console.log(filtro);
      const response = await Produto.findAll({
        where: filtro,
        include: [
          {
            model: TipoProduto,
            as: "tipo",
            attributes: ["nome"],
          },
        ],
        order: ["nome"],
      });

      return response;
    } catch (error) {
      throw new Error("Problema na base de dados. Não foi inserido");
    }
  }
}

export default new ProdutoRepository();
