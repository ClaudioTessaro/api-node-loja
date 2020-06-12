import ClienteProdutoRepository from "../Repositories/ClienteProdutoRepository";
import ProdutoRepository from "../Repositories/ProdutoRepository";
import ClienteRepository from "../Repositories/ClienteRepository";

class ClienteProdutoService {
  async insereVenda(req, res) {
    try {
      const {
        quantidadeDeCompra,
        dataCompra,
        status,
        nomeCliente,
        nomeProduto,
      } = req.body;

      const cliente = await ClienteRepository.buscarClientePorNome(nomeCliente);
      const idCliente = cliente.id;
      const produto = await ProdutoRepository.buscarProdutoPorNome(nomeProduto);
      const idProduto = produto.id;
      await this.atualizaQuantidadeEstoque(quantidadeDeCompra, idProduto);
      const valorVenda = parseInt(quantidadeDeCompra, 10) * produto.valorVenda;
      ClienteProdutoRepository.inserirCompra({
        quantidadeDeCompra,
        dataCompra,
        status,
        idCliente,
        idProduto,
        valorVenda,
      });

      return res.status(200).json({
        message: "Venda inserida com sucesso",
      });
    } catch (error) {
      throw res.status(400).json({ error: error.message });
    }
  }

  async buscarVendaPorIdCliente(req, res) {
    try {
      const response = await ClienteProdutoRepository.buscarPorIdCliente(
        req.params.id
      );
      return res.status(200).json(response);
    } catch (error) {
      throw res.status(400).json({ error: error.message });
    }
  }

  async atualizaQuantidadeEstoque(quantidade, idProduto) {
    const produto = await ProdutoRepository.buscarProdutoPorId(idProduto);
    if (produto.quantidadeDeEstoque < quantidade) {
      throw new Error(
        `A quantidade do produto ${produto.nome} é menor do que a quantidade que possui no estoque`
      );
    }
    const quantidadeDeEstoque =
      parseInt(produto.quantidadeDeEstoque, 10) - parseInt(quantidade, 10);
    await produto.update({ quantidadeDeEstoque });
  }
}

export default new ClienteProdutoService();
