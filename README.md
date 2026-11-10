# Minhas Tarefas

Lista de tarefas bem básica feita com Node.js, Express e JavaScript puro.
As tarefas ficam salvas no arquivo `tarefas.json` (não precisa de banco de dados).

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000

O `npm run dev` reinicia o servidor sozinho quando você altera o código.
Para rodar sem reinício automático, use `npm start`.

## Rotas da API

| Método | Rota               | O que faz                    |
| ------ | ------------------ | ---------------------------- |
| GET    | `/api/tarefas`     | Lista as tarefas             |
| POST   | `/api/tarefas`     | Cria uma tarefa (`titulo`)   |
| PUT    | `/api/tarefas/:id` | Marca como feita / desfaz    |
| DELETE | `/api/tarefas/:id` | Exclui a tarefa              |

## Estrutura

```
lista-tarefas/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
└── README.md
```
