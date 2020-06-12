import ClienteService from "../service/ClienteService";

class ClienteController {
  insereCliente(req, res) {
    return ClienteService.insereCliente(req, res);
  }

  buscarClientePorId(req, res) {
    return ClienteService.buscarClientePorId(req, res);
  }

  buscarClientes(req, res) {
    return ClienteService.buscarClientes(req, res);
  }

  atualizaCliente(req, res) {
    return ClienteService.atualizarCliente(req, res);
  }

  deletarCliente(req, res) {
    return ClienteService.deletarCliente(req, res);
  }

  buscarClientePorNomeData(req, res) {
    return ClienteService.buscarClientePorNomeData(req, res);
  }

  buscarClientePorNome(req, res) {
    return ClienteService.buscarClientePorNome(req, res);
  }
}

export default new ClienteController();
