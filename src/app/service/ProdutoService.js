/* eslint-disable no-unneeded-ternary */
/* eslint-disable radix */
import ProdutoRepository from "../Repositories/ProdutoRepository";
import TipoProdutoRepository from "../Repositories/TipoProdutoRepository";
import UtilService from "./UtilService";

class ProdutoService {
  async buscarPorFiltro(req, res) {
    try {
      const { dataFim, dataInicio, nome, tipo, limit, page } = req.query;
      const { response, produtos } = await ProdutoRepository.buscarTodos(
        {
          dataFim,
          dataInicio,
          nome,
          tipo,
          limit,
          page,
        },
        res
      );
      res.setHeader("X-Total-Count", produtos.length);
      res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
      UtilService.consultarSeExisteRetorno(response);
      return res.status(200).json(response);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async buscarTodos(req, res) {
    try {
      const produtos = await ProdutoRepository.buscarTodosProdutos();
      UtilService.consultarSeExisteRetorno(produtos);
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
        porcentagemDeLucro,
        dataDaCompra,
        valorPote,
        frete,
        valorDaVenda,
      } = req.body;

      const { tipoProduto } = req.body.tipoProduto;
      const tipo = await TipoProdutoRepository.buscarPorPk(tipoProduto);

      const quant = this.calcularQuantidadeDePotes(quantidade, tipo);
      const quantidadeDeEstoque = parseInt(quant);

      const valorVenda = valorDaVenda
        ? valorDaVenda
        : this.calculaValorVendaProduto(
            quantidade,
            valorCompra,
            porcentagemDeLucro,
            tipo,
            valorPote,
            frete
          );
      const porcentagemLucro = porcentagemDeLucro
        ? porcentagemDeLucro
        : this.calcularPorcentagemDeLucro(valorCompra, valorVenda, quantidade);

      const response = await ProdutoRepository.cadastrarProduto({
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
      return res
        .status(200)
        .json({ response, message: `${nome} inserido com sucesso` });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  calcularPorcentagemDeLucro(valorCompra, valorVenda, quantidade) {
    return parseFloat(
      ((parseFloat(valorVenda) - parseFloat(valorCompra / quantidade)) /
        parseFloat(valorCompra / quantidade)) *
        100
    ).toFixed(2);
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
    if (tipoProduto.nome !== "Oleo Vegetal") {
      const valorFrete = frete !== "" ? frete : 0.001;
      valor += parseFloat(valorCompra) / quantidade;
      valor +=
        parseFloat(valorFrete) / quantidade +
        valor * (parseFloat(porcentagemLucro) / 100);
    } else {
      const valorFrete = frete !== "" ? frete : 1;
      if (quantidade < 1000) {
        quantidade *= 1000;
      }
      const precoPorUnidade = parseFloat(valorCompra) / quantidade;
      valor += parseFloat(valorPote) + tamanhoDoPote * precoPorUnidade;
      valor +=
        parseFloat(valorFrete) + valor * (parseFloat(porcentagemLucro) / 100);
    }

    return parseFloat(valor).toFixed(2);
  }

  calcularQuantidadeDePotes(quantidade, tipoProduto) {
    let quantidadeDePotes = 0;
    if (tipoProduto.nome === "Oleo Vegetal") {
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
      UtilService.consultarSeExisteRetorno(response);
      return res.status(200).json(response);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async deletarProdutoPorId(req, res) {
    try {
      const produto = await ProdutoRepository.buscarProdutoPorId(req.params.id);
      UtilService.consultarSeExisteRetorno(produto);
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
        porcentagemDeLucro,
        dataDaCompra,
        valorPote,
        frete,
        valorDaVenda,
      } = req.body;

      const { tipoProduto } = req.body.tipoProduto;

      const produto = await ProdutoRepository.buscarProdutoPorId(req.params.id);

      const tipo = await TipoProdutoRepository.buscarPorPk(tipoProduto);

      const quant = this.calcularQuantidadeDePotes(quantidade, tipo);
      const quantidadeDeEstoque = parseInt(quant);
      const valorVenda =
        valorDaVenda.toString() !== produto.valorVenda.toString()
          ? valorDaVenda
          : this.calculaValorVendaProduto(
              quantidade,
              valorCompra,
              porcentagemDeLucro,
              tipo,
              valorPote,
              frete
            );
      const porcentagemLucro =
        porcentagemDeLucro.toString() !== produto.porcentagemLucro.toString()
          ? porcentagemDeLucro
          : this.calcularPorcentagemDeLucro(
              valorCompra,
              valorVenda,
              quantidade
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
        porcentagemLucro,
      });
      return res
        .status(200)
        .json({ response, message: `${nome} atualizado com sucesso` });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async atualizarProdutoPorCompra(req, res) {
    try {
      const nome = req.params.nomeProduto;
      const { quantidadeDeCompra, dataCompra } = req.body;
      const dataDaCompra = dataCompra;
      const responseProduto = await ProdutoRepository.buscarProdutoPorNome(
        nome
      );
      const tipo = await TipoProdutoRepository.buscarPorPk(
        responseProduto.tipoProduto
      );

      const quantidade = this.atualizaQuantidadeProdutoPelaCompra(
        responseProduto,
        quantidadeDeCompra
      );
      const quantidadeDeEstoque = this.atualizaQuantidadeEstoquePelaCompra(
        responseProduto,
        quantidadeDeCompra,
        tipo
      );
      const response = await responseProduto.update({
        dataDaCompra,
        quantidade,
        quantidadeDeEstoque,
      });
      return res.status(200).json({
        response,
        message: `Estoque de ${nome} atualizado com sucesso`,
      });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  atualizaQuantidadeProdutoPelaCompra(responseProduto, quantidadeDeCompra) {
    return parseInt(quantidadeDeCompra) + parseInt(responseProduto.quantidade);
  }

  atualizaQuantidadeEstoquePelaCompra(
    responseProduto,
    quantidadeDeCompra,
    tipo
  ) {
    let quantidadeEstoque = 0;
    if (tipo.nome === "Oleo Vegetal") {
      const tamanhoDoPote = 120;
      if (quantidadeDeCompra < 1000) {
        quantidadeDeCompra *= 1000;
      }
      const unidade = parseInt(quantidadeDeCompra, 10);
      quantidadeEstoque =
        responseProduto.quantidadeDeEstoque +
        parseInt(unidade, 10) / tamanhoDoPote;
    } else {
      quantidadeEstoque =
        parseInt(quantidadeDeCompra) +
        parseInt(responseProduto.quantidadeDeEstoque);
    }

    return parseInt(quantidadeEstoque);
  }
}

export default new ProdutoService();
