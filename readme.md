# Backend para Cadastro de Clientes

Este projeto implementa um backend simples para cadastro de clientes utilizando Node.js e Express. A aplicação disponibiliza uma API REST básica para listar, cadastrar, buscar, editar e excluir clientes. Os dados são persistidos em um arquivo JSON local, sem uso de banco de dados relacional ou não relacional.

O objetivo principal do projeto é demonstrar como construir uma API simples em JavaScript, organizada em torno de rotas HTTP e operações CRUD. A sigla CRUD representa as operações de criação, leitura, atualização e exclusão de registros. Neste projeto, essas operações são aplicadas ao cadastro de clientes.

A aplicação utiliza o framework Express para criar o servidor HTTP e definir as rotas da API. O Express permite estruturar endpoints de forma simples, recebendo requisições do frontend e retornando respostas no formato JSON. O pacote `cors` também é utilizado para permitir que uma aplicação frontend, executando em outra porta, consiga acessar o backend durante o desenvolvimento.

Os clientes são armazenados no arquivo `data/clientes.json`. Esse arquivo funciona como uma forma simples de persistência local. Quando a API precisa listar ou buscar clientes, ela lê o conteúdo desse arquivo. Quando um cliente é cadastrado, atualizado ou excluído, o arquivo é reescrito com os dados atualizados. Essa solução substitui temporariamente o uso de banco de dados e facilita a compreensão do fluxo de dados em uma aplicação backend.

Cada cliente cadastrado recebe um identificador único gerado com `randomUUID`, recurso nativo do módulo `crypto` do Node.js. Esse identificador segue o formato UUID e reduz o risco de colisão entre registros. Como o identificador é uma string, as rotas de busca, edição e exclusão tratam o parâmetro `id` também como string.

A estrutura do projeto foi pensada para ser simples e direta. O arquivo `server.js` concentra a configuração do servidor, os middlewares, as funções auxiliares de leitura e gravação do JSON e as rotas da API. Embora essa organização seja suficiente para um exemplo didático, o projeto pode futuramente ser refatorado para separar rotas, controllers, serviços e repositórios.

## Tecnologias utilizadas

O projeto utiliza Node.js como ambiente de execução JavaScript no backend. O Express é utilizado para criação da API HTTP. O pacote `cors` permite a comunicação entre frontend e backend durante o desenvolvimento. O módulo nativo `fs` é utilizado para leitura e escrita do arquivo JSON, enquanto o módulo nativo `path` é utilizado para montar o caminho do arquivo de forma mais segura e compatível com diferentes sistemas operacionais. O módulo nativo `crypto` é utilizado para geração dos identificadores UUID.

## Estrutura do projeto

A estrutura básica do backend é a seguinte:

```txt
backend-clientes
├── data
│   └── clientes.json
├── .gitignore
├── package.json
└── server.js
```