// Middleware para registrar informações de cada requisição
const logger = (req, res, next) => {
  // Pega a data e hora atual em formato legível
  const now = new Date().toLocaleString();

  // Mostra no console o método HTTP e a URL original da requisição
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);

  // Chama o próximo middleware ou rota
  next();
};

// Exporta a função para ser usada em outros arquivos (ex: server.js)
module.exports = logger;
