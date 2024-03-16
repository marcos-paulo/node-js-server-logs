import axios from "axios";

const resposta = axios
  .post("http://localhost:5000/gravarLogs", {
    nome: "combo-moeda-banqueiro-praca-conta",
    html: "",
  })
  .then((resposta) => {
    console.log(resposta);
  })
  .catch((erro) => {
    console.error("erro ao salvar html", erro);
  });
