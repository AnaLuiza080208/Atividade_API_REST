const express = require('express'); // pega o Express pra criar rotas
const fs = require('fs');           // vai ler/escrever arquivos
const path = require('path');       // ajuda a montar o caminho pro JSON
const router = express.Router();    // cria um mini app só pra essas rotas

const arquivo = path.join(__dirname, '../dados/tarefas.json'); // caminho do arquivo

const lerTarefas = () => JSON.parse(fs.readFileSync(arquivo, 'utf-8')); // lê e transforma em array
const salvarTarefas = (tarefas) => fs.writeFileSync(arquivo, JSON.stringify(tarefas, null, 2)); // salva o array de volta

const encontrarTarefa = (id) => lerTarefas().find(t => t.id === Number(id)); // acha a tarefa pelo id

router.get('/', (req, res) => {
  res.json(lerTarefas()); // só pega tudo do arquivo e devolve
});

router.post('/', (req, res) => {
  const tarefas = lerTarefas(); // pega o que já tem
  const nova = { id: Date.now(), ...req.body }; // cria a nova com id único
  tarefas.push(nova); // coloca no array
  salvarTarefas(tarefas); // salva de volta
  res.status(201).json(nova); // devolve a tarefa criada
});

router.put('/:id', (req, res) => {
  const tarefas = lerTarefas(); // pega tudo
  const id = Number(req.params.id); // pega o id da URL
  const index = tarefas.findIndex(t => t.id === id); // acha onde tá

  if (index === -1) return res.status(404).json({ error: 'Tarefa não encontrada' }); // se não existe, avisa

  tarefas[index] = { id, ...req.body }; // substitui pela nova info
  salvarTarefas(tarefas); // salva de novo

  res.json(tarefas[index]); // devolve a tarefa atualizada
});

router.delete('/:id', (req, res) => {
  const tarefas = lerTarefas(); // pega todas
  const id = Number(req.params.id); // pega id da URL

  if (!tarefas.some(t => t.id === id)) return res.status(404).json({ error: 'Tarefa não encontrada' }); // se não achou, avisa

  salvarTarefas(tarefas.filter(t => t.id !== id)); // filtra e salva só o que sobrou
  res.json({ message: 'Tarefa removida' }); // confirma que tirou
});

module.exports = router; // exporta pra usar na página 
