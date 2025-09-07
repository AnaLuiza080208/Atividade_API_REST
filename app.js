const express = require("express"); // pega o Express pra criar o app
const path = require("path");       // ajuda a montar caminhos de arquivos
const logger = require("./middleware/logger"); // meu middleware que mostra logs no console

const app = express(); // cria o app do Express

app.use(logger); // cada requisição passa por aqui, só pra ver o que tá chegando
app.use(express.json()); // transforma JSON do corpo da requisição em objeto
app.use(express.urlencoded({ extended: true })); // faz o mesmo pra dados de form
app.use(express.static(path.join(__dirname, "public"))); // entrega arquivos estáticos tipo HTML, CSS e JS
app.use("/api/tarefas", require("./rotas/tarefaRoutes")); // todas as rotas de tarefas ficam aqui

module.exports = app; // exporta o app pra usar no server.js
