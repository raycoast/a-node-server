const Server = require("./server");
const fs = require("fs");

const server = new Server();
server.get("/404.html", (request, response) => {
 response.writeHead(404, {"Content-Type": "text/html"});
 response.end(fs.readFileSync("./public/404.html"));
});
server.get("/", (request, response) => {
 response.writeHead(200, {"Content-Type": "text/plain"});
 response.end("Hello!");
});
