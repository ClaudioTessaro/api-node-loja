import "dotenv/config";
import express from "express";
import Youch from "youch";
import * as Sentry from "@sentry/node";
import "express-async-error";
import cors from "cors";
import routes from "./routes";

import "./app/database";

class App {
  constructor() {
    this.server = express();
    this.server.use(Sentry.Handlers.requestHandler());
    this.middleware();
    this.exception();
    this.routes();
    this.exceptionHandler();
  }

  exception() {
    this.server.use(async (error, req, res, next) => {
      res.status(error.httpStatusCode).json(error);
    });
  }

  middleware() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: "Internal error" });
    });
  }
}

export default new App().server;
