const enviarLog = async (
  url: "limparLogs" | "gravarLogs" | "gravarHtml",
  dados: any
) => {
  try {
    const { default: axios } = await import("axios");
    await axios.post("http://localhost:5000/" + url, dados);
  } catch (error: any) {
    console.error("Erro: ao enviarLog");
  }
};

async function enviarHtml(campo: DebugElement) {
  await enviarLog("gravarHtml", {
    html: campo.nativeElement.outerHTML,
  });
}
