const express = require("express");
const { medicineSearch } = require("./medicineSearch.js");
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

app.get("/", (req, res) => {
  res.send("medicserver");
});

//bulid response
//const buildResponse = function (jsonObj) {};

//middleware
app.use((req, res, next) => {
  //res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//search queries
app.get("/search", async (req, res) => {
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
      const ansArray = await medicineSearch(searchTerm);
      res.write(JSON.stringify({ stat: "SUCCESS", result: ansArray }));
      res.end();
    }
  } else {
    res.write(JSON.stringify({ name: "FAILURE" }));
    res.end();
  }
});

const server = app.listen(port2, hostname2, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("running at http://" + host + ":" + port);
});
