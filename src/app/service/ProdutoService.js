/* eslint-disable radix */
import ProdutoRepository from "../Repositories/ProdutoRepository";

class ProdutoService {
  async buscarPorFiltro(req, res) {
    try {
      const { dataFim, dataInicio, nome, tipo } = req.query;
      const produtos = await ProdutoRepository.buscarTodos({
        dataFim,
        dataInicio,
        nome,
        tipo,
      });
      return res.status(200).json(produtos);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async buscarTodos(req, res) {
    try {
      const produtos = await ProdutoRepository.buscarTodosProdutos();
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

      const quant = this.calcularQuantidadeDePotes(quantidade);
      const quantidadeDeEstoque = parseInt(quant);
      const valorVenda = this.calculaValorVendaProduto(
        quantidade,
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
        quantidadeDeEstoque,
      });
      return res.status(200).json({ response });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  calculaValorVendaProduto(quantidadeDeCompra, valorCompra, porcentagemLucro) {
    const tamanhoDoPote = 120;
    let quantidade = parseInt(quantidadeDeCompra, 10);
    if (quantidade < 1000) {
      quantidade *= 1000;
    }
    const precoPorUnidade = parseFloat(valorCompra) / quantidade;
    const valor = tamanhoDoPote * precoPorUnidade;

    return valor + valor * (parseFloat(porcentagemLucro) / 100);
  }

  calcularQuantidadeDePotes(quantidade) {
    const tamanhoDoPote = 120;
    let unidade = parseInt(quantidade, 10) / 1000;
    let quantidadeDePotes = 0;
    if (unidade < 1) {
      unidade = quantidade * 1000;
    }
    quantidadeDePotes += parseInt(unidade, 10) / tamanhoDoPote;

    return quantidadeDePotes;
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
