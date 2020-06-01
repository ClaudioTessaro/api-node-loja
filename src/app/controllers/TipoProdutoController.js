import TipoProdutoService from "../service/TipoProdutoService";

class TipoProdutoController {
  cadastrarProduto(req, res) {
    return TipoProdutoService.cadastrarProduto(req, res);
  }

  buscarTodos(req, res) {
    return TipoProdutoService.buscarTodos(req, res);
  }

  buscarTipoPorId(req, res) {
    return TipoProdutoService.buscarTipoProdutoPorId(req, res);
  }

  atualizarTipoProduto(req, res) {
    return TipoProdutoService.atualizarProduto(req, res);
  }
}

export default new TipoProdutoController();
