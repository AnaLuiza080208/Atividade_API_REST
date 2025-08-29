const express = require('express'); // Importa o Express para criar o servidor
const path = require('path'); // Importa o módulo path para trabalhar com caminhos de arquivos
const logger = require('./middleware/logger'); // Importa o middleware que registra logs das requisições

const app = express(); // Cria a instância do Express (nosso servidor)

// =================== MIDDLEWARE ===================
// Middleware personalizado para registrar cada requisição
app.use(logger);

// Permite que o servidor receba requisições com JSON no corpo
app.use(express.json());

// Permite que o servidor receba dados de formulários HTML (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// =================== FRONT-END ===================
// Define a pasta 'public' como pública, para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// =================== ROTAS ===================
// Todas as requisições para '/api/tarefas' serão tratadas pelo arquivo de rotas
app.use('/api/tarefas', require('./rotas/tarefaRoutes'));

// Exporta a instância do Express para ser usada em outro arquivo (ex: server.js)
module.exports = app;
