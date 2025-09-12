// configura o Express e as rotas
const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

app.use(logger); // meu logger mental
app.use(express.json()); // aceita JSON no corpo
app.use(express.urlencoded({ extended: true }));

// serve arquivos estáticos se quiser usar frontend
app.use(express.static(path.join(__dirname, 'public')));

// rota da API de tarefas
app.use('/api/tarefas', require('./rotas/tarefaRoutes'));

// tratamento simples de rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

module.exports = app;
