const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ARQUIVO = path.join(__dirname, 'tarefas.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Lê as tarefas do arquivo (cria lista vazia se não existir)
function lerTarefas() {
  try {
    return JSON.parse(fs.readFileSync(ARQUIVO, 'utf8'));
  } catch {
    return [];
  }
}

function salvarTarefas(tarefas) {
  fs.writeFileSync(ARQUIVO, JSON.stringify(tarefas, null, 2));
}

// Listar
app.get('/api/tarefas', (req, res) => {
  res.json(lerTarefas());
});

// Criar
app.post('/api/tarefas', (req, res) => {
  const titulo = (req.body.titulo || '').trim();
  if (!titulo) return res.status(400).json({ erro: 'Informe o título.' });

  const tarefas = lerTarefas();
  const nova = { id: Date.now(), titulo, feita: false };
  tarefas.push(nova);
  salvarTarefas(tarefas);
  res.status(201).json(nova);
});

// Marcar como feita / desfazer
app.put('/api/tarefas/:id', (req, res) => {
  const tarefas = lerTarefas();
  const tarefa = tarefas.find((t) => t.id === Number(req.params.id));
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada.' });

  tarefa.feita = !tarefa.feita;
  salvarTarefas(tarefas);
  res.json(tarefa);
});

// Excluir
app.delete('/api/tarefas/:id', (req, res) => {
  const tarefas = lerTarefas().filter((t) => t.id !== Number(req.params.id));
  salvarTarefas(tarefas);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Rodando em http://localhost:${PORT}`);
});
