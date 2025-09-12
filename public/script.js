const form = document.getElementById("form");
const lista = document.getElementById("lista");

// pega do localStorage ou cria lista vazia dependendo do caso
function pegarTarefas() {
  return JSON.parse(localStorage.getItem("tarefas")) || [];
}

// salva no localStorage
function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// renderiza lista na tela
function renderizar() {
  const tarefas = pegarTarefas();
  lista.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.className = "tarefa-barbie";

    li.innerHTML = `
      <h3>${tarefa.titulo}</h3>
      <p>${tarefa.descricao}</p>
      <p><strong>Data:</strong> ${tarefa.data}</p>
      <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
      <p><strong>Status:</strong> <span class="status-${tarefa.status}">${tarefa.status}</span></p>
      <button onclick="editarTarefa(${tarefa.id})">Editar</button>
      <button onclick="deletarTarefa(${tarefa.id})">Excluir</button>
    `;

    lista.appendChild(li);
  });
}

// adicionar tarefa
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const tarefas = pegarTarefas();

  const nova = {
    id: Date.now(),
    titulo: form.titulo.value,
    descricao: form.descricao.value,
    data: form.data.value,
    prioridade: form.prioridade.value,
    status: form.status.value,
  };

  tarefas.push(nova);
  salvarTarefas(tarefas);
  renderizar();
  form.reset();
});

// editar tarefa
function editarTarefa(id) {
  const tarefas = pegarTarefas();
  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) return;

  // joga os valores pro formulário
  form.titulo.value = tarefa.titulo;
  form.descricao.value = tarefa.descricao;
  form.data.value = tarefa.data;
  form.prioridade.value = tarefa.prioridade;
  form.status.value = tarefa.status;

  // remove a antiga
  salvarTarefas(tarefas.filter((t) => t.id !== id));
  renderizar();
}

// deletar tarefa
function deletarTarefa(id) {
  const tarefas = pegarTarefas().filter((t) => t.id !== id);
  salvarTarefas(tarefas);
  renderizar();
}

// primeira renderização
renderizar();
