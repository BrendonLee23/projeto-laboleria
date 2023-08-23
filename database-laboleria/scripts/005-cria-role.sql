DO
$$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_catalog.pg_roles WHERE rolname='projeto-laboleria_role'
  ) THEN
    CREATE ROLE projetolaboleria_role WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD 'senha_projeto-laboleria';
  END IF;
END
$$;