import TipoProdutoRepository from "../Repositories/TipoProdutoRepository";
import ProdutoRepository from "../Repositories/ProdutoRepository";

class TipoProdutoService {
  async cadastrarProduto(req, res) {
    try {
      const tipoProduto = req.body;
      const { id, nome } = await TipoProdutoRepository.inserir(tipoProduto);
      return res
        .status(200)
        .json({ id, nome, message: `${nome} cadastrado com sucesso` });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async buscarTodos(req, res) {
    try {
      const { limit, page } = req.query;
      const response = await TipoProdutoRepository.buscarTodos({ limit, page });
      const tipoProduto = await TipoProdutoRepository.totalTipo();
      res.setHeader("X-Total-Count", tipoProduto.length);
      res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
      return res.json(response);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async atualizarProduto(req, res) {
    try {
      const idProduto = req.params.id;
      const tipoProduto = await TipoProdutoRepository.buscarPorPk(idProduto);
      this.validarTipoProduto(tipoProduto);
      const { id, nome } = await tipoProduto.update(req.body);
      return res
        .status(200)
        .json({ id, nome, message: `${nome} atualizado com sucesso` });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async buscarTipoProdutoPorId(req, res) {
    try {
      const tipoProduto = await TipoProdutoRepository.buscarPorPk(
        req.params.id
      );
      this.validarTipoProduto(tipoProduto);
      return res.status(200).json(tipoProduto);
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  validarTipoProduto(tipoProduto) {
    if (tipoProduto === null) {
      throw new Error("O tipo de produto não existe");
    }
  }

  async deletarProduto(req, res) {
    try {
      const tipoProduto = await TipoProdutoRepository.buscarPorPk(
        req.params.id
      );
      this.validarTipoProduto(tipoProduto);
      const response = await ProdutoRepository.verificarSeExisteVinculoComProduto(
        tipoProduto.id
      );
      this.possuiVinculo(response, res);

      await TipoProdutoRepository.deletarProduto(tipoProduto);
      return res
        .status(200)
        .json({ message: `${tipoProduto.nome} deletado com sucesso` });
    } catch (err) {
      throw res.status(400).send({ message: err.message });
    }
  }

  possuiVinculo(response, res) {
    if (response) {
      throw res.status(400).send({
        message: `Para poder excluir, é necessario desvicular ao produto ${response.nome}`,
      });
    }
  }
}

export default new TipoProdutoService();
