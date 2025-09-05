const form = document.getElementById('form');
const lista = document.getElementById('lista');
const API = '/api/tarefas';

const renderTarefas = async () => {
  lista.innerHTML = '';

  const tarefas = await (await fetch(API)).json();

  tarefas.forEach(t => {
    const li = document.createElement('li');
    li.className = 'tarefa-barbie';
    li.innerHTML = `
      <h3>${t.titulo}</h3>
      <p>${t.descricao || ''}</p>
      <p>Data: ${t.data} | Prioridade: ${t.prioridade} | 
         Status: <span class="status-${t.status}">${t.status}</span></p>
      <button onclick="editar(${t.id})">Editar</button>
      <button onclick="remover(${t.id})">Excluir</button>
    `;
    lista.appendChild(li);
  });
};

const enviar = (url, metodo, corpo) =>
  fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: corpo && JSON.stringify(corpo)
  });

form.addEventListener('submit', e => {
  e.preventDefault();
  const tarefa = Object.fromEntries(new FormData(form));
  enviar(API, 'POST', tarefa).then(() => {
    form.reset();
    renderTarefas();
  });
});

window.remover = id =>
  enviar(`${API}/${id}`, 'DELETE').then(renderTarefas);

window.editar = async id => {
  const tarefas = await (await fetch(API)).json();
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return alert('Tarefa não encontrada.');

  const novoTitulo = prompt('Novo título:', tarefa.titulo);
  if (!novoTitulo) return;

  const novaDescricao = prompt('Nova descrição:', tarefa.descricao) || tarefa.descricao;

  const novoStatus = prompt('Novo status: pendente, andamento ou concluida:', tarefa.status).toLowerCase();
  if (!['pendente', 'andamento', 'concluida'].includes(novoStatus)) {
    return alert('Status inválido!');
  }

  const novaPrioridade = prompt('Nova prioridade: baixa, media ou alta:', tarefa.prioridade).toLowerCase();
  if (!['baixa', 'media', 'alta'].includes(novaPrioridade)) {
    return alert('Prioridade inválida!');
  }

  // Mantém os outros campos para não perder dados
  const tarefaAtualizada = { 
    titulo: novoTitulo, 
    descricao: novaDescricao,
    status: novoStatus,
    data: tarefa.data,
    prioridade: novaPrioridade
  };

  await enviar(`${API}/${id}`, 'PUT', tarefaAtualizada);
  renderTarefas();
};

renderTarefas();
