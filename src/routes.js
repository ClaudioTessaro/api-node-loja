import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import TipoProdutoController from "./app/controllers/TipoProdutoController";
import ProdutoController from "./app/controllers/ProdutoController";
import ClienteProdutoController from "./app/controllers/ClienteProdutoController";
import ClienteController from "./app/controllers/ClienteController";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/users", UserController.createUser);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);
routes.get("/users", UserController.recuperar);

routes.post("/tipoProduto", TipoProdutoController.cadastrarProduto);
routes.get("/tipoProduto", TipoProdutoController.buscarTodos);
routes.get("/tipoProduto/:id", TipoProdutoController.buscarTipoPorId);
routes.put("/tipoProduto/:id", TipoProdutoController.atualizarTipoProduto);
routes.delete("/tipoProduto/:id", TipoProdutoController.deletar);

routes.post("/produto", ProdutoController.cadastrar);
routes.get("/produto/:id", ProdutoController.buscarPorId);
routes.delete("/produto/:id", ProdutoController.deletarPorId);
routes.get("/produtos", ProdutoController.buscarPorFiltro);
routes.put("/produto/:id", ProdutoController.atualizarProduto);
routes.get("/todosProdutos", ProdutoController.buscarTodos);

routes.post("/cliente", ClienteController.insereCliente);
routes.get("/clientes", ClienteController.buscarClientes);
routes.get(
  "/cliente/:nomeCliente/:dataCompra",
  ClienteController.buscarClientePorNomeData
);
routes.get("/cliente/:id", ClienteController.buscarClientePorId);
routes.put("/cliente/:id", ClienteController.atualizaCliente);
routes.delete("/cliente/:id", ClienteController.deletarCliente);

routes.post("/venda", ClienteProdutoController.insereVenda);
routes.get("/venda/:id", ClienteProdutoController.buscarVendaPorIdCliente);

export default routes;
