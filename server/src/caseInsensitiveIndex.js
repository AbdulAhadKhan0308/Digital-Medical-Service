//Cluster0
//username: user0
//password: 1234
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

//regex can work without indices, but with index on db it will be faster

const agg = [
  {
    $search: {
      index: "name",
      regex: {
        path: "Medicine Name",
        query: "(.*)a(.*)",
      },
    },
  },
  {
    $limit: 5,
  },
];
const options = {
  collation: {
    locale: "en",
    strength: 1,
  },
};

MongoClient.connect(
  "mongodb+srv://user0:1234@cluster0.iwxwkhb.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  async function (connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db("medicinedb").collection("medicineCol2");
    await coll.createIndex(
      { MRP: 1 },
      {
        collation: {
          locale: "en",
          strength: 2,
        },
      }
    );
    //await cursor.forEach((doc) => console.log(doc));
    client.close();
  }
);
