const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const arquivo = path.join(__dirname, '../dados/tarefas.json');

const lerTarefas = () => JSON.parse(fs.readFileSync(arquivo, 'utf-8'));
const salvarTarefas = (tarefas) => fs.writeFileSync(arquivo, JSON.stringify(tarefas, null, 2));
const encontrarTarefa = (id) => lerTarefas().find(t => t.id === Number(id));

router.get('/', (req, res) => {
  res.json(lerTarefas());
});

router.post('/', (req, res) => {
  const tarefas = lerTarefas();
  const nova = { id: Date.now(), ...req.body };
  tarefas.push(nova);
  salvarTarefas(tarefas);
  res.status(201).json(nova);
});

router.put('/:id', (req, res) => {
  const tarefas = lerTarefas();
  const id = Number(req.params.id);
  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).json({ error: 'Tarefa não encontrada' });

  tarefas[index] = { id, ...req.body };
  salvarTarefas(tarefas);

  res.json(tarefas[index]);
});

router.delete('/:id', (req, res) => {
  const tarefas = lerTarefas();
  const id = Number(req.params.id);
  if (!tarefas.some(t => t.id === id))
    return res.status(404).json({ error: 'Tarefa não encontrada' });

  salvarTarefas(tarefas.filter(t => t.id !== id));
  res.json({ message: 'Tarefa removida' });
});

module.exports = router;
