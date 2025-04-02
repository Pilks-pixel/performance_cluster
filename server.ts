import express from "express";
import { createServer } from "node:http";

var app = express();
var server = createServer(app);
var PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/timer", function (req, res) {
  delay(5000);
  res.send("ding ding ding");
});

server.listen(PORT, function () {
  console.log(`listening on ${PORT}`);
});

function delay(duration: number) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    //event loop is blocked...
  }
}
