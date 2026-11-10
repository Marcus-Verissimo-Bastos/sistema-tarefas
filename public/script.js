const form = document.getElementById('form');
const inputTitulo = document.getElementById('titulo');
const lista = document.getElementById('lista');
const vazio = document.getElementById('vazio');
const contador = document.getElementById('contador');

async function carregar() {
  const resposta = await fetch('/api/tarefas');
  const tarefas = await resposta.json();
  mostrar(tarefas);
}

function mostrar(tarefas) {
  lista.innerHTML = '';

  tarefas.forEach((t) => {
    const li = document.createElement('li');
    if (t.feita) li.classList.add('feita');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = t.feita;
    check.addEventListener('change', () => alternar(t.id));

    const texto = document.createElement('span');
    texto.textContent = t.titulo;

    const botao = document.createElement('button');
    botao.className = 'excluir';
    botao.textContent = '✕';
    botao.title = 'Excluir';
    botao.addEventListener('click', () => excluir(t.id));

    li.append(check, texto, botao);
    lista.appendChild(li);
  });

  const pendentes = tarefas.filter((t) => !t.feita).length;
  contador.textContent = `${pendentes} pendente(s) de ${tarefas.length}`;
  vazio.hidden = tarefas.length > 0;
}

async function alternar(id) {
  await fetch(`/api/tarefas/${id}`, { method: 'PUT' });
  carregar();
}

async function excluir(id) {
  await fetch(`/api/tarefas/${id}`, { method: 'DELETE' });
  carregar();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = inputTitulo.value.trim();
  if (!titulo) return;

  await fetch('/api/tarefas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo }),
  });

  inputTitulo.value = '';
  carregar();
});

carregar();
