import * as fs from "fs";
import { vermelho, reset, ciano, magenta, verde, amarelo, azul } from "./cores";
import { getNomeDosArquivosDeLog } from "./criarArquivo";

export function salvarLogs(body: any) {
  // console.dir(body, { depth: null });

  const esc = Buffer.from("\x1b", "binary");

  // if (body.timestamp) {
  //   body.timestamp = "\x1b[36m" + body.timestamp + "\x1b[0m";
  // }
  function colorirString(objeto: any) {
    Object.keys(objeto).forEach((key) => {
      if (objeto[key] === null || objeto[key] === undefined) {
        objeto[key] = `${vermelho}${objeto[key]}${reset}`;
      } else if (typeof objeto[key] === "object") {
        colorirString(objeto[key]);
      } else if (key === "timestamp") {
        objeto[key] = `${ciano}${objeto[key]}${reset}`;
      } else if (key === "tag") {
        objeto[key] = `${magenta}${objeto[key]}${reset}`;
      } else if (typeof objeto[key] === "string") {
        objeto[key] = `${verde}${objeto[key]}${reset}`;
      } else if (typeof objeto[key] === "number") {
        objeto[key] = `${amarelo}${objeto[key]}${reset}`;
      } else if (typeof objeto[key] === "boolean") {
        objeto[key] = `${azul}${objeto[key]}${reset}`;
      }
    });
  }
  colorirString(body);

  fs.appendFileSync(
    getNomeDosArquivosDeLog().nomeLogConsole,
    JSON.stringify(body, null, 2).replace(/\\u001b/g, esc.toString("binary")) +
      "\n",
    "utf8"
  );
}
