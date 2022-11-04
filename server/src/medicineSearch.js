//Cluster0
//username: user0
//password: 1234
const MongoClient = require("mongodb").MongoClient;

//regex can work without indices, but with index on db it will be faster

// a thing about async functions in javascript
//they will return promises, which:
//reject only on thrown exception or uncaught exception inside the async function
//else resolve

async function medicineSearch(query) {
  query = `(.*)${query}(.*)`;
  let ansArray = [];

  const agg = [
    {
      $search: {
        index: "medicine",
        regex: {
          path: "Medicine Name",
          allowAnalyzedField: true,
          query: query,
        },
      },
    },
    {
      $limit: 5,
    },
  ];

  const mongoConn = await MongoClient.connect(
    "mongodb+srv://user0:1234@cluster0.iwxwkhb.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  //console.log("mongoConn");
  //console.dir(mongoConn);

  if (!mongoConn) return ansArray;
  const coll = mongoConn.db("medicinedb").collection("medicineCol2");
  let cursor = await coll.aggregate(agg);

  await cursor.forEach((doc) => {
    console.log(doc);
    ansArray.push(doc);
  });

  mongoConn.close();

  return ansArray;
}

module.exports = { medicineSearch };
