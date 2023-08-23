
-- Criar a tabela `orders`
CREATE TABLE orders (
    id serial PRIMARY KEY,
    "clientId" integer REFERENCES clients(id) NOT NULL,
    "cakeId" integer REFERENCES cakes(id) NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp DEFAULT NOW() NOT NULL,
    "totalPrice" numeric NOT NULL,
    "isDelivered" boolean DEFAULT false
);