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

  buscarPorFiltro(req, res) {
    return ProdutoService.buscarPorFiltro(req, res);
  }

  atualizarProduto(req, res) {
    return ProdutoService.atualizarProduto(req, res);
  }

  buscarTodos(req, res) {
    return ProdutoService.buscarTodos(req, res);
  }

  atualizarProdutoPorCompra(req, res) {
    return ProdutoService.atualizarProdutoPorCompra(req, res);
  }
}

export default new ProdutoController();
