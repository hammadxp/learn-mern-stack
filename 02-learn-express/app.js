const http = require("http");
const { readFileSync } = require("fs");

const homePage = readFileSync("./navbar-app/index.html");

const server = http.createServer((req, res) => {
  // console.log(req.method);
  // console.log(req.url);

  const page = req.url;
  if (page === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.write(homePage);
    res.end();
  } else if (page === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>About Page</h1>");
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Page Not Found</h1>");
    res.end();
  }
});

server.listen(5000);
