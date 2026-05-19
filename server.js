const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const caminhoArquivo = path.join(__dirname, "data", "clientes.json");

function lerClientes() {
  if (!fs.existsSync(caminhoArquivo)) {
    fs.writeFileSync(caminhoArquivo, "[]");
  }

  const dados = fs.readFileSync(caminhoArquivo, "utf-8");

  if (!dados) {
    return [];
  }

  return JSON.parse(dados);
}

function salvarClientes(clientes) {
  fs.writeFileSync(caminhoArquivo, JSON.stringify(clientes, null, 2));
}

app.get("/", (req, res) => {
  res.json({
    mensagem: "API de cadastro de clientes funcionando",
  });
});

app.get("/clientes", (req, res) => {
  const clientes = lerClientes();

  res.json(clientes);
});

app.get("/clientes/:id", (req, res) => {
  const clientes = lerClientes();
  const id = req.params.id;

  const cliente = clientes.find((cliente) => cliente.id === id);

  if (!cliente) {
    return res.status(404).json({
      erro: "Cliente não encontrado",
    });
  }

  res.json(cliente);
});

app.post("/clientes", (req, res) => {
  const clientes = lerClientes();

  const { nome, email, telefone } = req.body;

  if (!nome || !email || !telefone) {
    return res.status(400).json({
      erro: "Nome, e-mail e telefone são obrigatórios",
    });
  }

  const novoCliente = {
    id: randomUUID(),
    nome,
    email,
    telefone,
    criadoEm: new Date().toISOString(),
  };

  clientes.push(novoCliente);
  salvarClientes(clientes);

  res.status(201).json(novoCliente);
});

app.put("/clientes/:id", (req, res) => {
  const clientes = lerClientes();
  const id = req.params.id;

  const indice = clientes.findIndex((cliente) => cliente.id === id);

  if (indice === -1) {
    return res.status(404).json({
      erro: "Cliente não encontrado",
    });
  }

  const { nome, email, telefone } = req.body;

  clientes[indice] = {
    ...clientes[indice],
    nome: nome ?? clientes[indice].nome,
    email: email ?? clientes[indice].email,
    telefone: telefone ?? clientes[indice].telefone,
    atualizadoEm: new Date().toISOString(),
  };

  salvarClientes(clientes);

  res.json(clientes[indice]);
});

app.delete("/clientes/:id", (req, res) => {
  const clientes = lerClientes();
  const id = req.params.id;

  const clienteExiste = clientes.some((cliente) => cliente.id === id);

  if (!clienteExiste) {
    return res.status(404).json({
      erro: "Cliente não encontrado",
    });
  }

  const clientesAtualizados = clientes.filter((cliente) => cliente.id !== id);

  salvarClientes(clientesAtualizados);

  res.json({
    mensagem: "Cliente removido com sucesso",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
