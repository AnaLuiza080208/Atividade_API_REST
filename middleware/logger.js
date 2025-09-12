// aqui eu vejo o que chega no servidor (data/método/rota)
const logger = (req, res, next) => {
  const now = new Date().toLocaleString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logger;
