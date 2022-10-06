import app from "../server.js";
import { createServer } from "http";
import createDebugMessages from "debug";
const debug = createDebugMessages("social-api:*");

const server = createServer(app);

//normalize port into a number, string, or false
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val;

  if (port >= 0) return port;

  return false;
};

// server error event listener
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  //handle specific listen errors
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

// turn on connection to db and server
server.listen(port);

server.on("error", onError);
server.on("listening", onListening);
