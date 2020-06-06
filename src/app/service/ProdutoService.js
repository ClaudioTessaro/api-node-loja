import ProdutoRepository from "../Repositories/ProdutoRepository";

class ProdutoService {
  async buscarTodos(req, res) {
    try {
      const { dataFim, dataInicio, nome, tipoProduto } = req.query;

      const produtos = await ProdutoRepository.buscarTodos({
        dataFim,
        dataInicio,
        nome,
        tipoProduto,
      });
      return res.status(200).json(produtos);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async cadastrarProduto(req, res) {
    try {
      const {
        nome,
        marcaProduto,
        quantidade,
        valorCompra,
        porcentagemLucro,
        dataDaCompra,
      } = req.body;

      const { tipoProduto } = req.body.tipoProduto;

      const valorVenda = this.calculaValorVendaProduto(
        valorCompra,
        porcentagemLucro
      );

      const response = await ProdutoRepository.cadastrarProduto({
        nome,
        marcaProduto,
        quantidade,
        valorCompra,
        tipoProduto,
        dataDaCompra,
        valorVenda,
      });
      return res.status(200).json(response);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  calculaValorVendaProduto(valorCompra, porcentagemLucro) {
    return (
      parseFloat(valorCompra) +
      parseFloat(valorCompra) * (parseInt(porcentagemLucro, 10) / 100)
    );
  }

  async buscarProdutoPorId(req, res) {
    try {
      const response = await ProdutoRepository.buscarProdutoPorId(
        req.params.id
      );
      return res.status(200).json(response);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async deletarProdutoPorId(req, res) {
    try {
      const produto = await ProdutoRepository.buscarProdutoPorId(req.params.id);
      await ProdutoRepository.deleteProduto(produto);
      return res.status(200).json({ message: "Deletado com sucesso" });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async atualizarProduto(req, res) {
    try {
      const {
        nome,
        marcaProduto,
        quantidade,
        valorCompra,

        dataDaCompra,
        valorVenda,
      } = req.body;

      const { tipoProduto } = req.body.tipoProduto;

      const produto = await ProdutoRepository.buscarProdutoPorId(req.params.id);
      const response = await produto.update({
        nome,
        marcaProduto,
        quantidade,
        valorCompra,
        tipoProduto,
        dataDaCompra,
        valorVenda,
      });
      return res.status(200).json(response);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }
}

export default new ProdutoService();
