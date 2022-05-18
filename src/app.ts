import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv } from "@/config";
loadEnv();

import { handleApplicationErrors } from "@/middlewares";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  return Promise.resolve(app);
}

export default app;
