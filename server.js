const app = require("./app"); // pega o app que configurei lá no app.js

const PORT = 3000; // escolhi a porta pra rodar

// liga o servidor
app.listen(PORT, () => {
  // quando estiver rodando, mostra essa mensagem no console
  console.log(`Agenda Barbie rodando em http://localhost:${PORT}`);
});
