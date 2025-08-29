const express = require('express');
const fs = require('fs'); 
const path = require('path'); 
const router = express.Router();
const arquivo = path.join(__dirname, '../dados/tarefas.json');

const lerTarefas = () => JSON.parse(fs.readFileSync(arquivo, 'utf-8'));
const salvarTarefas = (tarefas) => fs.writeFileSync(arquivo, JSON.stringify(tarefas, null, 2));
const encontrarTarefa = (id) => lerTarefas().find(t => t.id == id);

router.get('/', (req, res) => res.json(lerTarefas()));

router.post('/', (req, res) => {
  const tarefas = lerTarefas(); // Lê as tarefas atuais
  const nova = { id: Date.now(), ...req.body }; // Cria uma nova tarefa com id único
  tarefas.push(nova); // Adiciona a nova tarefa ao array
  salvarTarefas(tarefas); // Salva no arquivo JSON
  res.status(201).json(nova); // Retorna a nova tarefa criada
});

router.put('/:id', (req, res) => {
  const tarefas = lerTarefas();
  const tarefa = encontrarTarefa(req.params.id); 
  if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

  Object.assign(tarefa, req.body);
  salvarTarefas(tarefas); 
  res.json(tarefa); 
});

router.delete('/:id', (req, res) => {
  const tarefas = lerTarefas();
  if (!tarefas.some(t => t.id == req.params.id))
    return res.status(404).json({ error: 'Tarefa não encontrada' });

  salvarTarefas(tarefas.filter(t => t.id != req.params.id)); // Remove a tarefa e salva
  res.json({ message: 'Tarefa removida' });
});

module.exports = router;
