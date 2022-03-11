import express from "express";

const app = express();
const port = process.env.PORT || 8081
app.get('/hello', (req, res) => {
  res.json({name: 'Joel'});
});

app.listen(port, () => {
  process.stdout.write(`Listening on ${port}\n`)
})
