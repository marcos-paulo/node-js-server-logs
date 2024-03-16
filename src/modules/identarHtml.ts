import * as fs from "fs";
import { getNomeDosArquivosDeLog } from "./criarArquivo";

/**
 *
 * Exemplo de Uso:
 * ```
 * const erro = ambiente.fixture.debugElement.query(
 *    By.css('bb-date-field[label="Data Fim"]')
 * );
 * identarHtml(erro.nativeElement.outerHTML);
 * ```
 *
 * @param htmlNaoIdentado
 */
export function identarHtml(htmlNaoIdentado: string) {
  const htmlAntigo = htmlNaoIdentado
    .replace(/</g, "\n<")
    .replace(/{\n/g, "{")
    .replace(/\n}/g, "}")
    .split("\n");

  let novoHtml = "";
  const pilhaHtml: string[] = [];

  htmlAntigo.forEach((linha: string, index: number) => {
    const stringLength =
      pilhaHtml.length + "     |".slice(pilhaHtml.length.toString().length);

    if (
      linha.startsWith("<!--") ||
      linha.startsWith("<input") ||
      linha.startsWith("<link") ||
      linha.startsWith("<meta") ||
      linha.startsWith("<base")
    ) {
      novoHtml += `${stringLength}${"  ".repeat(pilhaHtml.length)}${linha}\n`;
    } else if (linha.startsWith("</")) {
      const nivel = linha.split(/<\/([a-z-]*)[\s>].*/)[1];
      if (pilhaHtml[pilhaHtml.length - 1] === nivel) {
        pilhaHtml.pop();
      }
      novoHtml += `${stringLength}${"  ".repeat(pilhaHtml.length)}${linha}\n`;
    } else if (linha.startsWith("<")) {
      novoHtml += `${stringLength}${"  ".repeat(pilhaHtml.length)}${linha}\n`;
      const nivel = linha.split(/<([a-z-]*)[\s>].*/)[1];
      pilhaHtml.push(nivel);
    }
  });

  fs.appendFileSync(
    getNomeDosArquivosDeLog().nomeLogHtml,
    [
      "------------------ HTML ---------------------",
      "\n" + novoHtml + "\n",
      "------------------ HTML ---------------------",
    ].join(""),
    "utf8"
  );
}
