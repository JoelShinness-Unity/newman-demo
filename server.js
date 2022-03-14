import express from "express";
import knex from 'knex';

const app = express();
const port = process.env.PORT || 8081

const pg = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
});

app.get('/hello', (req, res) => {
  res.json({name: 'Joel'});
});
app.get('/from-db', (req, res) => {
  pg.select('*').from('people').then(results => res.json(results));
})
app.listen(port, () => {
  process.stdout.write(`Listening on ${port}\n`)
})
