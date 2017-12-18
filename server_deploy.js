const http = require('http');
var url = require('url');
var fs = require('fs');

//const hostname = '127.0.0.1';
//const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
const PORT = process.env.PORT || 8080;
console.log(PORT);
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("you are accessing from "+q.hostname+" query for "+q.path);
}).listen(PORT, 'https://github-star-index.herokuapp.com/');
