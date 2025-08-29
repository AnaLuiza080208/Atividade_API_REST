const form = document.getElementById('form');
const lista = document.getElementById('lista');
const API = '/api/tarefas';

// Função para renderizar tarefas
const renderTarefas = async () => {
  lista.innerHTML = '';
  (await (await fetch(API)).json()).forEach(t => {
    const li = document.createElement('li');
    li.className = 'tarefa-barbie';
    li.innerHTML = `
      <h3>${t.titulo}</h3>
      <p>${t.descricao}</p>
      <p>Data: ${t.data} | Prioridade: ${t.prioridade} | Status: <span class="status-${t.status}">${t.status}</span></p>
      <button onclick="editar(${t.id})">Editar</button>
      <button onclick="remover(${t.id})">Excluir</button>
    `;
    lista.appendChild(li);
  });
};

// Função genérica de fetch
const enviar = (url, metodo, corpo) =>
  fetch(url, { method: metodo, headers: { 'Content-Type': 'application/json' }, body: corpo && JSON.stringify(corpo) });

// Adicionar tarefa
form.addEventListener('submit', e => {
  e.preventDefault();
  const tarefa = Object.fromEntries(new FormData(form));
  enviar(API, 'POST', tarefa).then(() => {
    form.reset();
    renderTarefas();
  });
});

// Remover tarefa
window.remover = id => enviar(`${API}/${id}`, 'DELETE').then(renderTarefas);

// Editar tarefa
window.editar = async id => {
  const titulo = prompt('Novo título:');
  if (!titulo) return;
  const status = prompt('Novo status: pendente, andamento ou concluida:').toLowerCase();
  if (!['pendente','andamento','concluida'].includes(status)) return alert('Status inválido!');
  await enviar(`${API}/${id}`, 'PUT', { titulo, status });
  renderTarefas();
};

// Inicializa
renderTarefas();
