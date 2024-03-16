fetch("http://localhost:5000/gravarLogs", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ marcos: "teste" }),
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Erro na requisição");
    }
    return res.json();
  })
  .then((data) => {
    console.info("Resposta:", data);
  })
  .catch((err) => {
    console.error("Erro:", err);
  });
