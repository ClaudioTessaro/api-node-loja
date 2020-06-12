import { Op } from "sequelize";
import Cliente from "../models/Cliente";

class ClienteRepository {
  async insereCliente(body) {
    try {
      return await Cliente.create(body);
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }

  async buscarClientePorId(id) {
    try {
      return await Cliente.findByPk(id);
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }

  async buscarClientePorNome(nome) {
    try {
      return await Cliente.findOne({
        where: {
          nome,
        },
      });
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }

  async buscarClienteClientePorNome(nome) {
    try {
      return await Cliente.findAll({
        where: {
          nome: {
            [Op.like]: `%${nome}%`,
          },
        },
      });
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }

  async buscarClientes() {
    try {
      return await Cliente.findAll({ attributes: ["id", "nome", "telefone"] });
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }

  async atualizarCliente(body) {
    try {
      return await Cliente.update(body);
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }

  async deletarCliente(body) {
    try {
      return await body.destroy({ truncate: true, restartIdentity: true });
    } catch (err) {
      throw new Error("Problema na base de dados");
    }
  }
}

export default new ClienteRepository();
