import express from "express";
import { createServer } from "node:http";

var app = express();
var server = createServer(app);
var PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, function () {
  console.log(`listening on ${PORT}`);
});
