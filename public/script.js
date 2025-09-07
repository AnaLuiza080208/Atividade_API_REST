const form = document.getElementById('form'); // pega o form da página
const lista = document.getElementById('lista'); // pega onde as tarefas vão aparecer
const API = '/api/tarefas'; // endereço da API

const renderTarefas = async () => {
  lista.innerHTML = ''; // limpa a lista antes de mostrar de novo

  const tarefas = await (await fetch(API)).json(); // pega tudo do backend

  tarefas.forEach(t => {
    const li = document.createElement('li'); 
    li.className = 'tarefa-barbie';

    // monta como vai aparecer na tela
    li.innerHTML = `
      <h3>${t.titulo}</h3>
      <p>${t.descricao || ''}</p>
      <p>Data: ${t.data} | Prioridade: ${t.prioridade} | 
         Status: <span class="status-${t.status}">${t.status}</span></p>
      <button onclick="editar(${t.id})">Editar</button>
      <button onclick="remover(${t.id})">Excluir</button>
    `;

    lista.appendChild(li); // coloca na tela
  });
};

// função que serve pra mandar qualquer coisa pro backend
const enviar = (url, metodo, corpo) =>
  fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: corpo && JSON.stringify(corpo) // só manda se tiver algo
  });

// quando mandar o form
form.addEventListener('submit', e => {
  e.preventDefault(); // não deixa recarregar a página

  const tarefa = Object.fromEntries(new FormData(form)); // pega os dados digitados

  enviar(API, 'POST', tarefa).then(() => {
    form.reset(); // limpa os campos
    renderTarefas(); // mostra a lista de novo
  });
});

// remover é só mandar pro backend e atualizar a lista
window.remover = id =>
  enviar(`${API}/${id}`, 'DELETE').then(renderTarefas);

// editar precisa achar a tarefa certa primeiro
window.editar = async id => {
  const tarefas = await (await fetch(API)).json();
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return alert('Tarefa não encontrada.');

  // pede os novos dados
  const novoTitulo = prompt('Novo título:', tarefa.titulo);
  if (!novoTitulo) return;

  const novaDescricao = prompt('Nova descrição:', tarefa.descricao) || tarefa.descricao;

  const novoStatus = prompt('Novo status: pendente, andamento ou concluida:', tarefa.status).toLowerCase();
  if (!['pendente', 'andamento', 'concluida'].includes(novoStatus)) return alert('Status inválido!');

  const novaPrioridade = prompt('Nova prioridade: baixa, media ou alta:', tarefa.prioridade).toLowerCase();
  if (!['baixa', 'media', 'alta'].includes(novaPrioridade)) return alert('Prioridade inválida!');

  // cria o objeto atualizado
  const tarefaAtualizada = { 
    titulo: novoTitulo, 
    descricao: novaDescricao,
    status: novoStatus,
    data: tarefa.data, // mantém a data original
    prioridade: novaPrioridade
  };

  await enviar(`${API}/${id}`, 'PUT', tarefaAtualizada); // manda pro backend
  renderTarefas(); // atualiza a lista
};

// já mostra tudo assim que abre a página
renderTarefas();
