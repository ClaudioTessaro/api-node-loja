/* eslint-disable radix */
import ProdutoRepository from "../Repositories/ProdutoRepository";
import TipoProdutoRepository from "../Repositories/TipoProdutoRepository";

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
        valorPote,
        frete,
      } = req.body;

      const { tipoProduto } = req.body.tipoProduto;
      const tipo = await TipoProdutoRepository.buscarPorPk(tipoProduto);

      const quant = this.calcularQuantidadeDePotes(quantidade, tipo);
      const quantidadeDeEstoque = parseInt(quant);
      const valorVenda = this.calculaValorVendaProduto(
        quantidade,
        valorCompra,
        porcentagemLucro,
        tipo,
        valorPote,
        frete
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

  calculaValorVendaProduto(
    quantidadeDeCompra,
    valorCompra,
    porcentagemLucro,
    tipoProduto,
    valorPote,
    frete
  ) {
    const tamanhoDoPote = 120;
    let valor = 0;
    let quantidade = parseInt(quantidadeDeCompra, 10);
    if (tipoProduto.nome === "Escova") {
      valor += parseFloat(valorCompra) / quantidade;
      valor +=
        parseFloat(frete) / quantidade +
        valor * (parseFloat(porcentagemLucro) / 100);
    } else {
      if (quantidade < 1000) {
        quantidade *= 1000;
      }
      const precoPorUnidade = parseFloat(valorCompra) / quantidade;
      valor += parseFloat(valorPote) + tamanhoDoPote * precoPorUnidade;
      valor += parseFloat(frete) + valor * (parseFloat(porcentagemLucro) / 100);
    }

    return valor;
  }

  calcularQuantidadeDePotes(quantidade, tipoProduto) {
    let quantidadeDePotes = 0;
    if (tipoProduto.nome !== "Escova") {
      const tamanhoDoPote = 120;
      if (quantidade < 1000) {
        quantidade *= 1000;
      }
      const unidade = parseInt(quantidade, 10);
      quantidadeDePotes += parseInt(unidade, 10) / tamanhoDoPote;
    } else {
      quantidadeDePotes += quantidade;
    }

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
        porcentagemLucro,
        dataDaCompra,
        valorPote,
        frete,
      } = req.body;

      const { tipoProduto } = req.body.tipoProduto;

      const produto = await ProdutoRepository.buscarProdutoPorId(req.params.id);

      const tipo = await TipoProdutoRepository.buscarPorPk(tipoProduto);

      const quant = this.calcularQuantidadeDePotes(quantidade, tipo);
      const quantidadeDeEstoque = parseInt(quant);
      const valorVenda = this.calculaValorVendaProduto(
        quantidade,
        valorCompra,
        porcentagemLucro,
        tipo,
        valorPote,
        frete
      );

      const response = await produto.update({
        nome,
        marcaProduto,
        quantidade,
        valorCompra,
        tipoProduto,
        dataDaCompra,
        valorVenda,
        quantidadeDeEstoque,
      });
      return res.status(200).json(response);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }
}

export default new ProdutoService();
