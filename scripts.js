const http = require("http");
const url = require("url");
const fs = require("fs");

const pageTitle = (title) => {
  return `<header><h1>${title}</h1></header>`;
};

const pageFooter = (footer) => {
  return `<footer><h3>${footer}</h3></footer>`;
};

const navigation = () => {
  return `<nav>
    <a href="/">Home</a>
    <a href="/artists">Top Artists</a>
    <a href="/songs">Top Songs</a>
   <a href="/house">House Music</a>
   <a href="/electronic">House Songs</a>
  </nav>`;
};

http
  .createServer((req, res) => {
    const address = url.parse(req.url, true);
    const currentPath = address.pathname;
    const queries = address.query;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(navigation());

    if (currentPath === "/") {
      res.write(pageTitle("My Spotify Wrapped 2025"));
      res.write("<h2>Welcome to the site!</h2>");
      res.write(pageFooter("Footer text"));
      res.end();
    }
    if (currentPath === "/artists") {
      res.write(pageTitle("Top Artists"));
      res.write("<h2>My top 5 artists of 2025!</h2>");
      res.write(pageFooter("Footer text"));
      res.end();
    }

    if (currentPath === "/songs") {
      res.write(pageTitle("Top Songs"));
      res.write("<h2>My top 10 songs of 2025!</h2>");
      res.write(pageFooter("Footer text"));
      res.end();
    }

    if (currentPath === "/house") {
      fs.readFile("./content/page1.html", (err, data) => {
        if (err) {
          res.write("Could not load page!");
        } else {
          res.write(data);
        }
        res.write(pageFooter("Footer text"));
        res.end();
      });
    }

    if (currentPath === "/electronic") {
      fs.readFile("./content/page2.html", (err, data) => {
        if (err) {
          res.write("Could not load page!");
        } else {
          res.write(data);
        }
        res.write(pageFooter("Footer text"));
        res.end();
      });
    }
  })

  .listen(3030, () => console.log("Listening on port 3030"));
