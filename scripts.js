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
    <a href="/artists">All Artists</a>
    <a href="/pop">Pop Artists</a>
   <a href="/hiphop">Hip-Hop Artists</a>
   <a href="/edm">EDM Artists</a>
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
      res.write(pageTitle("Home"));
      res.write("<h2>Welcome to the site!</h2>");
      res.write(pageFooter("Footer text"));
      res.end();
    }
    if (currentPath === "/artists") {
      res.write(pageTitle("All artists"));
      res.write("<h2>Artist list here!</h2>");
      res.write(pageFooter("Footer text"));
      res.end();
    }

    if (currentPath === "/pop") {
      res.write(pageTitle("Pop artists"));
      res.write("<h2>Pop artists here!</h2>");
      res.write(pageFooter("Footer text"));
      res.end();
    }

    if (currentPath === "/hiphop") {
      res.write(pageTitle("Hip-Hop artists"));
      res.write("<h2>Hip-Hop artists here!</h2>");
      res.write(pageFooter("Footer text"));
      res.end();
    }

    if (currentPath === "/edm") {
      res.write(pageTitle("EDM artists"));
      res.write("<h2>DJ:s here!</h2>");
      res.write(pageFooter("Footer text"));
      res.end();
    }
  })

  .listen(3030, () => console.log("Listening on port 3030"));
