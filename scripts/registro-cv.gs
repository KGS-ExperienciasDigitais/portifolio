// Registra cada clique no CV numa planilha do Google (uma linha por clique: Data | Hora).
//
// Como ligar:
// 1. Crie uma planilha no Google Sheets.
// 2. Extensões → Apps Script. Apague o que estiver lá e cole este arquivo. Salve.
// 3. Implantar → Nova implantação → tipo "App da Web".
//    Executar como: "Eu". Quem pode acessar: "Qualquer pessoa". Implante e autorize.
// 4. Copie a URL do app da Web (termina em /exec) e coloque no .env.local do projeto:
//    CV_CLICK_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
//    Na hospedagem (ex.: Vercel), crie a mesma variável de ambiente.
// 5. Reinicie o `npm run dev`. Cada clique no CV vira uma linha na planilha.

function doPost(e) {
  const { data, hora } = JSON.parse(e.postData.contents);
  const planilha = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  if (planilha.getLastRow() === 0) planilha.appendRow(["Data", "Hora"]);
  planilha.appendRow([data, hora]);

  return ContentService.createTextOutput("ok");
}
