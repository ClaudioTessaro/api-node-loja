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
      throw res.status(400).json({ message: error.message });
    }
  }

  async buscarVendaPorIdCliente(req, res) {
    try {
      const response = await ClienteProdutoRepository.buscarPorIdCliente(
        req.params.id
      );
      return res.status(200).json(response);
    } catch (error) {
      throw res.status(400).json({ message: error.message });
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

  async deletaVendaPorId(req, res) {
    try {
      const venda = await ClienteProdutoRepository.buscarVendaPorId(
        req.params.id
      );
      this.atualizarEstoqueQuandoDeletado(
        venda.quantidadeDeCompra,
        venda.idProduto
      );
      await ClienteProdutoRepository.deletarVenda(venda);
      return res.status(200).json({ message: `Venda deletada com sucesso` });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async atualizarEstoqueQuandoDeletado(quantidade, idProduto) {
    const produto = await ProdutoRepository.buscarProdutoPorId(idProduto);
    const quantidadeDeEstoque =
      parseInt(produto.quantidadeDeEstoque, 10) + parseInt(quantidade, 10);
    await produto.update({ quantidadeDeEstoque });
  }
}

export default new ClienteProdutoService();
