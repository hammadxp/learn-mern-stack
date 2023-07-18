const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Welcome to our homepage.");
    res.end();
  } else if (req.url === "/about") {
    res.write("About page");
    res.end();
  } else {
    res.end("404");
  }
});

server.listen(5000);
