import TipoProdutoRepository from "../Repositories/TipoProdutoRepository";

class TipoProdutoService {
  async cadastrarProduto(req, res) {
    try {
      const tipoProduto = req.body;
      const { id, nome } = await TipoProdutoRepository.inserir(tipoProduto);
      return res.json({ id, nome });
    } catch (err) {
      throw res.status(400).json({ error: err.message });
    }
  }

  async buscarTodos(req, res) {
    try {
      const response = await TipoProdutoRepository.buscarTodos();
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
      return res.status(200).json({ id, nome });
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
}

export default new TipoProdutoService();
