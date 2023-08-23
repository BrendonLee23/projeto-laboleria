-- Criar a tabela `cakes`
CREATE TABLE cakes (
    id serial PRIMARY KEY,
    name TEXT NOT NULL,
    price numeric NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    "flavourId" integer NOT NULL REFERENCES flavours(id)
);