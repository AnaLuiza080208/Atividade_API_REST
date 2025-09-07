// Middleware de logger para Express
const logger = (req, res, next) => {
  // Pega a data e hora atuais no formato local
  const now = new Date().toLocaleString();

  // Mostra no console o horário, método (GET/POST/etc) e a URL acessada
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);

  // Chama o próximo middleware/rota da aplicação
  next();
};

// Exporta o middleware para ser usado em outras partes do código
module.exports = logger;
