import * as fs from "fs";

type NomesArquivosLogs = {
  nomeLogConsole: string;
  nomeLogHtml: string;
};

export function criarArquivosDeLog(): NomesArquivosLogs {
  const data = new Date();
  const timeZoneOffset = data.getTimezoneOffset() * -1;
  data.setTime(data.getTime() + timeZoneOffset * 60 * 1000);
  const timestamp = data.toISOString();

  const nomesAtuais = {
    nomeLogConsole: `./logs/${timestamp}-console-log.txt`,
    nomeLogHtml: `./logs/${timestamp}-console-html.html`,
  };

  fs.writeFileSync(
    "logs/nomes.json",
    JSON.stringify(nomesAtuais, null, 2),
    "utf8"
  );

  return nomesAtuais;
}

export function verificarSeDiretorioLogsExiste() {
  const nomeDoDiretorio = "logs";

  // Verifica se o diretório já existe
  if (fs.existsSync(nomeDoDiretorio)) {
    console.log("O diretório já existe.");
  } else {
    // Cria o diretório se ele não existir
    fs.mkdir(nomeDoDiretorio, (err) => {
      if (err) {
        console.error("Erro ao criar o diretório:", err);
      } else {
        console.log("Diretório criado com sucesso!");
      }
    });
  }
}

export function getNomeDosArquivosDeLog() {
  const nomes = fs.readFileSync("logs/nomes.json", "utf8");
  return JSON.parse(nomes) as NomesArquivosLogs;
}

// const nomes = criarArquivosDeLog();

// fs.writeFileSync(nomes.nomeLogConsole, "");
// fs.writeFileSync(nomes.nomeLogHtml, "");

// // Crie um objeto Date com o fuso horário atual
// let data = new Date();

// // Obtenha o deslocamento de fuso horário em minutos
// const offset = data.getTimezoneOffset() * -1;
// // let offset = -540;

// // Defina o deslocamento de fuso horário desejado (por exemplo, GMT+0300)
// let novoOffset = -180; // 3 horas = 3 * 60 = 180 minutos

// // Calcule o deslocamento de tempo necessário para ajustar o fuso horário
// let diferencaOffset = offset * -1;

// // Aplique o deslocamento de tempo para ajustar o fuso horário
// data.setTime(data.getTime() + diferencaOffset * 60 * 1000);

// console.log(data);
