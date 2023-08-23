-- Criar a tabela `clients`
CREATE TABLE clients (
    id serial PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL
);