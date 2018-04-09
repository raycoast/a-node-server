var http = require("http");
var url = require("url");
const Router = require("./router");

function server() {

  this._routers = {
    get: new Router()
  };

  http.createServer((request, response) => {
    var urlObj = url.parse(request.url);
    var pathname = urlObj.pathname;
    var query = urlObj.query;
    console.log("Request for " + pathname + " received." + " query: " + query);

    this._routers.get.route(request, response);
  }).listen(8888);
  console.log("Server has started.");
}

server.prototype.get = function(pattern, handler) {
  this._routers.get.addRoute(pattern, handler);
}

module.exports = server;
