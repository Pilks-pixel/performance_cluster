import express from "express";
import { createServer } from "node:http";
import cluster from "node:cluster";
import { cpus } from "node:os";

var app = express();
var server = createServer(app);
var PORT = process.env.PORT || 3000;
var numCPUs = cpus().length;

app.use(express.json());

app.get("/", function (req, res) {
  res.send(`Hello World! ${process.pid}`);
});

app.get("/timer", function (req, res) {
  delay(5000);
  res.send(`ding ding ding ${process.pid}`);
});

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs - 1; i++) {
    cluster.fork();
  }
} else {
  console.log(`worker ${process.pid} started`);
  server.listen(PORT, function () {
    console.log(`listening on ${PORT}`);
  });
}

function delay(duration: number) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    //event loop is blocked...
  }
}
