const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/tarefas", require("./rotas/tarefaRoutes"));

module.exports = app;
