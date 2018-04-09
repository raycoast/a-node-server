var url = require("url");
//var fs = require("fs");

function router() {

  this._routes = [];

}

router.prototype.addRoute = function(pattern, handler) {
  this._routes.push(new route(pattern, handler))
}

router.prototype.route = function(request, response) {
  let urlObj = url.parse(request.url);
  let pathname = urlObj.pathname;
  let query = urlObj.query;

  for (var i = 0; i < this._routes.length; i++) {
    let r = this._routes[i];
    let result = r.matches(pathname);
    if (result.match) {
      console.log("route for " + pathname);
      return r._handler(request, response);
    }
  }

  console.log("No request handler found for " + pathname + ", redirect to /404.html");
  response.writeHead(301, {'Location': '/404.html'});
  response.end();
  //response.writeHead(404, {"Content-Type": "text/html"});
  //response.end(fs.readFileSync("./public/404.html"));
 }

function route(pattern, handler) {
  this._pattern = pattern;
  this._handler = handler;
}

route.prototype.matches = function(path) {
  if (path == this._pattern) {
    console.log("matched");
    return { match: true, parameters: {} };
  }
  console.log("not match");
  return { match: false, parameters: null };
}

module.exports = router;