import express from "express";
import * as fs from "fs";
import cors from "cors";
import { identarHtml } from "./modules/identarHtml";
import { salvarLogs } from "./modules/salvarLogs";
import {
  criarArquivosDeLog,
  verificarSeDiretorioLogsExiste,
} from "./modules/criarArquivo";

const app = express();
app.use(express.json());
app.use(cors());

verificarSeDiretorioLogsExiste();

app.post("/limparLogs", (req, res) => {
  console.log("Limpando logs");
  criarArquivosDeLog();
  return res.status(200).send();
});

app.post("/gravarLogs", (req, res) => {
  console.log("Gravando logs");
  salvarLogs(req.body);
  return res.status(200).send();
});

app.post("/gravarHtml", (req, res) => {
  console.log("Gravando HTML");
  identarHtml({ tag: req.body.tag, htmlNaoIdentado: req.body.html });
  return res.status(200).send();
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
