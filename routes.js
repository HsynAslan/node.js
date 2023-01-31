var fs = require("fs");

const routeHandler = (request, response) => {
  //   console.log(request.url, request.method);
  //   console.log(response.statusCode);

  // response.setHeader("Content-type", "text/html");
  // response.statusCode = 200;
  // response.statusMessage = "OK";

  // response.write("<h1>Merhaba Node.js</h1>");
  // response.write("<p>Urunler</p>");

  // response.end(); // cevap gelmesi için serverdan

  if (request.url == "/") {
    fs.readFile("index.html", (error, html) => {
      response.writeHead(200, { "Content-Type": "text.html" });
      response.write(html);
      response.end();
    });
  } else if (request.url == "/blogs") {
    fs.readFile("blogs.html", (error, html) => {
      response.writeHead(200, { "Content-Type": "text.html" });
      response.write(html);
      response.end();
    });
  } else if (request.url == "/create" && request.method == "POST") {
    const data = [];
    request.on("data", (chunk) => {
      data.push(chunk);
    });

    request.on("end", () => {
      const result = Buffer.concat(data).toString();
      const parsedData = result.split("=")[1];
      console.log(parsedData);

      fs.appendFile("blogs.txt", "deneme", (err) => {
        if (err) {
          console.log(err);
        } else {
          response.statusCode = 302;
          response.setHeader("Location", "/");
          response.end();
        }
      });
    });
  } else if (request.url == "/create") {
    fs.readFile("create.html", (error, html) => {
      response.writeHead(200, { "Content-Type": "text.html" });
      response.write(html);
      response.end();
    });
  } else {
    fs.readFile("404.html", (error, html) => {
      response.writeHead(404, { "Content-Type": "text.html" });
      response.write(html);
      response.end();
    });
  }
};

module.exports = routeHandler;
