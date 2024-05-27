const express = require("express");
const proxy = require("express-http-proxy");
const PORT = 8080;
const HOST = "localhost";

//Create Express Application
const app = express();
app.use(express.json());

const staticserver = proxy("http://localhost:3000");
const orderapi = proxy("http://localhost:3001");

app.use("/api/staticserver", staticserver);
app.use("/api/orderapi", orderapi);

//Start Your WebServer & Listen on PORT 3000
app.listen(PORT, async () => {
  console.log(`Server is listening port http://${HOST}:${PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
