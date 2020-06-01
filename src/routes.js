import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import TipoProdutoController from "./app/controllers/TipoProdutoController";

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
export default routes;
