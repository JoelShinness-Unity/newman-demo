CREATE TABLE people (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE
);

INSERT INTO people (name) VALUES ('Trevor'), ('Joel');