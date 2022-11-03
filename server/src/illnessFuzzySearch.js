//Cluster0
//username: user0
//password: 1234
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

//regex can work without indices, but with index on db it will be faster

const agg = [
  {
    $search: {
      index: "fuzzy",
      text: {
        path: "Uses",
        query: "bacter",
        fuzzy: {
          maxEdits: 2,
          maxExpansions: 60,
        },
      },
    },
  },
  {
    $limit: 5,
  },
];

MongoClient.connect(
  "mongodb+srv://user0:1234@cluster0.iwxwkhb.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  async function (connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db("medicinedb").collection("medicineCol2");
    let cursor = await coll.aggregate(agg);
    await cursor.forEach((doc) => console.log(doc));
    client.close();
  }
);
