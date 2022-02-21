const http = require('http');
const url = require('url');

http.createServer(function (req, res) {
  const queryObject = url.parse(req.url,true).query;
  console.log(queryObject);

  res.writeHead(200, {'Content-Type': 'text/html'});
 
  res.end('Feel free to add query parameters to the end of the url');
}).listen(8080);

const querystring = require('querystring');
const url1 = "http://example.com/index.html?code=string&key=12&id=false";
const qs = "code=string&key=12&id=false";

console.log(querystring.parse(qs));

console.log(querystring.parse(url1));
