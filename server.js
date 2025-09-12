// pego o app configurado e só subo o servidor
const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Agenda Barbie API rodando em http://localhost:${PORT}`);
});
