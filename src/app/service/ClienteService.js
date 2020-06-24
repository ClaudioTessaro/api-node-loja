import ClienteRepository from "../Repositories/ClienteRepository";
import ClienteProdutoRepository from "../Repositories/ClienteProdutoRepository";

class ClienteService {
  async insereCliente(req, res) {
    try {
      const response = await ClienteRepository.insereCliente(req.body);
      return res
        .status(200)
        .json({ response, message: "Cliente Cadastrado com sucesso" });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async buscarClientePorId(req, res) {
    try {
      const { id, nome, telefone } = await ClienteRepository.buscarClientePorId(
        req.params.id
      );
      return res.status(200).json({ id, nome, telefone });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async buscarClientePorNomeData(req, res) {
    try {
      const cliente = await ClienteProdutoRepository.buscarClientePorNomeData(
        req.params.nomeCliente,
        req.params.dataCompra
      );

      return res.status(200).json(cliente);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async buscarClientes(req, res) {
    try {
      const { limit, page } = req.query;
      const response = await ClienteRepository.buscarClientes({ limit, page });
      const reponseTotal = await ClienteRepository.totalClientes();
      res.setHeader("X-Total-Count", reponseTotal.length);
      res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
      return res.status(200).json(response);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async deletarCliente(req, res) {
    try {
      const cliente = await ClienteRepository.buscarClientePorId(req.params.id);
      await ClienteRepository.deletarCliente(cliente);
      return res
        .status(200)
        .json({ message: `${cliente.nome} deletado com sucesso` });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async atualizarCliente(req, res) {
    try {
      const clienteAtualiza = req.body;

      const cliente = await ClienteRepository.buscarClientePorId(req.params.id);
      await cliente.update(clienteAtualiza);
      return res
        .status(200)
        .json({ message: `${cliente.nome} atualizado com sucesso` });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async buscarClientePorNome(req, res) {
    try {
      const cliente = await ClienteRepository.buscarClienteClientePorNome(
        req.params.nomeCliente
      );
      return res.status(200).json(cliente);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }
}

export default new ClienteService();
