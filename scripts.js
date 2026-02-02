const http = require("http");
const url = require("url");
const fs = require("fs");
const topArtists = require("./data/artists.js");
const topSongs = require("./data/songs.js");

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
   <a href="/electronic">Electronic Music</a>
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
      res.write("<p>Here you can see my Top artists and songs from 2025!</p>");
      res.write("Check these links!");
      res.write("<a href='/artists?artists=house'>House Artists</a>");
      res.write("<a href='/housesongs?housesongs=top5'>Top 5 House Songs</a>");
      res.write("<a href='/housesongs?housesongs=top3'>Top 3 House Songs</a>");
      res.end();
    } else if (currentPath === "/artists") {
      const search = queries.artists;

      if (search === "house") {
        res.write(pageTitle("House Artists"));
        res.write("<h2>My top house artists!</h2>");

        topArtists.forEach((artist) => {
          if (artist.genre === "house") {
            res.write(`<p>${artist.rank} - ${artist.name}</p>`);
          }
        });
        res.end();
      } else {
        res.write(pageTitle("Top Artists"));
        res.write("<h2>My top 5 artists of 2025!</h2>");

        topArtists.forEach((artist) => {
          res.write(`<p>${artist.rank} - ${artist.name} - ${artist.genre}</p>`);
        });
        res.end();
      }
    } else if (currentPath === "/songs") {
      res.write(pageTitle("Top Songs"));
      res.write("<h2>My top 10 songs of 2025!</h2>");

      topSongs.forEach((song) => {
        res.write(
          `<p>${song.rank} - ${song.songName} by ${song.artistName}</p>`,
        );
      });
      res.end();
    } else if (currentPath === "/house") {
      fs.readFile("./content/page1.html", (err, data) => {
        if (err) {
          res.write("Could not load page!");
        } else {
          res.write(data);
        }
        res.end();
      });
    } else if (currentPath === "/electronic") {
      fs.readFile("./content/page2.html", (err, data) => {
        if (err) {
          res.write("Could not load page!");
        } else {
          res.write(data);
        }
        res.end();
      });
    } else if (currentPath === "/housesongs") {
      const search = queries.housesongs;

      if (search === "top5") {
        res.write(pageTitle("House songs in my Top 5!"));
        res.write("<h2>House songs that are in my Tçop 5 most most listened!");

        topSongs.forEach((song) => {
          if (song.genre === "house") {
            if (song.rank <= 5) {
              res.write(`<p>${song.rank} - ${song.songName}</p>`);
            }
          }
        });
        res.end();
      } else if (search === "top3") {
        res.write(pageTitle("Top 3 house songs!"));
        res.write("<h2>My top 3 house songs!");

        topSongs.forEach((song) => {
          if (song.genre === "house") {
            if (song.rank <= 3) {
              res.write(`<p>${song.rank} - ${song.songName}`);
            }
          }
        });
        res.end();
      } else {
        res.write(pageTitle("House songs"));
        res.write("<h2>All house songs!</h2>");

        topSongs.forEach((song) => {
          if (song.genre === "house") {
            res.write(`<p>${song.rank} - ${song.songName}`);
          }
        });
        res.end();
      }
    }
  })
  .listen(3030, () => console.log("Listening on port 3030"));
