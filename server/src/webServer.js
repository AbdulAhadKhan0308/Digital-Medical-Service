const path = require("path");
const express = require("express");
const { medicineSearch } = require("./medicineSearch.js");
const { illnessSearch } = require("./illnessSearch.js");
const { medicineFuzzySearch } = require("./medicineFuzzySearch.js");
const { illnessFuzzySearch } = require("./illnessFuzzySearch.js");
const app = express();

//3030 is for trojans and obsolete protocol, so can be used
const port = process.env.PORT || 3030;
const hostname = "127.0.0.1";

//test hostname, port with both server and client in a private network
//ipv4 address server =192.168.43.247
//ipv4 address client =192.168.43.95
//WORKS
const port2 = 80; //http;
const hostname2 = "192.168.43.247";

//bulid response
const buildAndSendResponse = function (res, stat, result) {
  res.write(JSON.stringify({ stat: stat, result: result }));
  res.end();
};

//middleware
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//send html, css, js
//BREAKS
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  res.sendFile(path.join(__dirname, "..", "public", "a.css"));
  res.sendFile(path.join(__dirname, "..", "public", "leaflet.css"));
  res.sendFile(path.join(__dirname, "..", "public", "script.js"));
  res.sendFile(path.join(__dirname, "..", "public", "script.js.map"));
});

//need to be logged in on MongoDB Atlas to run any
//of these search features
//search queries
app.get("/search", (req, res) => {
  const illness = parseInt(req.query.illness);
  const fuzzy = parseInt(req.query.fuzzy);
  const searchTerm = req.query.searchTerm;

  console.log(`illness:${illness},fuzzy:${fuzzy},searchTerm:${searchTerm}`);

  if (
    (illness === 0 || illness === 1) &&
    (fuzzy === 0 || fuzzy === 1) &&
    !!searchTerm &&
    searchTerm !== ""
  ) {
    if (illness === 0 && fuzzy === 0) {
      medicineSearch(searchTerm)
        .then((ansArray) => buildAndSendResponse(res, "SUCCESS", ansArray))
        .catch((err) => {
          console.log("err");
          console.dir(err);
          buildAndSendResponse(
            res,
            "SUCCESS",
            "UNCAUGHT/THROWN EXCEPTION IN medicineSearch"
          );
        });
    } else if (illness === 1 && fuzzy === 0) {
      illnessSearch(searchTerm)
        .then((ansArray) => buildAndSendResponse(res, "SUCCESS", ansArray))
        .catch((err) => {
          console.log("err");
          console.dir(err);
          buildAndSendResponse(
            res,
            "SUCCESS",
            "UNCAUGHT/THROWN EXCEPTION IN illnessSearch"
          );
        });
    } else if (illness === 0 && fuzzy === 1) {
      medicineFuzzySearch(searchTerm)
        .then((ansArray) => buildAndSendResponse(res, "SUCCESS", ansArray))
        .catch((err) => {
          console.log("err");
          console.dir(err);
          buildAndSendResponse(
            res,
            "SUCCESS",
            "UNCAUGHT/THROWN EXCEPTION IN medicineFuzzySearch"
          );
        });
    } else {
      illnessFuzzySearch(searchTerm)
        .then((ansArray) => buildAndSendResponse(res, "SUCCESS", ansArray))
        .catch((err) => {
          console.log("err");
          console.dir(err);
          buildAndSendResponse(
            res,
            "SUCCESS",
            "UNCAUGHT/THROWN EXCEPTION IN illnessFuzzySearch"
          );
        });
    }
  } else {
    res.write(JSON.stringify({ stat: "QUERY FAILURE" }));
    res.end();
  }
});

const server = app.listen(port2, hostname, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("running at http://" + host + ":" + port);
});
