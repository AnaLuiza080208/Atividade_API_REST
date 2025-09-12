// controller que lida com leitura/escrita no JSON
const fs = require('fs');
const path = require('path');

const arquivo = path.join(__dirname, '..', 'dados', 'tarefas.json');

// lê o arquivo (se não existir, cria com array vazio)
const lerTarefas = () => {
  try {
    if (!fs.existsSync(arquivo)) {
      fs.writeFileSync(arquivo, JSON.stringify([], null, 2));
    }
    const raw = fs.readFileSync(arquivo, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    // se der ruim, retorna array vazio pra não quebrar a API
    return [];
  }
};

const salvarTarefas = (tarefas) => {
  fs.writeFileSync(arquivo, JSON.stringify(tarefas, null, 2));
};

// listar todas
exports.listar = (req, res) => {
  const tarefas = lerTarefas();
  res.json(tarefas);
};

// buscar por id
exports.buscarPorId = (req, res) => {
  const tarefas = lerTarefas();
  const id = Number(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json(tarefa);
};

// criar
exports.criar = (req, res) => {
  const tarefas = lerTarefas();
  const { titulo, descricao = '', status = 'pendente', prioridade = 'media', data = null } = req.body;

  if (!titulo || titulo.toString().trim() === '') {
    return res.status(400).json({ error: 'Campo "titulo" é obrigatório.' });
  }

  const nova = {
    id: Date.now(), // id simples
    titulo: titulo.toString().trim(),
    descricao: descricao.toString(),
    status: status.toString(),
    prioridade: prioridade.toString(),
    data
  };

  tarefas.push(nova);
  salvarTarefas(tarefas);

  res.status(201).json(nova);
};

// atualizar
exports.atualizar = (req, res) => {
  const tarefas = lerTarefas();
  const id = Number(req.params.id);
  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).json({ error: 'Tarefa não encontrada' });

  const { titulo, descricao, status, prioridade, data } = req.body;

  // mantém valores antigos quando não enviados
  tarefas[index] = {
    id,
    titulo: titulo !== undefined ? titulo.toString().trim() : tarefas[index].titulo,
    descricao: descricao !== undefined ? descricao.toString() : tarefas[index].descricao,
    status: status !== undefined ? status.toString() : tarefas[index].status,
    prioridade: prioridade !== undefined ? prioridade.toString() : tarefas[index].prioridade,
    data: data !== undefined ? data : tarefas[index].data
  };

  salvarTarefas(tarefas);
  res.json(tarefas[index]);
};

// remover
exports.remover = (req, res) => {
  const tarefas = lerTarefas();
  const id = Number(req.params.id);

  if (!tarefas.some(t => t.id === id)) return res.status(404).json({ error: 'Tarefa não encontrada' });

  const filtrado = tarefas.filter(t => t.id !== id);
  salvarTarefas(filtrado);

  res.json({ message: 'Tarefa removida' });
};
