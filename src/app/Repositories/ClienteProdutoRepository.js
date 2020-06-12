import ClienteProduto from "../models/ClienteProduto";
import Produto from "../models/Produto";
import Cliente from "../models/Cliente";

class ClienteProdutoRepository {
  async inserirCompra(body) {
    try {
      const {
        quantidadeDeCompra,
        dataCompra,
        status,
        idCliente,
        idProduto,
        valorVenda,
      } = body;
      const dataDaCompra = `${dataCompra} 00:00:00`;
      return await ClienteProduto.create({
        quantidadeDeCompra,
        dataDaCompra,
        status,
        idCliente,
        idProduto,
        valorVenda,
      });
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }

  async buscarPorIdCliente(idCliente) {
    try {
      return await ClienteProduto.findAll({
        where: {
          idCliente,
        },
        include: [
          {
            model: Cliente,
            as: "cliente",
            attributes: ["nome"],
          },
          { model: Produto, as: "produto", attributes: ["nome"] },
        ],
        order: ["dataDaCompra"],
      });
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }

  async buscarClientePorNomeData(nome, data) {
    try {
      const dataDaCompra = `${data} 00:00:00`;
      return await ClienteProduto.findAll({
        where: { dataDaCompra },
        include: [
          {
            model: Cliente,
            as: "cliente",
            where: { nome },
          },
          {
            model: Produto,
            as: "produto",
            attributes: ["nome"],
          },
        ],
      });
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }

  async buscarVendaPorId(id) {
    try {
      return await ClienteProduto.findByPk(id);
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }

  async deletarVenda(body) {
    try {
      return await body.destroy({ truncate: true, restartIdentity: true });
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }
}

export default new ClienteProdutoRepository();
