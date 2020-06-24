class UtilService {
  consultarSeExisteRetorno(body) {
    if (body.length === 0) {
      throw new Error("Não existe nenhum valor com os dados pesquisados");
    }
  }
}

export default new UtilService();
