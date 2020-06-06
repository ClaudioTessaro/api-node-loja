import ProdutoService from "../service/ProdutoService";

class ProdutoController {
  cadastrar(req, res) {
    return ProdutoService.cadastrarProduto(req, res);
  }

  buscarPorId(req, res) {
    return ProdutoService.buscarProdutoPorId(req, res);
  }

  deletarPorId(req, res) {
    return ProdutoService.deletarProdutoPorId(req, res);
  }

  buscarPorParametros(req, res) {
    return ProdutoService.buscarTodos(req, res);
  }

  atualizarProduto(req, res) {
    return ProdutoService.atualizarProduto(req, res);
  }
}

export default new ProdutoController();
