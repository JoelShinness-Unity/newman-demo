import express from "express";
import knex from 'knex';
import { MongoClient } from "mongodb";

const app = express();
const port = process.env.PORT || 8081
const {
  PORT = 8080,
  PG_CONNECTION_STRING = "postgres://admin:pass@localhost:5432/demo?ssl_disable=true",
  MONGO_CONNECTION_STRING = "mongodb://localhost:27017",
  MONGO_DB_NAME = "demo"
} = process.env

const pg = knex({
  client: 'pg',
  connection: PG_CONNECTION_STRING,
});

const mc = new MongoClient(MONGO_CONNECTION_STRING);
const dbPromise = mc.connect().then(() => mc.db(MONGO_DB_NAME));

app.get('/hello', (req, res) => {
  res.json({name: 'Joel'});
});
app.get('/from-db', (req, res) => {
  pg.select('*').from('people').then(results => res.json(results));
});
app.get('/from-mongo', (req, res) => {
  // const collectionsPromise = dbPromise.then(db => db.collections());
  // Promise.all([dbPromise, collectionsPromise])
  //   .then(([db, collections]) => {
  //     console.log(db.name, collections.map(c => c.name))
  //   })
  // dbPromise
  //   .then((db) => db.collections())
  //   .then((collections) => {
  //     console.log(...collections.map(c => c.name))
  //   })

  dbPromise
    .then(db => db.collection('people').find({}).toArray())
    .then(items => res.json(items));

})
app.listen(PORT, () => {
  process.stdout.write(`Listening on ${PORT}\n`);
});
