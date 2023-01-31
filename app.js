const http = require("http");
const routeHandler = require("./routes");
const routes = require("./routes");

var server = http.createServer(routes);

server.listen(3000);

console.log("node.js server at port 3000");
