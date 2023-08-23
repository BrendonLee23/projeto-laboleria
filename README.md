# projeto-laboleria

# LaBoleria API

Este projeto é uma API para gerenciar pedidos de bolos na confeitaria LaBoleria. A API foi construída com base nos requisitos especificados, implementando rotas para a criação de bolos, clientes, pedidos, listagem de pedidos e detalhes de pedidos, e também a possibilidade de controle de entrega dos pedidos.

## Requisitos

- Node.js (versão X.X.X)
- PostgreSQL (versão X.X)

## Configuração do Banco de Dados

## Banco de Dados

O banco de dados utilizado possui as seguintes tabelas:

### Tabela `cakes`

- `id` → serial
- `name` → varchar
- `price` → numeric
- `image` → varchar
- `description` → text
- `flavourId` → integer (referência à tabela `flavours`)

### Tabela `clients`

- `id` → serial
- `name` → varchar
- `address` → varchar
- `phone` → varchar

### Tabela `orders`

- `id` → serial
- `clientId` → integer (referência à tabela `clients`)
- `cakeId` → integer (referência à tabela `cakes`)
- `quantity` → integer
- `createdAt` → timestamp
- `totalPrice` → numeric
- `isDelivered` → boolean

### Tabela `flavours`

- `id` → serial
- `name` → varchar


## Execução

1. Inicie o servidor: `npm start`
2. Acesse a API em: `http://localhost:3000`

## Rotas

- **POST** `/cakes`
- **POST** `/clients`
- **POST** `/order`
- **GET** `/orders`
- **GET** `/orders/:id`
- **GET** `/clients/:id/orders`
- **POST** `/flavours`
- **PATCH** `/order/:id`