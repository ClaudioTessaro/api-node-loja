import ClienteProdutoService from "../service/ClienteProdutoService";

class ClienteProdutoController {
  insereVenda(req, res) {
    return ClienteProdutoService.insereVenda(req, res);
  }

  buscarVendaPorIdCliente(req, res) {
    return ClienteProdutoService.buscarVendaPorIdCliente(req, res);
  }
}

export default new ClienteProdutoController();
